// src/components/FavoriteButton.tsx
import React, { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";
import { useCookies } from "react-cookie";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BASE_URL } from "@/config/Config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FavoriteButtonProps {
  productId: number;
  isFavoriteProp?: boolean;
  onFavoriteChange?: (productId: number, isFavorite: boolean) => void;
}

// إنشاء معرف فريد للمتصفح إذا لم يكن موجوداً
const generateBrowserId = (): string => {
  const existingId = localStorage.getItem('browserUserId');
  if (existingId) return existingId;
  
  const newId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('browserUserId', newId);
  return newId;
};

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

// إضافة إلى المفضلات محلياً
const addToLocalFavorites = (productId: number): void => {
  const favorites = getLocalFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    saveLocalFavorites(favorites);
  }
};

// إزالة من المفضلات محلياً
const removeFromLocalFavorites = (productId: number): void => {
  const favorites = getLocalFavorites();
  const filtered = favorites.filter(id => id !== productId);
  saveLocalFavorites(filtered);
};

const addFavoriteToServer = async ({ userIdentifier, productId }: { userIdentifier: string; productId: number }) => {
  const response = await fetch(`${BASE_URL}/order-app/api/v1/favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ user_identifier: userIdentifier, product_id: productId }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`فشل في إضافة المنتج إلى المفضلة: ${errorData?.detail || response.statusText}`);
  }
  return response.json();
};

const removeFavoriteFromServer = async ({ userIdentifier, productId }: { userIdentifier: string; productId: number }) => {
  const response = await fetch(`${BASE_URL}/clear_one`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ user_identifier: userIdentifier, product_id: productId }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`فشل في إزالة المنتج من المفضلة: ${errorData?.detail || response.statusText}`);
  }
  return true;
};

export const FavoriteButton = ({ productId, isFavoriteProp, onFavoriteChange }: FavoriteButtonProps) => {
  const [cookies, setCookie] = useCookies(["userId"]);
  const queryClient = useQueryClient();
  
  // الحصول على الحالة المحلية مرة واحدة فقط
  const [localFavorites] = useState(() => getLocalFavorites());
  const isLocallyFavorite = localFavorites.includes(productId);
  
  const [isFavorite, setIsFavorite] = useState(() => {
    return isFavoriteProp ?? isLocallyFavorite;
  });
  
  // الحصول على أو إنشاء معرف المستخدم
  const [userIdentifier] = useState(() => {
    let userId = cookies.userId;
    if (!userId) {
      userId = generateBrowserId();
      // تأجيل setCookie إلى useEffect
      return userId;
    }
    return userId;
  });

  // تعيين الكوكي في useEffect لتجنب setState أثناء render
  useEffect(() => {
    if (!cookies.userId && userIdentifier) {
      setCookie("userId", userIdentifier, { 
        path: "/", 
        maxAge: 365 * 24 * 60 * 60, // سنة واحدة
        sameSite: "lax"
      });
    }
  }, [cookies.userId, userIdentifier, setCookie]);

  useEffect(() => {
    // تحديث الحالة بناءً على المفضلات المحلية أو الخاصية الممررة
    const currentLocalFavorites = getLocalFavorites();
    const isCurrentlyLocallyFavorite = currentLocalFavorites.includes(productId);
    const shouldBeFavorite = isFavoriteProp ?? isCurrentlyLocallyFavorite;
    setIsFavorite(shouldBeFavorite);
  }, [isFavoriteProp, productId]);

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteToServer,
    onMutate: () => {
      // التحديث المحلي الفوري
      setIsFavorite(true);
      addToLocalFavorites(productId);
      onFavoriteChange?.(productId, true);
    },
    onSuccess: () => {
      // تحديث الكاش
      queryClient.invalidateQueries({ queryKey: ["favorites", userIdentifier] });
      // لا نعرض toast هنا لأن التحديث تم بالفعل محلياً
    },
    onError: (error: any) => {
      // إذا فشل الطلب، نعكس التغيير المحلي
      setIsFavorite(false);
      removeFromLocalFavorites(productId);
      onFavoriteChange?.(productId, false);
      toast.error(`فشل في مزامنة المفضلة: ${error.message}`);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavoriteFromServer,
    onMutate: () => {
      // التحديث المحلي الفوري
      setIsFavorite(false);
      removeFromLocalFavorites(productId);
      onFavoriteChange?.(productId, false);
    },
    onSuccess: () => {
      // تحديث الكاش
      queryClient.invalidateQueries({ queryKey: ["favorites", userIdentifier] });
      // لا نعرض toast هنا لأن التحديث تم بالفعل محلياً
    },
    onError: (error: any) => {
      // إذا فشل الطلب، نعكس التغيير المحلي
      setIsFavorite(true);
      addToLocalFavorites(productId);
      onFavoriteChange?.(productId, true);
      toast.error(`فشل في مزامنة المفضلة: ${error.message}`);
    },
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      // إضافة إلى المفضلة
      addFavoriteMutation.mutate({ userIdentifier, productId });
    } else {
      // إزالة من المفضلة
      removeFavoriteMutation.mutate({ userIdentifier, productId });
    }
  };

  const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn(
        "absolute top-1.5 left-1.5 md:top-2 md:left-2 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-200 hover:bg-background rtl:left-auto rtl:right-1.5 md:rtl:right-2 z-10",
        isLoading && "opacity-70 cursor-not-allowed",
        isFavorite && "bg-red-50/90 hover:bg-red-100/90"
      )}
      aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      {isFavorite ? (
        <Heart className="h-3 w-3 md:h-4 md:w-4 fill-red-500 text-red-500 transition-all duration-200" />
      ) : (
        <Heart className="h-3 w-3 md:h-4 md:w-4 transition-all duration-200 text-foreground hover:text-red-400" />
      )}
    </button>
  );
};