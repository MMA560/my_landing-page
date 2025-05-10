import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { ProductOptions } from "@/components/ProductOptions";
import { ProductHighlights } from "@/components/ProductHighlights";
import { FAQ } from "@/components/FAQ";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductVideo } from "@/components/ProductVideo";
import { UserReviews } from "@/components/UserReviews";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";

const Index = () => {
  const productData = {
    name: "كوتشي NIKE SV5",
    nameEn: "NIKE SV5",
    label: "كفاءة وأناقة",
    description:
      "كوتشي نايك مصمم لراحتك في كل خطوة، مثالي للمهام اليومية والخروجات، يجمع بين الشكل العصري والأداء العملي بخامات عالية الجودة.",
    price: 490,
    oldPrice: 550,
    discount: 11,
    tags: [
      { name: "رجالي", id: "men" },
      { name: "مناسب للمهام اليومية", id: "daily" },
      { name: "نعل P.V.C بيور", id: "pvc-sole" },
      { name: "فرش طبي", id: "medical-insole" },
      { name: "تلبيس مظبوط", id: "perfect-fit" },
    ],
    defaultColor: "black",
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    productData.defaultColor
  );
  // Shared quantity state between components
  const [quantity, setQuantity] = useState(1);
  const orderFormRef = useRef<HTMLDivElement>(null);

  const scrollToOrderForm = () => {
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
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
                {productData.label}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4" dir="rtl">
                {productData.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6" dir="rtl">
                {productData.description}
              </p>

              {/* التصنيفات */}
              <div className="flex flex-row-reverse flex-wrap items-center gap-2 mb-6">
                {productData.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="bg-secondary/30 hover:bg-secondary/50 flex items-center gap-1 px-2.5 py-1 text-sm rounded-full"
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag.name}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-row-reverse items-center space-x-reverse space-x-4 mb-6 text-right">
                <span className="text-2xl font-bold">
                  جنيه {productData.price.toFixed(2)}
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  جنيه {productData.oldPrice.toFixed(2)}
                </span>
                <span className="bg-gold/10 text-gold px-2.5 py-0.5 rounded text-sm font-medium">
                  خصم {productData.discount}%
                </span>
              </div>

              <div className="mb-6">
                <ProductOptions
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeChange={setSelectedSize}
                  onColorChange={setSelectedColor}
                />
              </div>

              {/* العدد*/}
              <div className="mb-8 text-right" dir="rtl">
                <Label
                  htmlFor="quantity"
                  className="font-medium text-lg block mb-3"
                >
                  العدد
                </Label>
                <div className="flex items-center justify-start gap-2">
                  <Button
                    onClick={decreaseQuantity}
                    className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground"
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-24 text-center border-none"
                    disabled
                  />
                  <Button
                    onClick={increaseQuantity}
                    className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground"
                  >
                    +
                  </Button>
                </div>
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
                <Gallery selectedColor={selectedColor || productData.defaultColor} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
            <div
              ref={orderFormRef}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <OrderForm
                  productName={productData.nameEn}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
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