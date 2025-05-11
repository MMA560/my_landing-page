// src/services/api.ts
import axios from "axios";
import { Order, OrderStatus } from "@/types/order"; // تأكد من وجود هذا الملف ومساره الصحيح
import { BackendReview } from "@/types/review"; // استيراد واجهة BackendReview الجديدة
import { BASE_URL } from "@/config/Config"; // تأكد من وجود هذا الملف ومساره الصحيح

// تهيئة عميل Axios مع الـ BASE_URL
const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // يمكنك إضافة أي رؤوس إضافية هنا، مثل التوكنز الخاصة بالمصادقة (Auth Tokens)
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
});

export const api = {
  /**
   * يجلب جميع الطلبات من الواجهة الخلفية.
   * @returns Promise<Order[]>
   */
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiService.get<Order[]>("/order-app/api/v1/orders/");
      return response.data;
    } catch (error) {
      console.error("فشل في جلب الطلبات:", error);
      throw error;
    }
  },
  /**
   * يجلب طلبًا واحدًا بواسطة معرفه.
   * @param id معرف الطلب.
   * @returns Promise<Order | null>
   */
  getOrderById: async (id: number): Promise<Order | null> => {
    try {
      const response = await apiService.get<Order>(`/order-app/api/v1/orders/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`فشل في جلب الطلب رقم ${id}:`, error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  /**
   * ينشئ طلبًا جديدًا.
   * @param orderData بيانات الطلب الجديد.
   * @returns Promise<Order>
   */
  createOrder: async (
    orderData: Omit<Order, "order_id" | "created_at" | "updated_at" | "is_read">
  ): Promise<Order> => {
    try {
      const response = await apiService.post<Order>("/order-app/api/v1/orders/", orderData);
      return response.data;
    } catch (error) {
      console.error("فشل في إنشاء الطلب:", error);
      throw error;
    }
  },
  /**
   * يحدث طلبًا موجودًا.
   * @param id معرف الطلب.
   * @param orderData البيانات المراد تحديثها.
   * @returns Promise<Order | null>
   */
  updateOrder: async (id: number, orderData: Partial<Order>): Promise<Order | null> => {
    try {
      const response = await apiService.put<Order>(`/order-app/api/v1/orders/${id}/`, orderData);
      return response.data;
    } catch (error) {
      console.error(`فشل في تحديث الطلب رقم ${id}:`, error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  /**
   * يحذف طلبًا.
   * @param id معرف الطلب.
   * @returns Promise<boolean> true إذا تم الحذف بنجاح، false بخلاف ذلك.
   */
  deleteOrder: async (id: number): Promise<boolean> => {
    try {
      await apiService.delete(`/order-app/api/v1/orders/${id}/`);
      return true;
    } catch (error) {
      console.error(`فشل في حذف الطلب رقم ${id}:`, error);
      return false;
    }
  },
  /**
   * تعليم طلب كمقروء.
   * @param orderId معرف الطلب.
   * @returns Promise<Order | null> يعيد الطلب المحدث.
   */
  markOrderAsRead: async (orderId: number): Promise<Order | null> => {
    try {
      // استخدام نقطة نهاية مخصصة لتعليم الطلب كمقروء أو تحديث الحالة مباشرة
      const response = await apiService.put<Order>(`/order-app/api/v1/orders/${orderId}/read`);
      return response.data;
    } catch (error) {
      console.error(`فشل في تعليم الطلب رقم ${orderId} كمقروء:`, error);
      throw error;
    }
  },

  // --- دوال API الجديدة للمراجعات ---
  /**
   * يجلب جميع المراجعات من الواجهة الخلفية.
   * @returns Promise<BackendReview[]>
   */
  getAllReviews: async (): Promise<BackendReview[]> => {
    try {
      const response = await apiService.get<BackendReview[]>("/order-app/api/v1/reviews/");
      return response.data;
    } catch (error) {
      console.error("فشل في جلب المراجعات:", error);
      throw error;
    }
  },

  /**
   * ينشئ مراجعة جديدة.
   * @param reviewData بيانات المراجعة الجديدة.
   * @returns Promise<BackendReview>
   */
  createReview: async (reviewData: { reviewer_name: string; rate: number; comment: string }): Promise<BackendReview> => {
    try {
      const response = await apiService.post<BackendReview>("/order-app/api/v1/reviews/", reviewData);
      return response.data;
    } catch (error) {
      console.error("فشل في إنشاء المراجعة:", error);
      throw error;
    }
  },
  // --- نهاية دوال API المراجعات ---
};