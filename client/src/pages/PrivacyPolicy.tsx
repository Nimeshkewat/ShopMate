import LegalPage from "@/components/common/LegalPage";

const sections = [
  {
    heading: "Information we collect",
    paragraphs: [
      "When you create an account, we collect the name, email address, and password you provide. When you shop, we may also process order details and the delivery information needed to fulfill your purchase. If you contact support, we receive the information you include in your message.",
      "Payments are handled through the payment options presented at checkout. Do not send full payment-card details to ShopMate through support messages.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use information to create and secure accounts, provide the storefront, process and communicate about orders, support customers and sellers, and maintain and improve the service.",
      "We may use your email address for account and order-related messages. We will not use it for promotional messages unless permitted by applicable law and, where required, you have agreed.",
    ],
  },
  {
    heading: "When information is shared",
    paragraphs: [
      "Information is shared only as needed to operate the service—for example, with sellers involved in fulfilling an order, delivery providers, payment providers, and service providers that support ShopMate. We may also disclose information when required by law or to protect users and the service.",
    ],
  },
  {
    heading: "Retention and security",
    paragraphs: [
      "We keep personal information for as long as needed to provide the service and meet applicable legal, accounting, and operational requirements. We use reasonable safeguards to protect information, but no online service can guarantee absolute security.",
    ],
  },
  {
    heading: "Your choices and requests",
    paragraphs: [
      "You can update profile information through your account where those controls are available. To ask a question or request access, correction, or deletion of your personal information, contact us at support@shopmate.com. We may need to retain some information where the law requires it or where it is needed to complete a transaction or resolve a dispute.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update this policy as the service changes. The latest version will be posted on this page with its updated date. For privacy questions, email support@shopmate.com.",
    ],
  },
];

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="This policy explains how ShopMate handles information when you use our marketplace and related services."
      sections={sections}
    />
  );
}

export default PrivacyPolicy;
