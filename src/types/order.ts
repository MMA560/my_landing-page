// src/types/order.ts

// تعريف موحد لحالات الطلب
export type OrderStatus = "pending" | "confirmed" | "delivering" | "delivered" | "canceled";

// الترجمات العربية لحالات الطلب
export const orderStatusArabic: Record<OrderStatus, string> = {
  "pending": "قيد الانتظار",
  "confirmed": "تم التأكيد",
  "delivering": "قيد التسليم",
  "delivered": "تم التسليم",
  "canceled": "ملغي",
};

// ألوان حالات الطلب (تمت إضافة دعم الوضع الداكن dark mode)
export const orderStatusColors: Record<OrderStatus, string> = {
  "pending": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "confirmed": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "delivering": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  "delivered": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "canceled": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// تعريف نموذج الطلب (المعدل)
export interface Order {
  order_id: number;
  phone: string;
  name: string;
  address: string;
  city: string;
  created_at: string;
  color: string | null;
  size: string | null;
  total_cost: number;
  updated_at: string;
  second_phone: string | null;
  email: string | null;
  state: string;
  notes: string | null;
  product: string;
  image_url: string | null;
  shipping: number | null;
  status: OrderStatus;
  is_read: boolean;
  quantity: number; // <--- الحقل المطلوب مضاف هنا
}