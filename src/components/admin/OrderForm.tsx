
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Order, OrderStatus, orderStatusArabic } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  order: Order | null;
  onSuccess: () => void;
}

const formSchema = z.object({
  customerName: z.string().min(3, {
    message: "اسم العميل يجب أن يكون 3 أحرف على الأقل",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح",
  }),
  phone: z.string().min(11, {
    message: "رقم الهاتف يجب أن يكون 11 رقم على الأقل",
  }),
  secondaryPhone: z.string().optional(),
  address: z.string().min(5, {
    message: "العنوان يجب أن يكون 5 أحرف على الأقل",
  }),
  governorate: z.string().min(2, {
    message: "يرجى اختيار المحافظة",
  }),
  city: z.string().min(2, {
    message: "يرجى اختيار المدينة",
  }),
  product: z.string().min(2, {
    message: "يرجى اختيار المنتج",
  }),
  color: z.string().min(1, {
    message: "يرجى اختيار اللون",
  }),
  image: z.string().min(1, {
    message: "يرجى اختيار صورة",
  }),
  size: z.string().min(1, {
    message: "يرجى اختيار المقاس",
  }),
  cost: z.coerce.number().min(1, {
    message: "السعر يجب أن يكون أكبر من 0",
  }),
  shipping: z.coerce.number().min(0, {
    message: "تكلفة الشحن يجب أن تكون 0 أو أكبر",
  }),
  notes: z.string().optional(),
  status: z.enum(["pending", "delivering", "delivered"]),
});

export default function OrderForm({ order, onSuccess }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: order ? {
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      secondaryPhone: order.secondaryPhone || "",
      address: order.address,
      governorate: order.governorate,
      city: order.city,
      product: order.product,
      color: order.color,
      image: order.image,
      size: order.size,
      cost: order.cost,
      shipping: order.shipping,
      notes: order.notes,
      status: order.status,
    } : {
      customerName: "",
      email: "",
      phone: "",
      secondaryPhone: "",
      address: "",
      governorate: "",
      city: "",
      product: "",
      color: "",
      image: "/placeholder.svg",
      size: "",
      cost: 0,
      shipping: 0,
      notes: "",
      status: "pending" as OrderStatus,
    },
  });
  
  // Create order mutation - Fix the type issue by ensuring all required fields are present
  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      // Ensure all required fields are present with non-nullable values
      const orderData: Omit<Order, "id" | "createdAt"> = {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        secondaryPhone: data.secondaryPhone || null,
        address: data.address,
        governorate: data.governorate,
        city: data.city,
        product: data.product,
        color: data.color,
        image: data.image,
        size: data.size,
        cost: data.cost,
        shipping: data.shipping,
        notes: data.notes || "",
        status: data.status,
      };
      return api.createOrder(orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "تم إنشاء الطلب بنجاح",
        description: "تم إضافة الطلب الجديد إلى قاعدة البيانات",
      });
      setIsSubmitting(false);
      onSuccess();
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "لم يتم إنشاء الطلب، حاول مرة أخرى",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  // Update order mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof formSchema> }) => {
      // Ensure all required fields are present with non-nullable values
      const orderData: Partial<Order> = {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        secondaryPhone: data.secondaryPhone || null,
        address: data.address,
        governorate: data.governorate,
        city: data.city,
        product: data.product,
        color: data.color,
        image: data.image,
        size: data.size,
        cost: data.cost,
        shipping: data.shipping,
        notes: data.notes || "",
        status: data.status,
      };
      return api.updateOrder(id, orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "تم تحديث الطلب بنجاح",
        description: "تم تحديث بيانات الطلب في قاعدة البيانات",
      });
      setIsSubmitting(false);
      onSuccess();
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "لم يتم تحديث الطلب، حاول مرة أخرى",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  // Submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    if (order) {
      updateMutation.mutate({ id: order.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };
  
  // Mock data for dropdowns
  const governorates = ["القاهرة", "الإسكندرية", "الجيزة", "المنصورة", "المنوفية"];
  const cities = ["مدينة نصر", "الدقي", "المهندسين", "العجمي", "المعادي", "شبرا", "وسط البلد"];
  const products = ["حذاء رياضي", "حذاء رسمي", "حذاء كاجوال", "صندل"];
  const colors = ["أسود", "بني", "أبيض", "أزرق", "أحمر"];
  const sizes = ["40", "41", "42", "43", "44", "45"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">بيانات العميل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم العميل</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسم العميل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} dir="ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input placeholder="01xxxxxxxxx" {...field} dir="ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="secondaryPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم هاتف إضافي (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="01xxxxxxxxx" {...field} dir="ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">عنوان التوصيل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="governorate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المحافظة</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {governorates.map((gov) => (
                        <SelectItem key={gov} value={gov}>
                          {gov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدينة</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>العنوان التفصيلي</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="أدخل العنوان التفصيلي" 
                      {...field} 
                      className="min-h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">بيانات المنتج</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المنتج</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنتج" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اللون</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اللون" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المقاس</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المقاس" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>صورة المنتج</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2 flex justify-center">
                    <img src={field.value} alt="Product" className="h-24 object-contain bg-muted/50 p-2 rounded-md" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">التفاصيل المالية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سعر المنتج (ج.م)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shipping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تكلفة الشحن (ج.م)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">معلومات إضافية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>حالة الطلب</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">
                        {orderStatusArabic.pending}
                      </SelectItem>
                      <SelectItem value="delivering">
                        {orderStatusArabic.delivering}
                      </SelectItem>
                      <SelectItem value="delivered">
                        {orderStatusArabic.delivered}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>ملاحظات (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="أي ملاحظات إضافية" 
                      {...field} 
                      className="min-h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : order ? "حفظ التعديلات" : "إضافة الطلب"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
