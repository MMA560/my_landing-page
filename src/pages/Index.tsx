import { useEffect, useState, useRef, useMemo } from "react"; // Added useMemo
import { useParams } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast"; // Import useToast

import { ProductOut } from "@/types/product";
import { MOCK_PRODUCT_DATA } from "@/data/mocProduct";

const Index = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log("Product ID from URL:", productId);

  const [product, setProduct] = useState<ProductOut | null>(MOCK_PRODUCT_DATA);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const orderFormRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast(); // Initialize useToast

  useEffect(() => {
    // Set default color and size if available in mock data
    if (MOCK_PRODUCT_DATA.availableColors && MOCK_PRODUCT_DATA.availableColors.length > 0) {
      setSelectedColor(MOCK_PRODUCT_DATA.availableColors[0].value);
    }
    if (MOCK_PRODUCT_DATA.availableSizes && MOCK_PRODUCT_DATA.availableSizes.length > 0) {
      setSelectedSize(MOCK_PRODUCT_DATA.availableSizes[0].value);
    }
  }, []);

  // Memoize the current stock for the selected variant
  const availableStock = useMemo(() => {
    if (!product || !selectedColor || !selectedSize) {
      return 0;
    }
    return product.inventory[selectedColor]?.[selectedSize] || 0;
  }, [product, selectedColor, selectedSize]);

  // Check if the selected quantity is available in stock
  const isQuantityAvailable = useMemo(() => {
    return quantity <= availableStock;
  }, [quantity, availableStock]);

  // Determine if the order button should be disabled
  const isOrderDisabled = useMemo(() => {
    return !selectedSize || !selectedColor || quantity <= 0 || !isQuantityAvailable;
  }, [selectedSize, selectedColor, quantity, isQuantityAvailable]);


  const scrollToOrderForm = () => {
    if (isOrderDisabled) {
      toast({
        title: "خطأ في الطلب",
        description: !selectedSize || !selectedColor
          ? "يرجى اختيار المقاس واللون."
          : !isQuantityAvailable
            ? `الكمية المطلوبة (${quantity}) غير متوفرة لهذا المقاس واللون. الكمية المتاحة: ${availableStock}.`
            : "يرجى تحديد الكمية.",
        variant: "destructive",
      });
      return;
    }

    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      if (value > availableStock) {
        toast({
          title: "كمية غير متاحة",
          description: `لا يمكنك طلب أكثر من ${availableStock} قطعة لهذا المقاس واللون.`,
          variant: "destructive",
        });
        setQuantity(availableStock > 0 ? availableStock : 1); // Cap at available stock or set to 1 if 0
      } else {
        setQuantity(value);
      }
    } else if (value === 0) {
      setQuantity(1); // Prevent quantity from being 0
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      if (newQuantity > availableStock) {
        toast({
          title: "كمية غير متاحة",
          description: `لا يمكنك طلب أكثر من ${availableStock} قطعة لهذا المقاس واللون.`,
          variant: "destructive",
        });
        return prevQuantity; // Do not increase if it exceeds available stock
      }
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        المنتج غير موجود.
      </div>
    );
  }

  const displayPrice = product.price;
  const displayOldPrice = product.oldPrice || (product.price * 1.11).toFixed(2);

  const displayDiscount = product.oldPrice && product.price && product.oldPrice > product.price
    ? Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

  const displayTags = product.tags || [
    { name: "رجالي", id: "men" },
    { name: "مناسب للمهام اليومية", id: "daily" },
    { name: "نعل P.V.C بيور", id: "pvc-sole" },
    { name: "فرش طبي", id: "medical-insole" },
    { name: "تلبيس مظبوط", id: "perfect-fit" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Hero Section with Product Intro */}
      <section className="pt-24 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-up text-right">
              <span className="text-sm uppercase tracking-widest text-muted-foreground mb-2 inline-block">
                {product.label || "كفاءة وأناقة"}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4" dir="rtl">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6" dir="rtl">
                {product.description}
              </p>

              {/* التصنيفات */}
              <div className="flex flex-row-reverse flex-wrap items-center gap-2 mb-6">
                {displayTags.map((tag) => (
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

              <div className="flex flex-row-reverse items-center space-x-reverse space-x-4 mb-6 text-right" >
                <span className="text-2xl font-bold">
                  جنيه {displayPrice.toFixed(2)}
                </span>
                <span className="text-sm line-through text-muted-foreground" >
                  جنيه {parseFloat(String(displayOldPrice)).toFixed(2)}
                </span>
                <span className="bg-gold/10 text-gold px-2.5 py-0.5 rounded text-sm font-medium" dir="rtl">
                  خصم {displayDiscount}%
                </span>
              </div>

              <div className="mb-6">
                <ProductOptions
                  availableSizes={product.availableSizes}
                  availableColors={product.availableColors}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeChange={(size) => {
                    setSelectedSize(size);
                    // Reset quantity or adjust if newly selected combination has less stock
                    const newAvailableStock = product.inventory[selectedColor || '']?.[size] || 0;
                    if (quantity > newAvailableStock) {
                      setQuantity(newAvailableStock > 0 ? newAvailableStock : 1);
                      if (newAvailableStock < quantity) { // Only show toast if quantity actually changed due to stock
                        toast({
                          title: "تعديل الكمية",
                          description: `تم تعديل الكمية لتناسب المخزون المتاح للمقاس الجديد: ${newAvailableStock} قطعة.`,
                          variant: "default",
                        });
                      }
                    }
                  }}
                  onColorChange={(color) => {
                    setSelectedColor(color);
                    // Reset quantity or adjust if newly selected combination has less stock
                    const newAvailableStock = product.inventory[color]?.[selectedSize || ''] || 0;
                    if (quantity > newAvailableStock) {
                      setQuantity(newAvailableStock > 0 ? newAvailableStock : 1);
                      if (newAvailableStock < quantity) { // Only show toast if quantity actually changed due to stock
                        toast({
                          title: "تعديل الكمية",
                          description: `تم تعديل الكمية لتناسب المخزون المتاح للون الجديد: ${newAvailableStock} قطعة.`,
                          variant: "default",
                        });
                      }
                    }
                  }}
                  // Pass availableStock to ProductOptions to disable unavailable options
                  inventory={product.inventory}
                  // Pass the selected color to ensure `Gallery` updates correctly
                  selectedGalleryColor={selectedColor || (product.availableColors[0]?.value || "general")}
                />
                {/* Display stock message 
                {selectedSize && selectedColor && (
                  <p dir="rtl" className={`mt-2 text-sm ${availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {availableStock > 0
                      ? `المخزون المتاح: ${availableStock} قطعة`
                      : `هذا المقاس واللون غير متوفرين حاليًا.`}
                  </p>
                )}*/}
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
                    disabled={quantity <= 1 || availableStock === 0} // Disable if quantity is 1 or less, or no stock
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
                    disabled={availableStock === 0} // Disable input if no stock
                  />
                  <Button
                    onClick={increaseQuantity}
                    className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground"
                    disabled={quantity >= availableStock || availableStock === 0} // Disable if quantity reaches available stock or no stock
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                onClick={scrollToOrderForm}
                className="bg-gold hover:bg-gold/90 text-white"
                size="lg"
                disabled={isOrderDisabled} // Disable based on availability
              >
                اطلب الآن
              </Button>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in flex justify-center">
              <div className="w-full max-w-md">
                <Gallery
                  galleryImages={product.galleryImages}
                  selectedColor={selectedColor || (product.availableColors[0]?.value || "general")}
                />
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
              <ProductHighlights highlights={product.highlights} />
              <hr className="border-t border-gray-300 my-6" />
              <ProductDetails
                description={product.description || ""}
                sections={product.detailsSections}
              />
              <hr className="border-t border-gray-300 my-6" />
              {product.videoInfo && <ProductVideo videoInfo={product.videoInfo} />}
              <hr className="border-t border-gray-300 my-6" />
              <UserReviews />
              <hr className="border-t border-gray-300 my-6" />
              <FAQ faqs={product.faqs} />
            </div>
            <div
              ref={orderFormRef}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <OrderForm
                  productName={product.name}
                  productId={product.id} // Pass productId
                  unitPrice={product.price} // Pass actual product price
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  availableStock={availableStock} // Pass available stock to form
                  // Pass inventory to the form for checking stock
                  inventory={product.inventory}
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