import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from "@/config/Config";

// استيراد الأنواع والثوابت من ملف الأنواع المركزي (src/types/order.ts)
import { Order, OrderStatus, orderStatusArabic, orderStatusColors } from '../../types/order'; // تأكد من المسار النسبي الصحيح

// تعريف خصائص المكون (Props)
interface OrderDetailsProps {
  order: Order;
  onSaveSuccess?: (updatedOrder: Order) => void;
}

export default function OrderDetails({ order, onSaveSuccess }: OrderDetailsProps) {
  // تعريف حالات المكون
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<Order>(order);
  const [changedFields, setChangedFields] = useState<Partial<Record<keyof Order, boolean>>>({});

  // Effect لإعادة تعيين الحالة عند تغيير الـ prop الخاص بالطلب
  useEffect(() => {
    setFormState(order);
    setIsEditing(false);
    setChangedFields({});
  }, [order]);

  // دالة لتنسيق التاريخ
  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "تاريخ غير متوفر";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      return format(date, "d MMMM | h:mm a", {
        locale: arSA,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateStr;
    }
  };

  // دالة لتنسيق العملة
  const formatCurrency = (amount: number | string | null | undefined): string => {
    const numAmount = typeof amount === 'string' && !isNaN(parseFloat(amount)) ? parseFloat(amount) : Number(amount);

    if (isNaN(numAmount) || amount === null || amount === undefined || amount === '') {
      return "غير متوفر";
    }
    return `${numAmount.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م`;
  };

  // معالج حفظ التعديلات
  const handleSave = async () => {
    const payload: Partial<Order> = {}; // تهيئة الكائن payload

    // التحقق من كل حقل على حدة
    if (changedFields.order_id) {
        payload.order_id = formState.order_id;
    }
    if (changedFields.phone) {
        payload.phone = formState.phone;
    }
    if (changedFields.name) {
        payload.name = formState.name;
    }
    if (changedFields.address) {
        payload.address = formState.address;
    }
    if (changedFields.city) {
        payload.city = formState.city;
    }
    // created_at و updated_at عادة لا يتم تعديلهما يدوياً، ولكن إذا كانا كذلك:
    if (changedFields.created_at) {
        payload.created_at = formState.created_at;
    }
    if (changedFields.color) {
        payload.color = formState.color;
    }
    if (changedFields.size) {
        payload.size = formState.size;
    }
    if (changedFields.total_cost) {
        payload.total_cost = formState.total_cost;
    }
    if (changedFields.updated_at) { // عادة لا يتم تعديله يدوياً
        payload.updated_at = formState.updated_at;
    }
    if (changedFields.second_phone) {
        payload.second_phone = formState.second_phone;
    }
    if (changedFields.email) {
        payload.email = formState.email;
    }
    if (changedFields.state) {
        payload.state = formState.state;
    }
    if (changedFields.notes) {
        payload.notes = formState.notes;
    }
    if (changedFields.product) {
        payload.product = formState.product;
    }
    if (changedFields.image_url) {
        payload.image_url = formState.image_url;
    }
    if (changedFields.shipping) {
        payload.shipping = formState.shipping;
    }
    if (changedFields.status) {
        payload.status = formState.status;
    }
    if (changedFields.is_read) { // إذا كانت هذه الخاصية قابلة للتعديل
        payload.is_read = formState.is_read;
    }

    // بقية الكود تظل كما هي تماماً
    const hasChanges = Object.keys(payload).length > 0;

    if (!hasChanges) {
        setIsEditing(false);
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/order-app/api/v1/orders/${order.order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`فشل في حفظ الطلب: ${errorData.message || response.statusText || response.status}`);
            return;
        }

        if (onSaveSuccess) {
            onSaveSuccess(formState);
        }

        setIsEditing(false);
        setChangedFields({});

    } catch (error) {
        alert("حدث خطأ أثناء حفظ الطلب.");
    }
};

  // دالة إلغاء التعديل
  const handleCancel = () => {
    setFormState(order);
    setIsEditing(false);
    setChangedFields({});
  };

  // استخدام useCallback لتجنب إعادة إنشاء هذه الدالة مع كل عملية render
  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let newValue: string | number | null = value;

    // تحويل المدخلات الرقمية إلى أرقام
    if (type === 'number') {
      const parsedValue = parseFloat(value);
      newValue = value === '' ? null : (isNaN(parsedValue) ? 0 : parsedValue);
    } else if (value === "") {
      newValue = null;
    }

    setFormState(prev => ({ ...prev, [name]: newValue }));
    setChangedFields(prev => ({ ...prev, [name]: true }));
  }, []);

  // مكون حقل الإدخال
  const FormField = useCallback(({ name, value, type = 'text', dir, options }: {
    name: keyof Order;
    value: any;
    type?: 'text' | 'number' | 'email' | 'textarea' | 'select';
    dir?: string;
    options?: { value: string; label: string }[];
  }) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value === null ? '' : value}
            onChange={handleFieldChange}
            className="w-full mt-1 p-1 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir={dir}
            rows={name === 'address' ? 3 : (name === 'notes' ? 4 : 2)}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={value === null ? '' : value}
            onChange={handleFieldChange}
            className="w-full mt-1 p-1 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir={dir}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value === null ? '' : value}
            onChange={handleFieldChange}
            className="w-full mt-1 p-1 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir={dir}
          />
        );
    }
  }, [handleFieldChange]);

  // مكون مساعد لعرض الحقل
  const RenderField = useCallback(({ label, name, value, dir, type = 'text', options }: {
    label: string;
    name: keyof Order;
    value: string | number | null;
    dir?: string;
    type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
    options?: { value: string; label: string }[];
  }) => (
    <div className="bg-muted/50 p-2 rounded-md">
      <span className="text-muted-foreground text-sm">{label}:</span>
      {isEditing ? (
        <FormField
          name={name}
          value={value}
          type={type}
          dir={dir}
          options={options}
        />
      ) : (
        <p className={`font-medium ${dir === 'ltr' ? 'text-right' : ''}`}>
          {value === null || value === undefined || value === ''
            ? (name === 'email' || name === 'second_phone' || name === 'notes' || name === 'image_url' || name === 'address') ? "غير متوفر" : (typeof value === 'number' ? formatCurrency(value) : "N/A")
            : (typeof value === 'number' ? formatCurrency(value) : value.toString())
          }
        </p>
      )}
    </div>
  ), [isEditing, FormField, formatCurrency]); // إضافة formatCurrency إلى dependencies

  return (
    <div className="mt-6 space-y-6">
      {/* منطقة الأزرار (تعديل / حفظ / إلغاء) */}
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(changedFields).length === 0}
            >
              {/* أيقونة الحفظ */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              حفظ التعديلات
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md"
            >
              {/* أيقونة الإلغاء */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              إلغاء
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            {/* أيقونة التعديل */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
            تعديل البيانات
          </button>
        )}
      </div>

      {/* قسم بيانات العميل */}
      <div>
        <h3 className="text-lg font-medium">بيانات العميل</h3>
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <RenderField label="الاسم" name="name" value={formState.name} />
            <RenderField label="البريد الإلكتروني" name="email" value={formState.email} dir="ltr" type="email" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <RenderField label="رقم الهاتف" name="phone" value={formState.phone} dir="ltr" />
            <RenderField label="هاتف إضافي" name="second_phone" value={formState.second_phone} dir="ltr" />
          </div>
        </div>
      </div>

      {/* قسم عنوان التوصيل */}
      <div>
        <h3 className="text-lg font-medium">عنوان التوصيل</h3>
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <RenderField label="المحافظة" name="state" value={formState.state} />
            <RenderField label="المدينة" name="city" value={formState.city} />
          </div>
          <RenderField label="العنوان التفصيلي" name="address" value={formState.address} type="textarea" />
        </div>
      </div>

      {/* قسم تفاصيل المنتج */}
      <div>
        <h3 className="text-lg font-medium">تفاصيل المنتج</h3>
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <RenderField label="المنتج" name="product" value={formState.product} />
            <RenderField label="اللون" name="color" value={formState.color} />
            <RenderField label="المقاس" name="size" value={formState.size} />
          </div>
          <RenderField label="رابط الصورة" name="image_url" value={formState.image_url} type="text" />
          {!isEditing && formState.image_url && (
            <div className="bg-muted/50 p-2 rounded-md flex items-center justify-center">
              <img src={formState.image_url} alt={formState.product || 'Product Image'} className="h-32 object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* قسم التفاصيل المالية */}
      <div>
        <h3 className="text-lg font-medium">التفاصيل المالية</h3>
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-muted/50 p-2 rounded-md">
              <span className="text-muted-foreground text-sm">سعر المنتج:</span>
              {/* هنا يجب أن تستخدم formState للبيانات التي يتم تعديلها، ولكن القيمة الأصلية لسعر المنتج تعتمد على order.total_cost - order.shipping */}
              {/* يجب التأكد من أن حساب سعر المنتج يعتمد على قيمة ثابتة أو تتم إدارته بشكل منفصل إذا كان dynamic */}
              {isEditing ? (
                <p className="font-medium">{formatCurrency(Number(formState.total_cost) - Number(formState.shipping))}</p>
              ) : (
                <p className="font-medium">{formatCurrency(Number(order.total_cost) - Number(order.shipping))}</p>
              )}
            </div>
            <RenderField label="تكلفة الشحن" name="shipping" value={formState.shipping} type="number" />
          </div>
          <RenderField label="الإجمالي" name="total_cost" value={formState.total_cost} type="number" />
          {isEditing && (
            <div className="bg-primary/10 p-3 rounded-md mt-2">
              <span className="text-muted-foreground text-sm">الإجمالي المحسوب:</span>
              <p className="font-bold text-lg">{formatCurrency(formState.total_cost)}</p>
            </div>
          )}
        </div>
      </div>

      {/* قسم معلومات الطلب */}
      <div>
        <h3 className="text-lg font-medium">معلومات الطلب</h3>
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <RenderField
              label="حالة الطلب"
              name="status"
              value={formState.status}
              type="select"
              options={Object.keys(orderStatusArabic).map(key => ({
                value: key,
                label: orderStatusArabic[key as OrderStatus]
              }))}
            />
            <div className="bg-muted/50 p-2 rounded-md">
              <span className="text-muted-foreground text-sm">تاريخ الإنشاء:</span>
              <p className="font-medium">{formatDate(order.created_at)}</p>
            </div>
          </div>
          <RenderField label="ملاحظات" name="notes" value={formState.notes} type="textarea" />
        </div>
      </div>
    </div>
  );
}