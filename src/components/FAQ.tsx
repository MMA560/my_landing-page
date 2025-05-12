import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FrontendFAQItem } from '@/types/product'; // استيراد الواجهة الجديدة

interface FAQProps {
    faqs: FrontendFAQItem[]; // الآن تأتي كـ prop
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-6" dir="rtl">
            <h3 className="text-xl font-serif text-center">الأسئلة الشائعة</h3>

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