import LegalPage from "@/components/common/LegalPage";

const sections = [
  {
    heading: "Using ShopMate",
    paragraphs: [
      "These Terms and Conditions apply when you access or use ShopMate. By creating an account or using the service, you agree to these terms. If you do not agree, do not use the service.",
      "You must provide accurate account information, keep your login credentials secure, and promptly tell us if you believe your account has been accessed without permission. You are responsible for activity carried out through your account, except where applicable law provides otherwise.",
    ],
  },
  {
    heading: "Products, sellers, and orders",
    paragraphs: [
      "ShopMate provides a marketplace where products may be offered by sellers. Product descriptions, availability, and prices are provided on the relevant product or checkout pages and may change. We work to keep listings accurate, but a listing may contain an error or become unavailable.",
      "Submitting an order is a request to purchase. Order confirmation, payment authorization, and acceptance are subject to the checkout process and availability. If an order cannot be fulfilled, we will communicate the next steps, including any applicable refund.",
    ],
  },
  {
    heading: "Payment, delivery, and returns",
    paragraphs: [
      "Payment methods and any applicable charges are shown during checkout. Payment processing may be provided by third parties and is also subject to their terms.",
      "Delivery estimates, shipping terms, and return or refund conditions shown for an order or product apply to that purchase. Contact ShopMate support if you need help with an order.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Use ShopMate lawfully and do not interfere with the service, attempt unauthorized access, submit misleading information, or misuse another person's account or content. We may restrict or suspend access where we reasonably believe these terms have been violated, subject to applicable law.",
    ],
  },
  {
    heading: "Content and third-party services",
    paragraphs: [
      "ShopMate and its associated branding and software are protected by applicable intellectual-property laws. Product and seller content may belong to their respective owners. You may use the service and its content only as permitted by law and these terms.",
      "The service may rely on third-party websites or providers. Their services are governed by their own terms and privacy practices.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update these terms as the service changes. The latest version will be posted on this page with its updated date. Your continued use after an update means you accept the revised terms to the extent permitted by applicable law.",
      "Questions about these terms can be sent to support@shopmate.com.",
    ],
  },
];

function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms and Conditions"
      summary="Please read these terms before using ShopMate or creating an account."
      sections={sections}
    />
  );
}

export default TermsAndConditions;
