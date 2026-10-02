import type { AthleteRecord } from "@/lib/athletes";
import {
  type AthletePositionId,
  positionLabel,
  testSlugForPosition,
} from "@/lib/positions";
import { SGA_PRODUCTS } from "@/lib/products";

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const notify = process.env.SGA_REGISTRATION_NOTIFY_EMAIL?.trim();
  return { apiKey, from, notify };
}

function isEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function productsHtml(): string {
  const items = SGA_PRODUCTS.map(
    (p) =>
      `<li style="margin:0 0 12px"><strong>${p.name}</strong><br/>${p.tagline}<br/><a href="${p.href}">${p.ctaLabel}</a></li>`,
  ).join("");
  return `<ul style="padding-left:18px;margin:0">${items}</ul>`;
}

async function sendViaResend(to: string[], subject: string, html: string): Promise<boolean> {
  const { apiKey, from } = getEmailConfig();
  if (!apiKey || !from) {
    console.warn("Registration email skipped: set RESEND_API_KEY and EMAIL_FROM.");
    return false;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    return false;
  }
  return true;
}

export async function sendRegistrationEmails(athlete: AthleteRecord): Promise<void> {
  const position = athlete.position as AthletePositionId;
  const testSlug = testSlugForPosition(position);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sga-app-blond.vercel.app";
  const testUrl = `${site}/tests/${testSlug}`;

  const athleteHtml = `
    <p>Hi ${athlete.name},</p>
    <p>Welcome to SGA Performance. Your account is ready — position <strong>${positionLabel(position)}</strong>.</p>
    <p>Take your position tactical test when you are ready:</p>
    <p><a href="${testUrl}">Start my tactical test</a></p>
    <p>SGA products that may fit your development path:</p>
    ${productsHtml()}
    <p>— SGA Performance</p>
  `;

  const staffHtml = `
    <p>New athlete registration:</p>
    <ul>
      <li><strong>Name:</strong> ${athlete.name}</li>
      <li><strong>Club:</strong> ${athlete.club}</li>
      <li><strong>Position:</strong> ${positionLabel(position)}</li>
      <li><strong>Birth year:</strong> ${athlete.birthYear}</li>
      <li><strong>Contact:</strong> ${athlete.contact}</li>
      ${athlete.message ? `<li><strong>Message:</strong> ${athlete.message}</li>` : ""}
    </ul>
    <p>Recommended products (sent to athlete):</p>
    ${productsHtml()}
  `;

  const tasks: Promise<boolean>[] = [];

  if (isEmailAddress(athlete.contact)) {
    tasks.push(
      sendViaResend(
        [athlete.contact],
        "Welcome to SGA Performance — your products & tactical test",
        athleteHtml,
      ),
    );
  }

  const { notify } = getEmailConfig();
  if (notify && isEmailAddress(notify)) {
    tasks.push(sendViaResend([notify], `New athlete: ${athlete.name} (${position})`, staffHtml));
  }

  await Promise.all(tasks);
}
