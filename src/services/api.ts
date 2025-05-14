// src/services/api.ts
// هذا الملف يحتوي على دوال لاستدعاء نقاط نهاية الواجهة الخلفية لمختلف الخدمات (الطلبات، المراجعات، المخزون).
// تم تعديله ليتوافق مع مكون UserReviews.tsx في نسخته التي تستدعي api.getAllReviews.

import axios from "axios";
import { Order, OrderStatus } from "@/types/order"; // تأكد من وجود هذا الملف ومساره الصحيح
import { BackendReview } from "@/types/review"; // استيراد واجهة BackendReview
import { BASE_URL } from "@/config/Config"; // تأكد من وجود هذا الملف ومساره الصحيح

// استيراد النوع المطلوب للمخزون من types/product
import { FrontendProductInventory } from "@/types/product";


// تعريف نوع داخلي لبيانات عنصر المخزون كما يأتي من الواجهة الخلفية
// يستخدم داخل هذا الملف لتمثيل بنية بيانات المخزون من الـ API قبل تحويلها
type InventoryItemFromBackend = {
  product_id: number;
  color: string;
  size: string;
  quantity: number;
  product_inventory_id: number; // المعرف الفريد لكل بند مخزون في الباك إند
  // أضف أي حقول أخرى تأتي من الباك إند هنا إذا كانت ضرورية لعمليات API
};


// تهيئة عميل Axios مع الـ BASE_URL والرؤوس الأساسية
const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // يمكنك إضافة أي رؤوس إضافية هنا، مثل التوكنز الخاصة بالمصادقة (Auth Tokens) إذا كان التطبيق يتطلب ذلك
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
});

// دالة مساعدة لتحويل بيانات المخزون الخام من الـ API إلى الشكل المطلوب للواجهة الأمامية
// تتضمن استخلاص الكميات ومعرفات بنود المخزون
const transformInventoryData = (
  data: InventoryItemFromBackend[] // استخدام النوع الداخلي هنا كمدخل
): { inventory: FrontendProductInventory; inventoryIds: Record<string, Record<string, number>> } => {
  const inventory: FrontendProductInventory = {};
  const inventoryIds: Record<string, Record<string, number>> = {}; // كائن لتخزين المعرفات

  data.forEach((item) => {
    if (!inventory[item.color]) {
      inventory[item.color] = {};
      inventoryIds[item.color] = {}; // إنشاء الكائن للون في المعرفات أيضاً
    }
    // تخزين الكمية لكل تركيبة لون ومقاس
    inventory[item.color][item.size] = item.quantity;
    // تخزين المعرف الفريد لكل تركيبة لون ومقاس
    inventoryIds[item.color][item.size] = item.product_inventory_id;
  });
  // إرجاع كائن يحتوي على بيانات المخزون المنظمة والمعرفات
  return { inventory, inventoryIds };
};


// كائن التصدير الرئيسي الذي يحتوي على جميع دوال API المتاحة للواجهة الأمامية
export const api = {
  // --- دوال إدارة الطلبات (Order CRUD) ---
  /**
   * يجلب جميع الطلبات من الواجهة الخلفية.
   * @returns Promise<Order[]> قائمة بالطلبات.
   */
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiService.get<Order[]>(
        "/order-app/api/v1/orders/" // مسار نقطة نهاية جلب جميع الطلبات
      );
      return response.data;
    } catch (error) {
      console.error("فشل في جلب الطلبات:", error);
      throw error; // رمي الخطأ للسماح للمكونات بالتعامل معه
    }
  },
  /**
   * يجلب طلبًا واحدًا بواسطة معرفه الفريد.
   * @param id معرف الطلب.
   * @returns Promise<Order | null> الطلب أو null إذا لم يتم العثور عليه.
   */
  getOrderById: async (id: number): Promise<Order | null> => {
    try {
      const response = await apiService.get<Order>(
        `/order-app/api/v1/orders/${id}/` // مسار نقطة نهاية جلب طلب واحد بواسطة المعرف
      );
      return response.data;
    } catch (error) {
      console.error(`فشل في جلب الطلب رقم ${id}:`, error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null; // إرجاع null لـ 404 (غير موجود)
      }
      throw error; // رمي الأخطاء الأخرى
    }
  },
  /**
   * ينشئ طلبًا جديدًا في الواجهة الخلفية.
   * @param orderData بيانات الطلب الجديد.
   * @returns Promise<Order> الطلب الذي تم إنشاؤه.
   */
  createOrder: async (
    // نستخدم Omit لاستبعاد الحقول التي يتم إنشاؤها في الباك إند
    orderData: Omit<Order, "order_id" | "created_at" | "updated_at" | "is_read">
  ): Promise<Order> => {
    try {
      // تأكد من أن المسار صحيح لنقطة نهاية إنشاء الطلب في الباك إند لديك
      const response = await apiService.post<Order>(
        `/order-app/api/v1/create-order/?to_email=mo3geza380@gmail.com`, // أو المسار الفعلي إذا كان مختلفاً
        orderData // بيانات الطلب المرسلة في جسم الطلب
      );
      return response.data;
    } catch (error) {
      console.error("فشل في إنشاء الطلب:", error);
      throw error;
    }
  },
  /**
   * يحدث بيانات طلب موجود.
   * @param id معرف الطلب.
   * @param orderData البيانات المراد تحديثها.
   * @returns Promise<Order | null> الطلب المحدث أو null إذا لم يتم العثور عليه.
   */
  updateOrder: async (
    id: number,
    orderData: Partial<Order> // نستخدم Partial للسماح بتحديث حقول جزئية
  ): Promise<Order | null> => {
    try {
      const response = await apiService.put<Order>(
        `/order-app/api/v1/orders/${id}/`, // مسار نقطة نهاية تحديث الطلب
        orderData // البيانات المحدثة المرسلة
      );
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
   * يحذف طلبًا من الواجهة الخلفية.
   * @param id معرف الطلب.
   * @returns Promise<boolean> true إذا تم الحذف بنجاح، false بخلاف ذلك (يشمل عدم العثور).
   */
  deleteOrder: async (id: number): Promise<boolean> => {
    try {
      const response = await apiService.delete(`/order-app/api/v1/orders/${id}/`); // مسار نقطة نهاية حذف الطلب
      // تحقق من الحالة لتأكيد النجاح (عادة 200 أو 204 للحذف الناجح)
      return response.status === 200 || response.status === 204;
    } catch (error) {
      console.error(`فشل في حذف الطلب رقم ${id}:`, error);
      // يمكن التعامل مع أخطاء معينة مثل 404 هنا إذا أردت إرجاع true لـ "تم التأكد من عدم وجوده"
      return false; // في حالة أي خطأ، نعتبر الحذف غير ناجح
    }
  },
  /**
   * يقوم بتعليم طلب معين كـ "مقروء" في الواجهة الخلفية.
   * @param orderId معرف الطلب.
   * @returns Promise<Order | null> يعيد الطلب المحدث أو null إذا لم يتم العثور عليه.
   */
  markOrderAsRead: async (orderId: number): Promise<Order | null> => {
    try {
      // استخدام نقطة نهاية مخصصة لتعليم الطلب كمقروء أو تحديث حقل الحالة مباشرة
      const response = await apiService.put<Order>(
        `/order-app/api/v1/orders/${orderId}/read` // مسار نقطة نهاية تعليم كمقروء
      );
      return response.data;
    } catch (error) {
      console.error(`فشل في تعليم الطلب رقم ${orderId} كمقروء:`, error);
      // التعامل مع 404 إذا كان الطلب غير موجود
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error; // رمي الأخطاء الأخرى
    }
  },

  // --- دوال إدارة المراجعات (Review CRUD) ---
  /**
   * يجلب جميع المراجعات للمنتج ذو المعرّف الثابت 1 من الواجهة الخلفية.
   * تم تعديل المسار ليناسب مكون UserReviews.tsx غير المعدّل الذي يستدعي هذه الدالة.
   * @returns Promise<BackendReview[]> قائمة بالمراجعات للمنتج 1.
   */
  getAllReviews: async (): Promise<BackendReview[]> => {
    try {
      // تعديل المسار ليجلب مراجعات المنتج ذو المعرف 1 بشكل ثابت
      const response = await apiService.get<BackendReview[]>(
        `/order-app/api/v1/reviews/products/?product_id=${1}` // <-- المسار الذي يجلب مراجعات المنتج 1
      );
      return response.data;
    } catch (error) {
      console.error("فشل في جلب المراجعات:", error);
      throw error;
    }
  },

    /**
     * **ملاحظة:** هذه الدالة getReviewsByProductId ليست ضرورية لنسخة UserReviews.tsx غير المعدلة.
     * هي موجودة هنا فقط لأنها كانت جزءاً من النقاشات السابقة حول المرونة.
     * يمكنك حذفها إذا كنت تخطط فقط لاستخدام getAllReviews المعدلة للأغراض الثابتة.
     */
    getReviewsByProductId: async (productId: number): Promise<BackendReview[]> => {
        try {
            const response = await apiService.get<BackendReview[]>(
                `/order-app/api/v1/reviews/products/?product_id=${productId}`
            );
            return response.data;
        } catch (error) {
            console.error(`فشل في جلب المراجعات للمنتج رقم ${productId}:`, error);
            throw error;
        }
    },


  /**
   * ينشئ مراجعة جديدة في الواجهة الخلفية.
   * @param reviewData بيانات المراجعة الجديدة (تتضمن reviewer_name, rate, comment, product_id).
   * @returns Promise<BackendReview> المراجعة التي تم إنشاؤها.
   */
  createReview: async (reviewData: {
    reviewer_name: string;
    rate: number;
    comment: string;
    product_id: number; // يجب أن تتضمن بيانات الإرسال معرف المنتج بناءً على استخدامها في الواجهة الأمامية و Backend Schema
  }): Promise<BackendReview> => {
    try {
      // تأكد من أن المسار صحيح لنقطة نهاية إنشاء المراجعة في الباك إند لديك
      const response = await apiService.post<BackendReview>(
        "/order-app/api/v1/reviews/", // مسار نقطة نهاية إنشاء المراجعة
        reviewData // بيانات المراجعة المرسلة (يجب أن تتضمن product_id عند الإرسال من المكون)
      );
      return response.data;
    } catch (error) {
      console.error("فشل في إنشاء المراجعة:", error);
      throw error;
    }
  },

  // --- دوال إدارة المخزون (Inventory) ---
  /**
   * يجلب المخزون لمنتج معين بناءً على معرفه.
   * يستدعي نقطة نهاية الباك إند التي تعيد قائمة ببندود المخزون لهذا المنتج.
   * @param productId معرف المنتج.
   * @returns Promise<{ inventory: FrontendProductInventory; inventoryIds: Record<string, Record<string, number>> }>
   */
  getInventoryByProductId: async (
    productId: number
  ): Promise<{ inventory: FrontendProductInventory; inventoryIds: Record<string, Record<string, number>> }> => {
    try {
      const response = await apiService.get<InventoryItemFromBackend[]>( // توقع قائمة ببندود المخزون
        `/order-app/api/v1/inventory/products/${productId}/` // مسار نقطة نهاية جلب مخزون المنتج
      );
      // تحويل البيانات الخام المستلمة إلى الشكل المطلوب للواجهة الأمامية (يشمل الكميات والمعرفات)
      return transformInventoryData(response.data);
    } catch (error) {
      console.error(`فشل في جلب المخزون للمنتج رقم ${productId}:`, error);
      throw error; // رمي الخطأ للسماح للمكونات بالتعامل معه
    }
  },

  /**
   * يحدث كمية عنصر مخزون معين في الواجهة الخلفية بإنقاص كمية مطلوبة منه.
   * تستدعي نقطة نهاية الباك إند PATCH /order-app/api/v1/inventory/{item_id} التي تستقبل ordered_quantity في الجسم.
   * @param productInventoryId معرف عنصر المخزون المحدد (اللون والمقاس).
   * @param orderedQuantity الكمية المطلوبة في الطلب لإنقاصها من المخزون.
   * @returns Promise<InventoryItemFromBackend> (ترجع بيانات بند المخزون المحدث حسب backend code المقدم)
   */
  updateInventoryItemQuantity: async (
    productInventoryId: number, // معرف البند المحدد في الباك إند
    orderedQuantity: number // الكمية المطلوب خصمها
  ): Promise<InventoryItemFromBackend> => { // توقع بيانات البند المحدث كاستجابة
    try {
      // استخدام PATCH على المسار الذي يحتوي على معرف البند
      // وإرسال ordered_quantity في جسم الطلب كما تتوقعه دالة الباك إند المقدمة
      const response = await apiService.patch<InventoryItemFromBackend>(
        `/order-app/api/v1/inventory/${productInventoryId}/`, // مسار نقطة نهاية تحديث بند المخزون بمعرفه
        { ordered_quantity: orderedQuantity } // إرسال الكمية المطلوبة للخصم
      );
      return response.data; // إرجاع البيانات المحدثة من الباك إند
    } catch (error) {
      console.error(`فشل في تحديث المخزون للعنصر رقم ${productInventoryId}:`, error);
      throw error; // رمي الخطأ للتعامل معه في الواجهة الأمامية
    }
  },
};