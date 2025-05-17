import { useEffect, useState, useRef, useMemo } from "react";
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
import { RefreshCcwDot, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// استيراد خدمة الـ API والأنواع المطلوبة
import { api } from "@/services/api";
import { ProductOut, FrontendProductInventory } from "@/types/product";

// استيراد React Query
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Index = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log("Product ID from URL:", productId);

  // إنشاء مثيل QueryClient
  const queryClient = useQueryClient();

  // تهيئة حالة المنتج
  const [product, setProduct] = useState<ProductOut | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const orderFormRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // استخدام React Query لجلب بيانات المنتج
  const {
    data: productData,
    isLoading: isLoadingProduct,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is missing from URL.");
      }
      const fetchedProduct = await api.getProductById(parseInt(productId));
      if (!fetchedProduct) {
        throw new Error(`Product with ID ${productId} not found.`);
      }
      return fetchedProduct;
    },
    enabled: !!productId, // تعطيل الاستعلام إذا لم يكن هناك معرف منتج
  });

  // استخدام React Query لجلب المخزون مع تحديث تلقائي
  const {
    data: inventoryData,
    isLoading: isLoadingInventory,
    isError: isInventoryError,
  } = useQuery({
    queryKey: ["inventory", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error(
          "Product ID is missing from URL. Cannot fetch dynamic inventory."
        );
      }
      return await api.getInventoryByProductId(parseInt(productId));
    },
    // تكوين React Query لتحديث المخزون تلقائيًا
    refetchInterval: 30000, // تحديث كل 30 ثانية
    refetchOnWindowFocus: true, // تحديث عند التركيز على النافذة
    refetchOnReconnect: true, // تحديث عند إعادة الاتصال بالإنترنت
    refetchOnMount: true, // تحديث عند تركيب المكون
    enabled: !!productId, // تعطيل الاستعلام إذا لم يكن هناك معرف منتج
  });

  // تحديث حالة المنتج عند استلام بيانات المنتج من API
  useEffect(() => {
    if (productData) {
      console.log(`Fetched product with ID ${productId}:`, productData.name);
      setProduct(productData);
    }
  }, [productData, productId]);

  // تحديث حالة المنتج عند استلام بيانات المخزون الجديدة
  useEffect(() => {
    if (inventoryData && product) {
      setProduct((prevProduct) => {
        if (!prevProduct) {
          console.warn("Product state was null while updating inventory.");
          return null;
        }

        // دمج بيانات المخزون الجديدة مع بيانات المنتج الموجودة
        const updatedProduct = {
          ...prevProduct, // الاحتفاظ بجميع خصائص المنتج الأخرى
          inventory: inventoryData.inventory, // تحديث كائن المخزون
          inventoryIds: inventoryData.inventoryIds, // تحديث معرفات المخزون
        };

        console.log(
          `Dynamic inventory data updated for product ${updatedProduct.id}`,
          inventoryData.inventory
        );

        // المقارنة بين المخزون القديم والجديد للتركيبة المحددة
        if (selectedColor && selectedSize) {
          const oldStock =
            prevProduct.inventory[selectedColor]?.[selectedSize] || 0;
          const newStock =
            inventoryData.inventory[selectedColor]?.[selectedSize] || 0;

          // إذا تغير المخزون للتركيبة المحددة، أظهر إشعارًا للمستخدم
          if (oldStock !== newStock) {
            console.log(
              `Stock changed for ${selectedColor}/${selectedSize}: ${oldStock} -> ${newStock}`
            );

            // عرض إشعار فقط إذا تغير المخزون بشكل ملحوظ
            if (oldStock > 0 && newStock === 0) {
              toast({
                title: "تنبيه المخزون",
                description:
                  "هذا المنتج لم يعد متوفرًا في المخزون للمقاس واللون المحددين.",
                variant: "destructive",
              });
            } //else if (oldStock === 0 && newStock > 0) {
            //toast({
            //  title: "تحديث المخزون",
            // description: `تم تحديث المخزون! هذا المنتج أصبح متاحًا الآن (${newStock} قطعة متوفرة).`,
            //});}
            else if (newStock < quantity) {
              // إذا أصبحت الكمية المطلوبة أكبر من المخزون المتاح، قم بتعديل الكمية
              const newQuantity = newStock > 0 ? newStock : 1;
              setQuantity(newQuantity);

              toast({
                title: "تعديل الكمية",
                description: `تم تحديث المخزون المتاح. تم تعديل الكمية لتناسب المخزون الجديد: ${newStock} قطعة.`,
                variant: "default",
              });
            }
          }
        }

        return updatedProduct;
      });
    }
  }, [inventoryData, selectedColor, selectedSize, quantity, toast]);

  // useEffect لتعيين اللون والمقاس الافتراضي بعد تهيئة المنتج
  useEffect(() => {
    if (
      product &&
      product.availableColors &&
      product.availableColors.length > 0 &&
      !selectedColor
    ) {
      setSelectedColor(product.availableColors[0].value);
    }
    if (
      product &&
      product.availableSizes &&
      product.availableSizes.length > 0 &&
      !selectedSize
    ) {
      setSelectedSize(product.availableSizes[0].value);
    }
  }, [product]);

  // يتم حساب المخزون المتاح للتركيبة المختارة
  const availableStock = useMemo(() => {
    if (!product || !selectedColor || !selectedSize) {
      return 0;
    }
    return product.inventory[selectedColor]?.[selectedSize] || 0;
  }, [product, selectedColor, selectedSize]);

  // يتم فحص إذا كانت الكمية المطلوبة متوفرة
  const isQuantityAvailable = useMemo(() => {
    return quantity <= availableStock;
  }, [quantity, availableStock]);

  // يتم تحديد ما إذا كان زر الطلب يجب أن يكون معطلاً
  const isOrderDisabled = useMemo(() => {
    return (
      !product ||
      !selectedSize ||
      !selectedColor ||
      quantity <= 0 ||
      !isQuantityAvailable ||
      availableStock === 0
    );
  }, [
    product,
    selectedSize,
    selectedColor,
    quantity,
    isQuantityAvailable,
    availableStock,
  ]);

  const scrollToOrderForm = () => {
    if (isOrderDisabled) {
      toast({
        title: "خطأ في الطلب",
        description:
          !selectedSize || !selectedColor
            ? "يرجى اختيار المقاس واللون."
            : availableStock === 0
            ? "هذا المقاس واللون غير متوفرين حاليًا."
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
    if (isNaN(value) || value < 1) {
      setQuantity(1);
      return;
    }

    if (value > availableStock) {
      toast({
        title: "كمية غير متاحة",
        description: `لا يمكنك طلب أكثر من ${availableStock} قطعة لهذا المقاس واللون.`,
        variant: "destructive",
      });
      setQuantity(availableStock > 0 ? availableStock : 1);
    } else {
      setQuantity(value);
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
        return prevQuantity;
      }
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // التعامل مع حالة تحميل أو خطأ في بيانات المنتج
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4">
        {" "}
        <RefreshCcwDot className="animate-spin mr-2" size={60} />
        جارٍ التحميل
      </div>
    );
  }

  if (isProductError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4">
        {" "}
        <RefreshCcwDot className="animate-spin mr-2" size={60} />
        جارٍ التحميل
      </div>
    );
  }

  // إعداد بيانات العرض للعميل
  const displayPrice = product.price;
  const displayOldPrice = product.oldPrice || null;
  const displayDiscount =
    product.discount ||
    (product.oldPrice && product.price && product.oldPrice > product.price
      ? Math.floor(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0);
  const displayTags = product.tags || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* قسم البطل مع مقدمة المنتج */}
      <section className="pt-24 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-up text-right">
              <span className="text-sm uppercase tracking-widest text-muted-foreground mb-2 inline-block">
                {product.label || "كفاءة وأناقة"}
              </span>
              <h1
                className="text-4xl md:text-5xl font-serif font-medium mb-4"
                dir="rtl"
              >
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

              {/* السعر والخصم */}
              <div className="flex flex-row-reverse items-center space-x-reverse space-x-4 mb-6 text-right">
                <span className="text-2xl font-bold">
                  جنيه {displayPrice.toFixed(2)}
                </span>
                {displayOldPrice && displayOldPrice > displayPrice && (
                  <span className="text-sm line-through text-muted-foreground">
                    جنيه {displayOldPrice.toFixed(2)}
                  </span>
                )}
                {displayDiscount > 0 && (
                  <span
                    className="bg-gold/10 text-gold px-2.5 py-0.5 rounded text-sm font-medium"
                    dir="rtl"
                  >
                    خصم {displayDiscount}%
                  </span>
                )}
              </div>

              {/* خيارات المنتج (الألوان والمقاسات) */}
              <div className="mb-6">
                <ProductOptions
                  availableSizes={product.availableSizes}
                  availableColors={product.availableColors}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeChange={(size) => {
                    setSelectedSize(size);
                    const newAvailableStock =
                      product.inventory[selectedColor || ""]?.[size] || 0;
                    if (quantity > newAvailableStock) {
                      const cappedQuantity =
                        newAvailableStock > 0 ? newAvailableStock : 1;
                      setQuantity(cappedQuantity);
                      if (cappedQuantity < quantity) {
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
                    const newAvailableStock =
                      product.inventory[color]?.[selectedSize || ""] || 0;
                    if (quantity > newAvailableStock) {
                      const cappedQuantity =
                        newAvailableStock > 0 ? newAvailableStock : 1;
                      setQuantity(cappedQuantity);
                      if (cappedQuantity < quantity) {
                        toast({
                          title: "تعديل الكمية",
                          description: `تم تعديل الكمية لتناسب المخزون المتاح للون الجديد: ${newAvailableStock} قطعة.`,
                          variant: "default",
                        });
                      }
                    }
                  }}
                  inventory={product.inventory}
                  selectedGalleryColor={
                    selectedColor ||
                    product.availableColors[0]?.value ||
                    "general"
                  }
                />
                {selectedSize && selectedColor && (
                  <p
                    dir="rtl"
                    className={`mt-2 text-xs ${
                      !isLoadingInventory && availableStock <= 0
                        ? "text-red-600" // لون أحمر في حالة عدم التوفر
                        : "text-muted-foreground" // اللون الافتراضي في باقي الحالات
                    }`}
                  >
                    {isLoadingInventory
                      ? `... جارٍ تحميل بيانات المخزون`
                      : availableStock > 0
                      ? `المخزون المتاح: ${availableStock} قطعة`
                      : `هذا المقاس واللون غير متوفرين حاليًا.`}
                  </p>
                )}
              </div>

              {/* قسم العدد (الكمية) */}
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
                    disabled={quantity <= 1 || availableStock === 0}
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
                    disabled={
                      quantity >= availableStock || availableStock === 0
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* زر الطلب */}
              <Button
                onClick={scrollToOrderForm}
                className="bg-gold hover:bg-gold/90 text-white"
                size="lg"
                disabled={isOrderDisabled}
              >
                {isLoadingInventory ? "جاري التحميل..." : "اطلب الآن"}
              </Button>
            </div>

            {/* قسم الصور */}
            <div className="order-1 lg:order-2 animate-fade-in flex justify-center">
              <div className="w-full max-w-md">
                <Gallery
                  galleryImages={product.galleryImages}
                  selectedColor={
                    selectedColor ||
                    product.availableColors[0]?.value ||
                    "general"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* أقسام المحتوى الأخرى */}
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
              {product.videoInfo && (
                <ProductVideo videoInfo={product.videoInfo} />
              )}
              <hr className="border-t border-gray-300 my-6" />
              <UserReviews productId={product.id} />
              <hr className="border-t border-gray-300 my-6" />
              <FAQ faqs={product.faqs} />
            </div>
            {/* قسم نموذج الطلب */}
            <div
              ref={orderFormRef}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <OrderForm
                  productName={product.name}
                  productId={product.id}
                  unitPrice={product.price}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  availableStock={availableStock}
                  inventory={product.inventory}
                  inventoryIds={product.inventoryIds}
                  availableColors={product.availableColors} // إضافة هذا السطر
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Pass real data to StickyCTA */}     {" "}
      <StickyCTA
        scrollToOrderForm={scrollToOrderForm}
        currentPrice={displayPrice} // تم تمرير السعر الحقيقي للمنتج
        isOrderDisabled={isOrderDisabled} // تم تمرير حالة تفعيل/تعطيل زر الطلب
        isLoading={isLoadingInventory} // تم تمرير حالة تحميل بيانات المخزون
      />
    </div>
  );
};

export default Index;
