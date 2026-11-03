import { BrevoClient } from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  throw new Error("BREVO_API_KEY environment variable is required");
}

const brevo = new BrevoClient({ apiKey });

export default brevo;
