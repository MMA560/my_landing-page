import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { ProductOptions } from "@/components/ProductOptions";
import { ProductHighlights } from "@/components/ProductHighlights";
import { CustomerReviews } from "@/components/CustomerReviews";
import { FAQ } from "@/components/FAQ";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductVideo } from "@/components/ProductVideo";
import { UserReviews } from "@/components/UserReviews";

const Index = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>("black");
  const orderFormRef = useRef<HTMLDivElement>(null);

  const scrollToOrderForm = () => {
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Hero Section with Product Intro */}
      <section className="pt-24 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-up text-right">
              <span className="text-sm uppercase tracking-widest text-muted-foreground mb-2 inline-block">
                مجموعة مميزة
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
                مترو أوكسفورد
              </h1>
              <p className="text-lg text-muted-foreground mb-6" dir="rtl">
                تلتقي الحرفية اليدوية مع التصميم العصري في أحذيتنا الجلدية
                أوكسفورد المميزة.
              </p>
              <div className="flex flex-row-reverse items-center space-x-reverse space-x-4 mb-6 text-right">
                <span className="text-2xl font-bold">$295.00</span>
                <span className="text-sm line-through text-muted-foreground">
                  $350.00
                </span>
                <span className="bg-gold/10 text-gold px-2.5 py-0.5 rounded text-sm font-medium">
                  خصم 15%
                </span>
              </div>

              <div className="mb-8">
                <ProductOptions
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeChange={setSelectedSize}
                  onColorChange={setSelectedColor}
                />
              </div>

              <Button
                onClick={scrollToOrderForm}
                className="bg-gold hover:bg-gold/90 text-white"
                size="lg"
              >
                اطلب الآن
              </Button>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in flex justify-center">
              <div className="w-full max-w-md">
                <Gallery selectedColor={selectedColor || "black"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div
              ref={orderFormRef}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <OrderForm
                  productName="Metro Oxford"
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                />
              </div>
            </div>
            <div className="space-y-12">
              <ProductHighlights />
              <hr className="border-t border-gray-300 my-6" />

              <ProductDetails />
              <hr className="border-t border-gray-300 my-6" />

              <ProductVideo />
              <hr className="border-t border-gray-300 my-6" />

              <UserReviews />
              <hr className="border-t border-gray-300 my-6" />

              <FAQ />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA scrollToOrderForm={scrollToOrderForm} />
    </div>
  );
};

export default Index;
