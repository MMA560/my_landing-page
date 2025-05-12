import React from "react";
import { FrontendProductDetailSection } from "@/types/product";

interface ProductDetailsProps {
    description: string;
    sections: FrontendProductDetailSection[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ description, sections }) => {
    return (
        <div className="space-y-6 text-right">
            <h3 className="text-xl font-serif text-center">تفاصيل المنتج</h3>

            <div className="space-y-4">
                <p className="text-muted-foreground" dir="rtl">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-3">
                            <h4 className="font-medium">{section.title}</h4>
                            <ul className="space-y-2 text-sm">
                                {section.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 justify-end"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last" ></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};