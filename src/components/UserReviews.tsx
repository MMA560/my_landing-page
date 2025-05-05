import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserReview {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const initialReviews: UserReview[] = [
  {
    id: 1,
    name: "أحمد فؤاد",
    date: "15 مارس 2025",
    rating: 5,
    comment:
      "الكوتشي ده مريح جدًا وشكله شيك أوي. الخامة باينة إنها فخمة، وأحلى كمان من الصور. كل اللي شافه قالي عليه جامد!",
  },
  {
    id: 2,
    name: "نورا عبد الرحمن",
    date: "28 فبراير 2025",
    rating: 4,
    comment:
      "الجلد نضيف والمقاس طالع مظبوط. طلبت مقاسي العادي وطلع تمام. بس خدت شوية وقت على ما أخد على رجلي، عشان كده مدّيته ٤ نجوم.",
  },
  {
    id: 3,
    name: "كريم مجدي",
    date: "2 إبريل 2025",
    rating: 5,
    comment:
      "خامة محترمة وتفاصيل دقيقة. بصراحة يستاهل كل جنيه، مريح جدًا وبيلبِق على لبس خروجات وكمان فورمال.",
  }
];

export const UserReviews = () => {
  const [reviews, setReviews] = useState<UserReview[]>(initialReviews);
  const [sortBy, setSortBy] = useState<string>("recent");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // Track if a review has been submitted
  const { toast } = useToast();

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleSortChange = (value: string) => {
    setSortBy(value);

    const sortedReviews = [...reviews];
    if (value === "highest") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (value === "lowest") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else {
      sortedReviews.sort((a, b) => b.id - a.id);
    }

    setReviews(sortedReviews);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and comment",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newReviewObject: UserReview = {
      id: reviews.length + 1,
      name: newReview.name,
      date: formattedDate,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([newReviewObject, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setReviewSubmitted(true); // Mark review as submitted

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
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

  return (
    <div className="space-y-6" dir="rtl">
      {/* عرض التقييمات فقط إذا لم يتم إرسال التقييم */}
      {!reviewSubmitted && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif">تقييمات العملاء</h3>
            <div className="flex items-center">
              <StarRating rating={Math.round(averageRating)} />
              <span className="mr-2 text-sm font-medium">
                {averageRating.toFixed(1)} ({reviews.length} تقييم)
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
            {reviews.map((review) => (
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
            ))}
          </div>
        </>
      )}

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
                  <Label htmlFor={`rating-${rating}`} className="flex">
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
            />
          </div>

          <Button type="submit" className="bg-gold hover:bg-gold/90 text-white">
            إرسال التقييم
          </Button>
        </form>
      </div>
    </div>
  );
};
