import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCookies } from "react-cookie";
import { ProductOut } from "@/types/product";
import { BASE_URL } from "@/config/Config";
import { HeartOff, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// الحصول على المفضلات المحلية
const getLocalFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem('localFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

// حفظ المفضلات محلياً
const saveLocalFavorites = (favorites: number[]): void => {
  localStorage.setItem('localFavorites', JSON.stringify(favorites));
};

// إزالة من المفضلات محلياً
const removeFromLocalFavorites = (productId: number): void => {
  const favorites = getLocalFavorites();
  const filtered = favorites.filter(id => id !== productId);
  saveLocalFavorites(filtered);
};

const fetchFavoriteProducts = async (userId: string | undefined): Promise<ProductOut[]> => {
  if (!userId) return [];
  
  try {
    const response = await fetch(`${BASE_URL}/order-app/api/v1/favorites/${userId}`, {
      headers: {
        accept: "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // في حالة فشل الشبكة، نعرض المفضلات المحلية
    console.warn("فشل في جلب المفضلات من الخادم، جاري استخدام البيانات المحلية");
    throw error;
  }
};

const removeFavoriteFromServer = async ({ userId, productId }: { userId: string | undefined; productId: number }) => {
  if (!userId) throw new Error("يجب تسجيل الدخول للإزالة من المفضلة.");
  
  const response = await fetch(`${BASE_URL}/clear_one`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ user_identifier: userId, product_id: productId }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`فشل في إزالة المنتج من المفضلة: ${errorData?.detail || response.statusText}`);
  }
  return true;
};

const FavoritesPage = () => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const queryClient = useQueryClient();
  const [localFavoriteIds, setLocalFavoriteIds] = useState<number[]>([]);

  // جلب المفضلات المحلية عند تحميل الصفحة
  useEffect(() => {
    const localFavs = getLocalFavorites();
    setLocalFavoriteIds(localFavs);
  }, []);

  const {
    data: favoriteProducts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavoriteProducts(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 دقائق
    retry: 1,
  });

  const { mutate: removeFavoriteMutation, isPending: isRemoving } = useMutation({
    mutationFn: removeFavoriteFromServer,
    onMutate: async ({ productId }) => {
      // إلغاء أي استعلامات جارية
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      // الحصول على البيانات الحالية
      const previousFavorites = queryClient.getQueryData<ProductOut[]>(["favorites", userId]);

      // التحديث المحلي الفوري
      removeFromLocalFavorites(productId);
      setLocalFavoriteIds(prev => prev.filter(id => id !== productId));

      // تحديث الكاش محلياً
      if (previousFavorites) {
        const updatedFavorites = previousFavorites.filter(product => product.id !== productId);
        queryClient.setQueryData(["favorites", userId], updatedFavorites);
      }

      return { previousFavorites };
    },
    onError: (error: any, { productId }, context) => {
      // في حالة الخطأ، استرجاع الحالة السابقة
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites", userId], context.previousFavorites);
      }
      
      // إعادة إضافة المنتج محلياً
      const currentLocalFavs = getLocalFavorites();
      if (!currentLocalFavs.includes(productId)) {
        currentLocalFavs.push(productId);
        saveLocalFavorites(currentLocalFavs);
        setLocalFavoriteIds(currentLocalFavs);
      }

      toast.error(`فشل في إزالة المنتج: ${error.message}`);
    },
    onSettled: () => {
      // إعادة جلب البيانات للتأكد من التزامن
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const removeFromFavorites = (productId: string, isLocallyRemoved?: boolean) => {
    const numericProductId = parseInt(productId);
    
    if (isLocallyRemoved) {
      // إذا تم الحذف محلياً بالفعل، فقط نحديث الحالة المحلية
      removeFromLocalFavorites(numericProductId);
      setLocalFavoriteIds(prev => prev.filter(id => id !== numericProductId));
      
      // تحديث الكاش
      const currentFavorites = queryClient.getQueryData<ProductOut[]>(["favorites", userId]);
      if (currentFavorites) {
        const updatedFavorites = currentFavorites.filter(product => product.id !== numericProductId);
        queryClient.setQueryData(["favorites", userId], updatedFavorites);
      }
    } else {
      // إزالة من الخادم مع التحديث المحلي
      removeFavoriteMutation({ userId, productId: numericProductId });
    }
  };

  // دمج البيانات المحلية مع بيانات الخادم
  const allFavoriteProducts = React.useMemo(() => {
    if (!favoriteProducts) return [];
    
    // التأكد من أن جميع المنتجات المحلية موجودة في القائمة
    const serverProductIds = favoriteProducts.map(p => p.id);
    const missingLocalFavorites = localFavoriteIds.filter(id => !serverProductIds.includes(id));
    
    if (missingLocalFavorites.length > 0) {
      // هنا يمكنك إضافة منطق لجلب تفاصيل المنتجات المفقودة إذا لزم الأمر
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

  return (
    <div className="min-h-screen rtl-flex-row">
      <Header />
      <main className="py-8">
        <section className="w-full md:max-w-[65%] mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-serif text-2xl font-medium sm:text-3xl mb-6">
              مفضلاتي ({allFavoriteProducts?.length || 0})
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