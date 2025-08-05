import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "./ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "What is Neuronest?",
      answer:
        "Neuronest is a content-sharing platform that lets you upload, manage, and share images, videos, articles, or audio — all in one place. Whether you're a creator or a team, it helps you stay organized and visible.",
    },
    {
      question: "Can I upload files or just share links?",
      answer:
        "You can do both! Neuronest allows you to either upload files (stored securely on Cloudinary) or paste external links like YouTube videos, GitHub repos, or blog posts.",
    },
    {
      question: "Who can use Neuronest?",
      answer:
        "Anyone who creates or shares content — developers, designers, writers, educators, startups, and solo makers. If you've got content, Neuronest is your nest 🪺.",
    },
    {
      question: "Is my content secure?",
      answer:
        "Absolutely. All uploads are securely stored with industry-grade protection via Cloudinary, and your user data is safeguarded with proper authentication and encryption.",
    },
    {
      question: "Is Neuronest free to use?",
      answer:
        "Yes, Neuronest is free during its early access phase. We may add premium features later, but the core platform will remain free for all users.",
    },
  ];

  return (
    <section
      id="faq"
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-10"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about Neuronest
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4 ">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden "
            >
              <AccordionTrigger className="px-6 py-4 transition-colors cursor-pointer">
                <h3 className="text-xl   font-medium text-left text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700 text-lg dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
