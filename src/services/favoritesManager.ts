// src/utils/favoritesManager.ts

export type FavoritesListener = (favorites: number[]) => void;

class FavoritesManager {
  private static instance: FavoritesManager;
  private listeners: Set<FavoritesListener> = new Set();
  private favorites: number[] = [];

  private constructor() {
    this.loadFavorites();
    this.setupStorageListener();
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
    // الاستماع لتغييرات من التبويبات الأخرى
    window.addEventListener('storage', (event) => {
      if (event.key === 'localFavorites') {
        this.loadFavorites();
        this.notifyListeners();
      }
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
    // إرسال الحالة الحالية فوراً للمستمع الجديد
    listener([...this.favorites]);
    
    // إرجاع دالة لإزالة المستمع
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

  // إضافة منتج إلى المفضلات
  public addFavorite(productId: number): boolean {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.saveFavorites();
      return true;
    }
    return false;
  }

  // إزالة منتج من المفضلات
  public removeFavorite(productId: number): boolean {
    const initialLength = this.favorites.length;
    this.favorites = this.favorites.filter(id => id !== productId);
    
    if (this.favorites.length !== initialLength) {
      this.saveFavorites();
      return true;
    }
    return false;
  }

  // تبديل حالة المفضلة
  public toggleFavorite(productId: number): boolean {
    const isFavorite = this.isFavorite(productId);
    if (isFavorite) {
      this.removeFavorite(productId);
    } else {
      this.addFavorite(productId);
    }
    return !isFavorite;
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

  // تحديث المفضلات من مصدر خارجي (مثل الخادم)
  public updateFromServer(serverFavorites: number[]): void {
    this.favorites = [...serverFavorites];
    this.saveFavorites();
  }

  // دمج المفضلات المحلية مع مفضلات الخادم
  public mergeWithServer(serverFavorites: number[]): void {
    const mergedFavorites = [...new Set([...this.favorites, ...serverFavorites])];
    this.favorites = mergedFavorites;
    this.saveFavorites();
  }
}

// تصدير الـ instance الوحيد
export const favoritesManager = FavoritesManager.getInstance();