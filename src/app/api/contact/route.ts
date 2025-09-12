import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // Fallback si no hay MAILERSEND_TOKEN

// Ensure this route is always executed (no static optimization caching issues)
export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 * Expects: { name: string, email: string, message: string }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message, website } = body || {};

        // Honeypot field (should stay empty). If filled => possible bot
        if (website) {
            return NextResponse.json({ ok: true, skipped: true });
        }

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Campos faltantes" }, {
                status: 400,
            });
        }

        // Basic validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ ok: false, error: "Email inválido" }, {
                status: 400,
            });
        }

        // Sanitizer to avoid HTML injection in the email
        const sanitize = (str: string) =>
            String(str).replace(
                /[&<>"']/g,
                (ch) => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                }[ch] as string),
            );
        const sName = sanitize(name).slice(0, 200);
        const sEmail = sanitize(email).slice(0, 200);
        const sMessage = sanitize(message).slice(0, 5000);

        const to = process.env.CONTACT_TO || "davidabril411@gmail.com";
        const mailerSendToken = process.env.MAILERSEND_TOKEN;
        const fromEmail = (process.env.CONTACT_FROM && /<(.+?)>/.exec(process.env.CONTACT_FROM)?.[1])
            || process.env.MAILERSEND_FROM
            || process.env.CONTACT_FROM
            || "no-reply@example.com";
        const fromName = (process.env.CONTACT_FROM && /^"(.+?)"/ .exec(process.env.CONTACT_FROM)?.[1])
            || process.env.MAILERSEND_FROM_NAME
            || "Web Contact";

        // Si hay token de MailerSend usamos la API HTTP (más fiable en hosting serverless) y evitamos timeout SMTP.
        if (mailerSendToken) {
            const combined = `Nombre: ${sName} | Email: ${sEmail} | Mensaje: ${sMessage}`;
            const text = `Nuevo mensaje de contacto (resumen en una sola línea)\n${combined}\n\nDetalle:\n${sMessage}`;
            const html = `<h2>Nuevo mensaje de contacto</h2><p><strong>Resumen:</strong><br/>${combined}</p><hr/><p><strong>Detalle:</strong><br/>${sMessage.replace(/\n/g, '<br/>')}</p>`;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            try {
                const resp = await fetch('https://api.mailersend.com/v1/email', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${mailerSendToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: { email: fromEmail, name: fromName },
                        to: [{ email: to }],
                        reply_to: { email: sEmail, name: sName },
                        subject: `Nuevo mensaje: ${sName}`,
                        text,
                        html
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!resp.ok) {
                    const errText = await resp.text().catch(() => '');
                    console.error('[contact] MailerSend API error', resp.status, errText);
                    return NextResponse.json({ ok: false, error: 'Error enviando correo (MailerSend)' }, { status: 502 });
                }
                return NextResponse.json({ ok: true, provider: 'mailersend' });
            } catch (apiErr) {
                const msg = apiErr instanceof Error ? apiErr.message : 'Unknown error';
                console.error('[contact] MailerSend fetch failed', msg);
                return NextResponse.json({ ok: false, error: msg.includes('AbortError') ? 'Timeout MailerSend' : 'Fallo MailerSend' }, { status: 504 });
            }
        }

        // ---- Fallback SMTP (nodemailer) ----
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
        const secure = process.env.SMTP_SECURE ? /^(true|1)$/i.test(process.env.SMTP_SECURE) : port === 465;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const from = process.env.CONTACT_FROM || `"Web Contact" <${user || 'no-reply@example.com'}>`;

        if (!host || !user || !pass) {
            console.warn(
                "[contact] Missing SMTP_* env vars. Email will be mocked to console.",
            );
            console.log({ name, email, message });
            return NextResponse.json({ ok: true, mocked: true });
        }

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
            connectionTimeout: 15000, // 15s
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
        } catch (mailErr: unknown) {
            const errObj = mailErr as Record<string, unknown> | undefined;
            const code = errObj && typeof errObj.code === "string"
                ? errObj.code
                : undefined;
            const command = errObj && typeof errObj.command === "string"
                ? errObj.command
                : undefined;
            const message = errObj && typeof errObj.message === "string"
                ? errObj.message
                : "Unknown mail error";
            console.error("[contact] sendMail failed", {
                code,
                command,
                message,
                host,
                port,
                secure,
            });
            if (code === "ETIMEDOUT") {
                return NextResponse.json({
                    ok: false,
                    error: "Timeout conectando al servidor SMTP",
                }, { status: 504 });
            }
            return NextResponse.json({
                ok: false,
                error: "Error enviando correo",
            }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        const err = e instanceof Error ? e : new Error("Unknown error");
        console.error("[contact] error", err);
        return NextResponse.json({ ok: false, error: "Server error" }, {
            status: 500,
        });
    }
}
