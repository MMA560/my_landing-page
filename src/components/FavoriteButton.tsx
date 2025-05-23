import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useCookies } from "react-cookie";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BASE_URL } from "@/config/Config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesManager } from "@/services/favoritesManager";

interface FavoriteButtonProps {
  productId: number;
  isFavoriteProp?: boolean;
  onFavoriteChange?: (productId: number, isFavorite: boolean) => void;
}

const generateBrowserId = (): string => {
  const existingId = localStorage.getItem('browserUserId');
  if (existingId) return existingId;
  const newId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('browserUserId', newId);
  return newId;
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

  // استخدام حالة محلية مع التحديث من المدير
  const [isFavorite, setIsFavorite] = useState(() => {
    return isFavoriteProp ?? favoritesManager.isFavorite(productId);
  });

  const [userIdentifier] = useState(() => {
    let userId = cookies.userId;
    if (!userId) {
      userId = generateBrowserId();
    }
    return userId;
  });

  useEffect(() => {
    if (!cookies.userId && userIdentifier) {
      setCookie("userId", userIdentifier, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
        sameSite: "lax"
      });
    }
  }, [cookies.userId, userIdentifier, setCookie]);

  // الاستماع لتغييرات المفضلات من المدير
  useEffect(() => {
    const unsubscribe = favoritesManager.addListener((favorites) => {
      const isCurrentlyFavorite = favorites.includes(productId);
      setIsFavorite(isCurrentlyFavorite);
    });

    return unsubscribe;
  }, [productId]);

  // تحديث الحالة عند تغيير isFavoriteProp
  useEffect(() => {
    if (isFavoriteProp !== undefined) {
      setIsFavorite(isFavoriteProp);
    }
  }, [isFavoriteProp]);

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteToServer,
    onMutate: () => {
      // التحديث المحلي الفوري
      favoritesManager.addFavorite(productId);
      onFavoriteChange?.(productId, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userIdentifier] });
    },
    onError: (error: any) => {
      // إزالة التحديث المحلي في حالة الخطأ
      favoritesManager.removeFavorite(productId);
      onFavoriteChange?.(productId, false);
      toast.error(`فشل في مزامنة المفضلة: ${error.message}`);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavoriteFromServer,
    onMutate: () => {
      // التحديث المحلي الفوري
      favoritesManager.removeFavorite(productId);
      onFavoriteChange?.(productId, false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userIdentifier] });
    },
    onError: (error: any) => {
      // إعادة إضافة التحديث المحلي في حالة الخطأ
      favoritesManager.addFavorite(productId);
      onFavoriteChange?.(productId, true);
      toast.error(`فشل في مزامنة المفضلة: ${error.message}`);
    },
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      addFavoriteMutation.mutate({ userIdentifier, productId });
    } else {
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
      <Heart
        className={cn(
          "h-3 w-3 md:h-4 md:w-4 transition-all duration-200",
          isFavorite ? "fill-red-500 text-red-500" : "text-foreground hover:text-red-400"
        )}
      />
    </button>
  );
};