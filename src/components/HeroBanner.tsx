
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white py-12 md:py-16">
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/hero-banner.jpg"
          alt="مجموعة أحذية فاخرة"
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/50 to-black/80" />
      
      <div className="container relative mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mr-auto rtl:mr-0 rtl:ml-auto">
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            الحرفية تلتقي بالأناقة
          </h1>
          
          <p className="mt-3 max-w-md text-sm md:text-base text-gray-200">
            اكتشف مجموعتنا من الأحذية الفاخرة المصنوعة يدويًا بأرقى المواد والاهتمام بالتفاصيل.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-gold hover:bg-gold/90 text-white text-sm" size="sm">
              تسوق المجموعة
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm" size="sm">
              استكشف صناعتنا
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};