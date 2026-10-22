/**
 * POST /api/enquiry
 *
 * Security contract:
 * - PII (name, phone, email) is NEVER written to any log.
 * - Only error codes/statuses are logged server-side.
 * - User-supplied strings are HTML-escaped before insertion into the email body.
 * - Headers never contain unescaped user input.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquirySchema";
import { checkRateLimit } from "@/lib/rateLimit";

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Escape the five HTML special chars to prevent injection in email HTML. */
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Map enquiry type → recipient env var name. */
const TYPE_TO_ENV: Record<string, string> = {
  "hire-manpower": "EMAIL_TO_MANPOWER",
  training:        "EMAIL_TO_TRAINING",
  "fish-enquiry":  "EMAIL_TO_FLINS",
  general:         "EMAIL_TO_GENERAL",
};

function getRecipient(type: string): string | null {
  const envKey = TYPE_TO_ENV[type];
  return envKey ? (process.env[envKey] ?? null) : null;
}

/** Build WhatsApp click-to-chat URL from form data (used as fallback). */
function buildWhatsApp(name: string, type: string, message: string): string {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917498245215";
  const text = `Enquiry [${type}] from ${name}: ${message}`.slice(0, 500);
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // 2. Parse + validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // Return field-level messages so the form can highlight them, but
    // never echo raw user input back in error messages.
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: "Validation failed.", fields: fieldErrors }, { status: 422 });
  }

  const { type, name, phone, email, message, resume } = parsed.data;

  // 3. Resolve destination email
  const to = getRecipient(type);
  if (!to) {
    console.error("[enquiry] Missing env var for type:", type);
    return NextResponse.json({ error: "Configuration error." }, { status: 500 });
  }

  const from = process.env.EMAIL_FROM;
  if (!from || !process.env.RESEND_API_KEY) {
    console.error("[enquiry] Missing EMAIL_FROM or RESEND_API_KEY");
    return NextResponse.json({ error: "Configuration error." }, { status: 500 });
  }

  // 4. Build email — HTML-escaped user content only
  const safeName    = escHtml(name);
  const safePhone   = escHtml(phone);
  const safeEmail   = email ? escHtml(email) : "—";
  const safeMessage = escHtml(message);
  const safeType    = escHtml(type);
  const safeResume  = resume ? escHtml(resume.filename) : null;

  const htmlBody = `
<p><strong>Type:</strong> ${safeType}</p>
<p><strong>Name:</strong> ${safeName}</p>
<p><strong>Phone:</strong> ${safePhone}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
${safeResume ? `<p><strong>Resume Attached:</strong> ${safeResume}</p>` : ""}
<hr/>
<p><strong>Message:</strong><br/>${safeMessage.replace(/\n/g, "<br/>")}</p>
<hr/>
<p style="color:#888;font-size:12px">Salvi Group website enquiry — do not reply to this automated message.</p>
`.trim();

  const textBody = [
    `Type: ${type}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "—"}`,
    resume ? `Resume: ${resume.filename}` : "",
    "",
    message,
    "",
    "-- Salvi Group website enquiry",
  ].filter(Boolean).join("\n");

  // 5. Send via Resend with optional resume attachment
  const resend = new Resend(process.env.RESEND_API_KEY);

  const attachments = resume
    ? [
        {
          filename: resume.filename.replace(/[^a-zA-Z0-9._-]/g, "_"),
          content: Buffer.from(resume.content, "base64"),
        },
      ]
    : undefined;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      // Subject uses only the enquiry type — no user input in headers
      subject: `New enquiry: ${type}`,
      html: htmlBody,
      text: textBody,
      attachments,
    });

    if (error) {
      // Log only the Resend error code, never PII
      console.error("[enquiry] Resend error code:", error.name);
      const whatsappUrl = buildWhatsApp(name, type, message);
      return NextResponse.json(
        { error: "Email delivery failed. Please try WhatsApp.", whatsappUrl },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[enquiry] Unexpected send error:", (err as Error).name);
    const whatsappUrl = buildWhatsApp(name, type, message);
    return NextResponse.json(
      { error: "Unexpected error. Please try WhatsApp.", whatsappUrl },
      { status: 500 }
    );
  }
}
