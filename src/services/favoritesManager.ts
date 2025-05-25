// src/services/favoritesManager.ts

import { BASE_URL } from "@/config/Config";
import { ProductOut } from "@/types/product";

export type FavoritesListener = (favorites: number[]) => void;

interface FavoriteOperationResult {
  success: boolean;
  error?: string;
}

class FavoritesManager {
  private static instance: FavoritesManager;
  private listeners: Set<FavoritesListener> = new Set();
  private favorites: number[] = [];
  private isOnline: boolean = navigator.onLine;

  private constructor() {
    this.loadFavorites();
    this.setupStorageListener();
    this.setupOnlineListener();
  }

  public static getInstance(): FavoritesManager {
    if (!FavoritesManager.instance) {
      FavoritesManager.instance = new FavoritesManager();
    }
    return FavoritesManager.instance;
  }

  private loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem('localFavorites');
      this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      this.favorites = [];
    }
  }

  private saveFavorites(): void {
    try {
      localStorage.setItem('localFavorites', JSON.stringify(this.favorites));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  private setupStorageListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'localFavorites') {
        this.loadFavorites();
        this.notifyListeners();
      }
    });
  }

  private setupOnlineListener(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener([...this.favorites]);
      } catch (error) {
        console.error('Error notifying favorites listener:', error);
      }
    });
  }

  // إضافة مستمع للتغييرات
  public addListener(listener: FavoritesListener): () => void {
    this.listeners.add(listener);
    listener([...this.favorites]);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  // الحصول على المفضلات الحالية
  public getFavorites(): number[] {
    return [...this.favorites];
  }

  // التحقق من وجود منتج في المفضلات
  public isFavorite(productId: number): boolean {
    return this.favorites.includes(productId);
  }

  // الحصول على عدد المفضلات
  public getCount(): number {
    return this.favorites.length;
  }

  // مسح جميع المفضلات
  public clearAll(): void {
    this.favorites = [];
    this.saveFavorites();
  }

  // جلب المفضلات من الخادم
  public async fetchFavoritesFromServer(userId: string): Promise<ProductOut[]> {
    if (!userId) {
      throw new Error("يجب توفير معرف المستخدم");
    }

    try {
      const response = await fetch(`${BASE_URL}/order-app/api/v1/favorites/${userId}`, {
        headers: {
          accept: "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const products: ProductOut[] = await response.json();
      
      // تحديث المفضلات المحلية بناءً على استجابة الخادم
      const serverFavoriteIds = products.map(product => product.id);
      
      if (serverFavoriteIds.length === 0) {
        // إذا كانت المفضلات فارغة في الخادم، فرّغ المحلية أيضاً
        console.log("الخادم يقول أن المفضلات فارغة، جاري تفريغ المفضلات المحلية");
        this.favorites = [];
        this.saveFavorites();
      } else {
        // دمج مع المفضلات المحلية (الاحتفاظ بالمفضلات المحلية + إضافة الخادم)
        this.mergeWithServer(serverFavoriteIds);
      }
      
      return products;
    } catch (error) {
      console.warn("فشل في جلب المفضلات من الخادم، جاري استخدام البيانات المحلية");
      throw error;
    }
  }

  // إضافة منتج إلى المفضلات مع المزامنة
  public async addFavorite(productId: number, userIdentifier: string): Promise<FavoriteOperationResult> {
    // التحديث المحلي الفوري
    const wasAdded = this.addFavoriteLocally(productId);
    
    if (!wasAdded) {
      return { success: true }; // المنتج موجود بالفعل
    }

    // محاولة المزامنة مع الخادم إذا كان متاحاً
    if (this.isOnline) {
      try {
        await this.addFavoriteToServer(userIdentifier, productId);
        return { success: true };
      } catch (error: any) {
        console.error("فشل في إضافة المنتج إلى الخادم:", error);
        // الاحتفاظ بالتحديث المحلي حتى لو فشلت المزامنة
        return { 
          success: true, 
          error: `تم الحفظ محلياً فقط: ${error.message}` 
        };
      }
    }

    return { 
      success: true, 
      error: "تم الحفظ محلياً (غير متصل بالإنترنت)" 
    };
  }

  // إزالة منتج من المفضلات مع المزامنة
  public async removeFavorite(productId: number, userIdentifier: string): Promise<FavoriteOperationResult> {
    // التحديث المحلي الفوري
    const wasRemoved = this.removeFavoriteLocally(productId);
    
    if (!wasRemoved) {
      return { success: true }; // المنتج غير موجود أصلاً
    }

    // محاولة المزامنة مع الخادم إذا كان متاحاً
    if (this.isOnline) {
      try {
        await this.removeFavoriteFromServer(userIdentifier, productId);
        return { success: true };
      } catch (error: any) {
        console.error("فشل في إزالة المنتج من الخادم:", error);
        // إعادة إضافة المنتج محلياً في حالة فشل الإزالة من الخادم
        this.addFavoriteLocally(productId);
        return { 
          success: false, 
          error: `فشل في الإزالة من الخادم: ${error.message}` 
        };
      }
    }

    return { 
      success: true, 
      error: "تم الحذف محلياً (غير متصل بالإنترنت)" 
    };
  }

  // تبديل حالة المفضلة مع المزامنة
  public async toggleFavorite(productId: number, userIdentifier: string): Promise<FavoriteOperationResult> {
    const isFavorite = this.isFavorite(productId);
    
    if (isFavorite) {
      return await this.removeFavorite(productId, userIdentifier);
    } else {
      return await this.addFavorite(productId, userIdentifier);
    }
  }

  // العمليات المحلية (بدون مزامنة)
  private addFavoriteLocally(productId: number): boolean {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.saveFavorites();
      return true;
    }
    return false;
  }

  private removeFavoriteLocally(productId: number): boolean {
    const initialLength = this.favorites.length;
    this.favorites = this.favorites.filter(id => id !== productId);
    
    if (this.favorites.length !== initialLength) {
      this.saveFavorites();
      return true;
    }
    return false;
  }

  // طرق الخادم
  private async addFavoriteToServer(userIdentifier: string, productId: number): Promise<any> {
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
  }

  private async removeFavoriteFromServer(userIdentifier: string, productId: number): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/order-app/api/v1/favorites/clear_one`, {
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
  }

  // دمج المفضلات المحلية مع مفضلات الخادم
  public mergeWithServer(serverFavorites: number[]): void {
    // إذا كان الخادم فارغاً، احتفظ بالمفضلات المحلية كما هي
    if (serverFavorites.length === 0) {
      return;
    }
    
    const mergedFavorites = [...new Set([...this.favorites, ...serverFavorites])];
    this.favorites = mergedFavorites;
    this.saveFavorites();
  }

  // تحديث المفضلات من مصدر خارجي (استبدال كامل)
  public updateFromServer(serverFavorites: number[]): void {
    this.favorites = [...serverFavorites];
    this.saveFavorites();
  }

  // طرق للتوافق مع الكود القديم (deprecated - يُفضل استخدام الطرق الجديدة)
  public addFavoriteSync(productId: number): boolean {
    return this.addFavoriteLocally(productId);
  }

  public removeFavoriteSync(productId: number): boolean {
    return this.removeFavoriteLocally(productId);
  }
}

// تصدير الـ instance الوحيد
export const favoritesManager = FavoritesManager.getInstance();