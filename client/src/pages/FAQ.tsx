import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ = () => {
  const faqData: FaqItem[] = [
    {
      id: "item-1",
      question: "How do I place an order?",
      answer:
        "Simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your order.",
    },
    {
      id: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay securely through our encrypted checkout system.",
    },
    {
      id: "item-3",
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3 to 5 business days for domestic orders. International delivery timelines vary depending on destination custom procedures but generally range from 7 to 14 business days.",
    },
    {
      id: "item-4",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return window for all unused, unopened items in original packaging. Please reach out to our dedicated support desk to initiate a hassle-free return or exchange ticket.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Find answers to common questions
          </p>
        </header>

        <Accordion defaultValue={["item-1"]} className="space-y-4 pt-4 w-full">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-card/50 border border-border/80 rounded-xl overflow-hidden transition-all duration-300 hover:bg-card/80 data-[state=open]:bg-card shadow-sm"
            >
              <AccordionTrigger className="w-full text-left px-6 py-5 flex items-center justify-between text-foreground hover:text-foreground/90 font-medium text-sm md:text-base hover:no-underline transition-colors duration-200 [&>svg]:text-muted-foreground [&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[2.5px]">
                <span className="pr-4 tracking-wide">{item.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-5 pt-1 text-muted-foreground text-xs md:text-sm font-light leading-relaxed border-t border-border/40">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
