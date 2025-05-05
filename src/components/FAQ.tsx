import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "ما المقاسات المتوفرة؟",
    answer: "كوتشي Nike SV5 متوفر بالمقاسات من 41 حتى 45، بتلبيس مظبوط يريحك من أول مرة. لو كنت بين مقاسين، بننصح تختار المقاس الأكبر لضمان راحة أكبر.",
  },
  {
    question: "إزاي أطلب الكوتشي؟",
    answer: "بكل سهولة! اختار اللون والمقاس، وسجّل بياناتك في الفورم، وهنتواصل معاك لتأكيد الطلب والدفع عند الاستلام.",
  },
  {
    question: "إزاي أعتني بالكوتشي؟",
    answer: "نظّفه بقطعة قماش ناعمة كل فترة، ويفضل تبعده عن الحرارة العالية أو الشمس المباشرة. ولما تكون مش لابسه، حطه في مكان جاف مع دعامة للحفاظ على شكله.",
  },
  {
    question: "الشحن بيستغرق قد إيه وبتكلفة كام؟",
    answer: "مدة التوصيل بتكون من 2 إلى 4 أيام عمل حسب موقعك، وتكلفة الشحن بتُحسب عند تأكيد الطلب بناءً على المحافظة.",
  }
];


export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h3 className="text-xl font-serif">الأسئلة الشائعة</h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg"
          >
            <button
              className="flex items-center justify-between w-full p-4 text-right"
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium flex-1">{faq.question}</span>
              <span className="ml-2">
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 pt-0 text-sm text-muted-foreground text-right">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
