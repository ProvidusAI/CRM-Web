import { NextResponse } from "next/server";
import {
  parseServiceInquiryPayload,
  sendServiceFormEmail,
} from "@/lib/email/sendServiceFormEmail";
import { getEmailDeliveryErrorMessage } from "@/lib/email/errors";
import { hubspotServiceFormGuid } from "@/lib/hubspot/config";
import {
  readHubSpotCookie,
  submitHubSpotForm,
} from "@/lib/hubspot/submitForm";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedPayload = parseServiceInquiryPayload(body);

  if (!parsedPayload.data) {
    return NextResponse.json(
      { message: parsedPayload.error || "Invalid service inquiry request." },
      { status: 400 }
    );
  }

  const { serviceTitle, name, email, contactNumber, message } =
    parsedPayload.data;

  try {
    await sendServiceFormEmail(parsedPayload.data);
  } catch (error) {
    console.error("Service inquiry email failed", error);

    return NextResponse.json(
      { message: getEmailDeliveryErrorMessage(error) },
      { status: 500 }
    );
  }

  // After the email, and non-throwing — see the contact route for why.
  await submitHubSpotForm({
    formGuid: hubspotServiceFormGuid,
    hubspotutk: readHubSpotCookie(request),
    pageUri: request.headers.get("referer") || undefined,
    pageName: `Service enquiry — ${serviceTitle}`,
    // This form uses `phone`, unlike the contact form's `mobilephone`.
    fields: [
      { name: "firstname", value: name },
      { name: "email", value: email },
      { name: "phone", value: contactNumber },
      { name: "message", value: message },
    ],
  });

  return NextResponse.json({ ok: true });
}
