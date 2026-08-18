import { NextResponse } from "next/server";
import {
  parseContactFormPayload,
  sendContactFormEmail,
} from "@/lib/email/sendContactFormEmail";
import { getEmailDeliveryErrorMessage } from "@/lib/email/errors";
import { hubspotContactFormGuid } from "@/lib/hubspot/config";
import {
  readHubSpotCookie,
  submitHubSpotForm,
} from "@/lib/hubspot/submitForm";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedPayload = parseContactFormPayload(body);

  if (!parsedPayload.data) {
    return NextResponse.json(
      { message: parsedPayload.error || "Invalid contact form request." },
      { status: 400 }
    );
  }

  const { name, email, phone, company, message } = parsedPayload.data;

  try {
    await sendContactFormEmail(parsedPayload.data);
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      { message: getEmailDeliveryErrorMessage(error) },
      { status: 500 }
    );
  }

  // After the email, and non-throwing — a HubSpot outage must not tell the
  // visitor their enquiry failed when it has already been delivered.
  await submitHubSpotForm({
    formGuid: hubspotContactFormGuid,
    hubspotutk: readHubSpotCookie(request),
    pageUri: request.headers.get("referer") || undefined,
    pageName: "Contact form",
    // Field names must match the HubSpot form exactly. Note this form uses
    // `mobilephone` while the service form uses `phone` — they are not the same
    // contact property, and a mismatch is dropped without an error.
    fields: [
      { name: "firstname", value: name },
      { name: "email", value: email },
      { name: "mobilephone", value: phone },
      { name: "company", value: company },
      { name: "message", value: message },
    ],
  });

  return NextResponse.json({ ok: true });
}
