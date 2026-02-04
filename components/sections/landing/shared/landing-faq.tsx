"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

interface LandingFAQProps {
  title?: string;
  faqs: FAQItem[];
}

// Default FAQs that address common objections
export const defaultLandingFAQs: FAQItem[] = [
  {
    question: "Will I actually use it?",
    answer:
      "Unlike complex CRMs, Client Keeper works with how you already communicate—voice notes. If you can talk, you can use it. Most agents are fully up and running in under 20 minutes.",
  },
  {
    question: "Is setup hard?",
    answer:
      "We handle the heavy lifting. Done-for-you data transfer means your contacts are imported automatically. No spreadsheet headaches.",
  },
  {
    question: "Will it work on my phone?",
    answer:
      "Built mobile-first. Most of our users manage their entire business from their phone, between showings, in the car, wherever they are.",
  },
  {
    question: "Is the AI going to do something weird?",
    answer:
      "MYRA is trained specifically for real estate. She understands your business and speaks your language. Think of her as a really smart assistant who happens to never forget anything.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel anytime—no questions asked. We don't believe in trapping customers. If Client Keeper isn't working for you, you can leave whenever you want.",
  },
];

function FAQAccordionItem({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base md:text-lg font-medium text-foreground pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LandingFAQ({
  title = "Questions? We've Got Answers.",
  faqs = defaultLandingFAQs,
}: LandingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-2xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="mt-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
