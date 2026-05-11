/**
 * email.ts — Transactional email helpers using Resend
 *
 * All emails send from hello@continuary.app.
 * Requires RESEND_API_KEY in environment variables.
 * If the key is missing, the function logs a warning and returns false silently
 * so a missing key never breaks the application flow.
 */

import { Resend } from "resend";
import { ENV } from "./_core/env";

function getResend(): Resend | null {
  if (!ENV.resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(ENV.resendApiKey);
}

const FROM_ADDRESS = "hello@continuary.app";
const APP_NAME = "Continuary";

/**
 * Send a confirmation email to a founding member applicant.
 * Returns true on success, false on failure (never throws).
 */
export async function sendApplicationConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM_ADDRESS}>`,
      to: email,
      subject: "You're in the queue — Continuary Founding Member",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application received</title>
</head>
<body style="margin:0;padding:0;background:#0a1020;font-family:'DM Sans',Arial,sans-serif;color:#c8d4e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1020;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0f1a30;border-radius:16px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f1a30 0%,#1a2a4a 100%);padding:36px 40px 28px;border-bottom:1px solid rgba(232,160,48,0.15);">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(232,160,48,0.7);font-weight:600;">Silicon Wren &middot; Continuary</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#f0e8d8;line-height:1.2;">Your story is already worth keeping.</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#a8b4cc;">
                Hi ${name},
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#a8b4cc;">
                Something just landed in our inbox that we're genuinely glad to read.
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#a8b4cc;">
                You applied for a founding member seat &mdash; and that means you're one of the first 100 people who will shape what Continuary becomes. Not just as a user, but as someone whose patterns, frustrations, and small wins will directly influence what we build next.
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#a8b4cc;">
                We read every application personally. We're not filtering for credentials or productivity credentials &mdash; we're looking for people who know what it feels like to lose the thread, and who want something that helps them find it again.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(232,160,48,0.2),transparent);margin:28px 0;"></div>

              <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(168,180,204,0.5);font-weight:600;">What happens next</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#a8b4cc;">
                We'll review your application and reach out to this address within a few days. When we do, we'll share your founding member access details, your locked-in rate, and what the first few weeks of beta look like.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#a8b4cc;">
                In the meantime, if anything comes to mind &mdash; questions, second thoughts, or something you forgot to mention &mdash; just reply here. This goes to a real inbox.
              </p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#a8b4cc;">
                &mdash; DeWayne &amp; the Continuary team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:13px;color:rgba(168,180,204,0.4);line-height:1.6;">
                You're receiving this because you applied for a founding member seat at Continuary.<br />
                Silicon Wren &middot; <a href="https://continuary.app" style="color:rgba(232,160,48,0.6);text-decoration:none;">continuary.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
      text: `Hi ${name},\n\nSomething just landed in our inbox that we're genuinely glad to read.\n\nYou applied for a founding member seat — and that means you're one of the first 100 people who will shape what Continuary becomes. We read every application personally.\n\nWe'll be in touch within a few days with your founding member access details and locked-in rate.\n\nIf anything comes to mind in the meantime — questions, second thoughts, or something you forgot to mention — just reply here. This goes to a real inbox.\n\n— DeWayne & the Continuary team\nhello@continuary.app`,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Unexpected error sending confirmation:", err);
    return false;
  }
}
