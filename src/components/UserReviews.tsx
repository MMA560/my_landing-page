// src/components/UserReviews.tsx

import { useEffect, useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { UserReview, BackendReview } from "@/types/review";

export const UserReviews = () => {
  const [displayReviews, setDisplayReviews] = useState<UserReview[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    product_id: 1, // تهيئة مع معرف منتج افتراضي
  });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: fetchedBackendReviews = [],
    isLoading,
    isError,
  } = useQuery<BackendReview[], Error>({
    queryKey: ["reviews"],
    queryFn: api.getAllReviews, // يفترض أن هذا يجلب التقييمات لجميع المنتجات أو منتج معين
    refetchOnWindowFocus: false, // إضافة هذا لمنع إعادة الجلب التلقائي عند التركيز
    refetchOnMount: false,      // إضافة هذا لمنع إعادة الجلب التلقائي عند تحميل المكون
    retry: 1,                   // تحديد عدد مرات إعادة المحاولة في حالة الفشل
  });

  useEffect(() => {

    if (fetchedBackendReviews.length > 0) {
      const mappedReviews: UserReview[] = fetchedBackendReviews.map((backendReview) => ({
        id: backendReview.review_id,
        name: backendReview.reviewer_name,
        date: new Date(backendReview.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        rating: backendReview.rate,
        comment: backendReview.comment,
        product_id: backendReview.product_id,
      }));

      const sorted = [...mappedReviews]; // إنشاء نسخة جديدة للفرز
      if (sortBy === "highest") {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "lowest") {
        sorted.sort((a, b) => a.rating - b.rating);
      } else {
        // الفرز الافتراضي: الأحدث (بافتراض أن الـ ID الأكبر يعني الأحدث)
        sorted.sort((a, b) => b.id - a.id);
      }
      setDisplayReviews(sorted); // تحديث حالة عرض التقييمات
    } else {
      // هذا الجزء هو الأكثر احتمالاً للتسبب في الحلقة إذا كانت fetchedBackendReviews
      // دائماً مصفوفة فارغة لكن بمرجع جديد في كل مرة.
      // نقوم بتحديث displayReviews إلى مصفوفة فارغة فقط إذا لم تكن فارغة بالفعل.
      if (displayReviews.length !== 0) {
        setDisplayReviews([]);
      } else {
      }
    }
  }, [JSON.stringify(fetchedBackendReviews), sortBy, displayReviews.length]); // <--- هنا التعديل لتشخيص المشكلة

  const averageRating =
    displayReviews.length > 0
      ? displayReviews.reduce((acc, review) => acc + review.rating, 0) / displayReviews.length
      : 0;

  const createReviewMutation = useMutation({
    mutationFn: (reviewData: { reviewer_name: string; rate: number; comment: string; product_id: number }) =>
      api.createReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setNewReview({ name: "", rating: 5, comment: "", product_id: newReview.product_id });
      toast({
        title: "تم إرسال التقييم بنجاح",
        description: "شكراً لمشاركتك تجربتك!",
      });
    },
    onError: (error) => {
      console.error("خطأ في إرسال التقييم:", error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم إرسال التقييم، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "معلومات ناقصة",
        description: "الرجاء إدخال اسمك وتعليقك.",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate({
      reviewer_name: newReview.name,
      rate: newReview.rating,
      comment: newReview.comment,
      product_id: newReview.product_id,
    });
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-gold text-gold" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center p-8">جاري تحميل التقييمات...</div>;
  }

  if (isError) {
    return <div className="text-center p-8 text-red-500">حدث خطأ أثناء جلب التقييمات.</div>;
  }

  const reviewsToDisplay = showAllReviews ? displayReviews : displayReviews.slice(0, 3);

  return (
    <div className="space-y-6" dir="rtl">
      <>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif">تقييمات العملاء</h3>
          <div className="flex items-center">
            <StarRating rating={Math.round(averageRating)} />
            <span className="mr-2 text-sm font-medium">
              {averageRating.toFixed(1)} ({displayReviews.length} تقييم)
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h4 className="font-medium">آراء العملاء</h4>
          <div className="w-32">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">الأحدث</SelectItem>
                <SelectItem value="highest">الأعلى تقييمًا</SelectItem>
                <SelectItem value="lowest">الأقل تقييمًا</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {displayReviews.length === 0 ? (
            <div className="text-center text-muted-foreground p-4 border rounded-lg">
              لا توجد تقييمات حتى الآن. كن أول من يقيّم!
            </div>
          ) : (
            reviewsToDisplay.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="flex mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {displayReviews.length > 3 && (
          <Button
            variant="outline"
            className="w-full mt-4 border-foreground text-foreground rounded-md flex items-center justify-center gap-2"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? (
              <>
                عرض أقل <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                عرض المزيد <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </>

      <div className="border-t border-border pt-6 mt-8">
        <h4 className="font-medium mb-4">أضف تقييمك</h4>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <Label htmlFor="review-name">الاسم</Label>
            <input
              id="review-name"
              className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              placeholder="اكتب اسمك"
              disabled={createReviewMutation.isPending}
            />
          </div>

          <div>
            <Label>التقييم</Label>
            <RadioGroup
              className="flex flex-row-reverse space-x-reverse space-x-2 mt-1"
              value={newReview.rating.toString()}
              onValueChange={(val) =>
                setNewReview({ ...newReview, rating: parseInt(val) })
              }
              disabled={createReviewMutation.isPending}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-1 space-x-reverse"
                >
                  <RadioGroupItem
                    value={rating.toString()}
                    id={`rating-${rating}`}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                    <span className="text-xs">{rating}</span>
                    <Star
                      className={`w-4 h-4 ${
                        rating <= newReview.rating ? "fill-gold text-gold" : ""
                      }`}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="review-comment">تعليقك</Label>
            <Textarea
              id="review-comment"
              className="mt-1"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="شاركنا تجربتك مع هذا المنتج"
              rows={4}
              disabled={createReviewMutation.isPending}
            />
          </div>

          <Button
            type="submit"
            className="bg-gold hover:bg-gold/90 text-white"
            disabled={createReviewMutation.isPending}
          >
            {createReviewMutation.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
          </Button>
        </form>
      </div>
    </div>
  );
};