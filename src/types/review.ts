// src/types/review.ts

// واجهة البيانات كما ترد من الواجهة الخلفية (Backend)
export interface BackendReview {
  review_id: number;
  reviewer_name: string;
  rate: number;
  comment: string;
  created_at: string; // مثال: "2025-05-11T02:14:17.059002"
  product_id : number
}

// واجهة البيانات كما يتم استخدامها وعرضها في الواجهة الأمامية (Frontend)
export interface UserReview {
  id: number; // يتطابق مع review_id من الخلفية
  name: string; // يتطابق مع reviewer_name من الخلفية
  date: string; // يتم تحويل created_at إلى هذا التنسيق
  rating: number; // يتطابق مع rate من الخلفية
  comment: string;
  product_id : number
}