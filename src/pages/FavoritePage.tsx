import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCookies } from "react-cookie";
import { ProductOut } from "@/types/product";
import { HeartOff, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { favoritesManager } from "@/services/favoritesManager";

const FavoritesPage = () => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const queryClient = useQueryClient();
  const [localFavoriteIds, setLocalFavoriteIds] = useState<number[]>([]);

  // الاستماع لتغييرات المفضلات المحلية
  useEffect(() => {
    const unsubscribe = favoritesManager.addListener((favorites) => {
      setLocalFavoriteIds(favorites);
    });

    return unsubscribe;
  }, []);

  const {
    data: favoriteProducts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => favoritesManager.fetchFavoritesFromServer(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 دقائق
    retry: 1,
  });

  const removeFromFavorites = async (productId: string, isLocallyRemoved?: boolean) => {
    const numericProductId = parseInt(productId);
    
    if (!userId) {
      toast.error("يجب تسجيل الدخول للإزالة من المفضلة");
      return;
    }

    try {
      if (isLocallyRemoved) {
        // إذا تم الحذف محلياً بالفعل، فقط نحديث الكاش
        favoritesManager.removeFavoriteSync(numericProductId);
        
        // تحديث الكاش
        const currentFavorites = queryClient.getQueryData<ProductOut[]>(["favorites", userId]);
        if (currentFavorites) {
          const updatedFavorites = currentFavorites.filter(product => product.id !== numericProductId);
          queryClient.setQueryData(["favorites", userId], updatedFavorites);
        }
      } else {
        // إزالة من الخادم مع التحديث المحلي
        const result = await favoritesManager.removeFavorite(numericProductId, userId);
        
        if (result.success) {
          // تحديث الكاش
          const currentFavorites = queryClient.getQueryData<ProductOut[]>(["favorites", userId]);
          if (currentFavorites) {
            const updatedFavorites = currentFavorites.filter(product => product.id !== numericProductId);
            queryClient.setQueryData(["favorites", userId], updatedFavorites);
          }
          
          if (result.error) {
            toast.warning(result.error);
          } else {
            toast.success("تم إزالة المنتج من المفضلة");
          }
        } else {
          toast.error(result.error || "فشل في إزالة المنتج من المفضلة");
        }
      }
      
      // إعادة جلب البيانات للتأكد من التزامن
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    } catch (error: any) {
      toast.error(`خطأ في إزالة المنتج: ${error.message}`);
    }
  };

  // دمج البيانات المحلية مع بيانات الخادم
  const allFavoriteProducts = React.useMemo(() => {
    if (!favoriteProducts) return [];
    
    // التأكد من أن جميع المنتجات المحلية موجودة في القائمة
    const serverProductIds = favoriteProducts.map(p => p.id);
    const missingLocalFavorites = localFavoriteIds.filter(id => !serverProductIds.includes(id));
    
    if (missingLocalFavorites.length > 0) {
      console.log("منتجات محلية غير موجودة في الخادم:", missingLocalFavorites);
    }
    
    return favoriteProducts;
  }, [favoriteProducts, localFavoriteIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen rtl-flex-row">
        <Header />
        <main className="flex flex-col items-center justify-center bg-background text-foreground space-y-4 py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-lg">جاري تحميل المفضلة...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen rtl-flex-row">
        <Header />
        <main className="flex flex-col items-center justify-center bg-background text-foreground space-y-4 py-20">
          <HeartOff className="text-red-500" size={60} />
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">حدث خطأ في تحميل المفضلة!</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              {error?.message || "تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => refetch()} disabled={isLoading} className="flex items-center gap-2">
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                إعادة المحاولة
              </Button>
              <Link to="/">
                <Button variant="outline">العودة إلى الصفحة الرئيسية</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayCount = Math.max(allFavoriteProducts?.length || 0, localFavoriteIds.length);

  return (
    <div className="min-h-screen rtl-flex-row">
      <Header />
      <main className="py-8">
        <section className="w-full md:max-w-[65%] mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-serif text-2xl font-medium sm:text-3xl mb-6">
              مفضلاتي ({displayCount})
            </h1>
          </div>

          {allFavoriteProducts && allFavoriteProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {allFavoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemoveFavorite={removeFromFavorites}
                  isFavorite={true}
                />
              ))}
            </div>
          ) : localFavoriteIds.length > 0 ? (
            <div className="text-center text-gray-500 mt-8 space-y-4">
              <HeartOff className="mx-auto mb-4 text-gray-400" size={80} />
              <div className="space-y-2">
                <p className="text-lg font-medium">تم حفظ {localFavoriteIds.length} منتج محلياً</p>
                <p className="text-sm text-muted-foreground">يمكنك عرض تفاصيلها عند الاتصال بالإنترنت</p>
              </div>
              <Button onClick={() => refetch()} className="mt-4">
                إعادة المحاولة
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8 space-y-4">
              <HeartOff className="mx-auto mb-4 text-gray-400" size={80} />
              <div className="space-y-2">
                <p className="text-lg font-medium">لا يوجد لديك منتجات مفضلة حاليًا</p>
                <p className="text-sm text-muted-foreground">ابدأ بإضافة منتجات إلى مفضلتك لتراها هنا</p>
              </div>
              <Link to="/">
                <Button className="mt-4">
                  تصفح المنتجات الآن
                </Button>
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;