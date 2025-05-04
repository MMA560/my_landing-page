import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "ما المقاسات المتوفرة؟",
    answer: "أحذيتنا متوفرة بمقاسات US من 6 إلى 13. ننصح باختيار مقاسك المعتاد حيث أن الأحذية تأتي بمقاس مطابق. إذا كنت بين مقاسين، يُفضل اختيار المقاس الأكبر بنصف درجة."
  },
  {
    question: "ما هي سياسة الاسترجاع؟",
    answer: "نقدم سياسة استرجاع لمدة 30 يومًا للأحذية غير المستخدمة وفي تغليفها الأصلي. الاسترجاع مجاني ويتم معالجة المبالغ المستردة خلال 5-7 أيام عمل من استلام المنتج."
  },
  {
    question: "كيف أعتني بحذاء الجلد؟",
    answer: "ننصح بتنظيف الحذاء بقطعة قماش ناعمة بشكل منتظم واستخدام بلسم الجلد كل عدة أشهر. يُفضل تجنب تعريض الحذاء للحرارة المباشرة واستخدام دعامة الحذاء للحفاظ على شكله عند عدم الاستخدام."
  },
  {
    question: "ما هي مدة الشحن؟",
    answer: "نوفر شحنًا قياسيًا مجانيًا يستغرق من 3 إلى 5 أيام عمل. كما يتوفر الشحن السريع مقابل رسوم إضافية ويوصل خلال 1-2 يوم عمل."
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
