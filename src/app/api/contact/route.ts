import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this route is always executed (no static optimization caching issues)
export const dynamic = 'force-dynamic';

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
      return NextResponse.json({ ok: false, error: 'Campos faltantes' }, { status: 400 });
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido' }, { status: 400 });
    }

    // Sanitizer to avoid HTML injection in the email
    const sanitize = (str: string) => String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch] as string));
    const sName = sanitize(name).slice(0, 200);
    const sEmail = sanitize(email).slice(0, 200);
    const sMessage = sanitize(message).slice(0, 5000);

    // Transport config via env vars (recommended). Provide fallback to avoid runtime crash if not set.
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || 'davidabril411@gmail.com';
    const from = process.env.CONTACT_FROM || `"Web Contact" <${user || 'no-reply@example.com'}>`;

    if (!host || !user || !pass) {
      console.warn('[contact] Missing SMTP_* env vars. Email will be mocked to console.');
      console.log({ name, email, message });
      return NextResponse.json({ ok: true, mocked: true });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

  const combined = `Nombre: ${sName} | Email: ${sEmail} | Mensaje: ${sMessage}`;
  const text = `Nuevo mensaje de contacto (resumen en una sola línea)\n${combined}\n\nDetalle:\n${sMessage}`;
  const html = `<h2>Nuevo mensaje de contacto</h2><p><strong>Resumen:</strong><br/>${combined}</p><hr/><p><strong>Detalle:</strong><br/>${sMessage.replace(/\n/g,'<br/>')}</p>`;

    await transporter.sendMail({
      to,
      from,
      subject: `Nuevo mensaje: ${sName}`,
      replyTo: sEmail,
      text,
      html
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error('Unknown error');
    console.error('[contact] error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
