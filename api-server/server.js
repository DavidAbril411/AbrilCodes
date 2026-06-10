import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Load environment variables (relative to the api-server directory)
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3006;

// Enable CORS for frontend domains
app.use(cors({
    origin: [
        'https://abrilcodes.com',
        'https://www.abrilcodes.com',
        'https://davidabril411.github.io',
        'http://localhost:3000'
    ],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ── Rate limiting (in-memory, per IP, resets every 60 s) ─────────────────────
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const rateLimitMap = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true;
    }
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

// ── Input schema (Zod) ────────────────────────────────────────────────────────
const contactSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(200),
    message: z.string().min(1).max(5000),
    website: z.string().optional(), // honeypot field
});

// ── Sanitizer (HTML entities) ─────────────────────────────────────────────────
const sanitize = (str) =>
    String(str).replace(
        /[&<>"']/g,
        (ch) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[ch]),
    );

app.post('/api/contact', async (req, res) => {
    try {
        // ── Rate limit ────────────────────────────────────────────────────────
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ ok: false, error: "Demasiadas solicitudes. Intenta en un minuto." });
        }

        // ── Parse & validate with Zod ─────────────────────────────────────────
        const parsed = contactSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ ok: false, error: "Datos inválidos" });
        }

        const { name, email, message, website } = parsed.data;

        // Honeypot field (should stay empty). If filled => possible bot
        if (website) {
            return res.json({ ok: true, skipped: true });
        }

        const sName = sanitize(name);
        const sEmail = sanitize(email);
        const sMessage = sanitize(message);

        const to = process.env.CONTACT_TO || "davidabril411@gmail.com";
        const mailerSendToken = process.env.MAILERSEND_TOKEN;
        const fromEmail =
            (process.env.CONTACT_FROM &&
                /<(.+?)>/.exec(process.env.CONTACT_FROM)?.[1]) ||
            process.env.MAILERSEND_FROM ||
            process.env.CONTACT_FROM ||
            "no-reply@example.com";
        const fromName =
            (process.env.CONTACT_FROM &&
                /^"(.+?)"/.exec(process.env.CONTACT_FROM)?.[1]) ||
            process.env.MAILERSEND_FROM_NAME ||
            "Web Contact";

        // Si hay token de MailerSend usamos la API HTTP (más fiable en hosting serverless/contenedor).
        if (mailerSendToken) {
            const combined = `Nombre: ${sName} | Email: ${sEmail} | Mensaje: ${sMessage}`;
            const text = `Nuevo mensaje de contacto (resumen en una sola línea)\n${combined}\n\nDetalle:\n${sMessage}`;
            const html = `<h2>Nuevo mensaje de contacto</h2><p><strong>Resumen:</strong><br/>${combined}</p><hr/><p><strong>Detalle:</strong><br/>${sMessage.replace(/\n/g, "<br/>")}</p>`;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            try {
                const resp = await fetch(
                    "https://api.mailersend.com/v1/email",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${mailerSendToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: { email: fromEmail, name: fromName },
                            to: [{ email: to }],
                            reply_to: { email: sEmail, name: sName },
                            subject: `Nuevo mensaje: ${sName}`,
                            text,
                            html,
                        }),
                        signal: controller.signal,
                    },
                );
                clearTimeout(timeout);
                if (!resp.ok) {
                    const errText = await resp.text().catch(() => "");
                    console.error("[contact] MailerSend API error", resp.status, errText);
                    return res.status(502).json({ ok: false, error: "Error enviando correo (MailerSend)" });
                }
                return res.json({ ok: true, provider: "mailersend" });
            } catch (apiErr) {
                const msg = apiErr instanceof Error ? apiErr.message : "Unknown error";
                console.error("[contact] MailerSend fetch failed", msg);
                return res.status(504).json({
                    ok: false,
                    error: msg.includes("AbortError") ? "Timeout MailerSend" : "Fallo MailerSend",
                });
            }
        }

        // ── Fallback SMTP (nodemailer) ────────────────────────────────────────
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
        const secure = process.env.SMTP_SECURE ? /^(true|1)$/i.test(process.env.SMTP_SECURE) : port === 465;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const from = process.env.CONTACT_FROM || `"Web Contact" <${user || "no-reply@example.com"}>`;

        if (!host || !user || !pass) {
            console.warn("[contact] Missing SMTP_* env vars. Email will be mocked to console.");
            console.log({ name: sName, email: sEmail, message: sMessage });
            return res.json({ ok: true, mocked: true });
        }

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
            connectionTimeout: 15000,
            greetingTimeout: 10000,
            socketTimeout: 20000,
        });

        const combined = `Nombre: ${sName} | Email: ${sEmail} | Mensaje: ${sMessage}`;
        const text = `Nuevo mensaje de contacto (resumen en una sola línea)\n${combined}\n\nDetalle:\n${sMessage}`;
        const html = `<h2>Nuevo mensaje de contacto</h2><p><strong>Resumen:</strong><br/>${combined}</p><hr/><p><strong>Detalle:</strong><br/>${sMessage.replace(/\n/g, "<br/>")}</p>`;

        try {
            await transporter.sendMail({
                to,
                from,
                subject: `Nuevo mensaje: ${sName}`,
                replyTo: sEmail,
                text,
                html,
            });
            return res.json({ ok: true });
        } catch (mailErr) {
            console.error("[contact] sendMail failed", mailErr);
            return res.status(502).json({ ok: false, error: "Error enviando correo" });
        }
    } catch (e) {
        console.error("[contact] error", e);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
});

// A simple health check route
app.get('/health', (req, res) => {
    res.json({ ok: true, message: "AbrilCodes API is running" });
});

app.listen(PORT, () => {
    console.log(`AbrilCodes Contact API listening on port ${PORT}`);
});
