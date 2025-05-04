
import { Star } from "lucide-react";

type ReviewProps = {
  name: string;
  date: string;
  rating: number;
  comment: string;
};

const reviews: ReviewProps[] = [
  {
    name: "Michael Thompson",
    date: "March 15, 2025",
    rating: 5,
    comment: "These shoes are incredibly comfortable and stylish. The craftsmanship is excellent, and they look even better in person than in the photos. I've received many compliments already!"
  },
  {
    name: "Emma Johnson",
    date: "February 28, 2025",
    rating: 4,
    comment: "High-quality leather and perfect fit. I ordered my usual size and they fit perfectly. The only reason I'm giving 4 stars instead of 5 is that they needed a short break-in period."
  },
  {
    name: "James Wilson",
    date: "April 2, 2025",
    rating: 5,
    comment: "Outstanding quality and attention to detail. These shoes are worth every penny - the comfort level is exceptional and they pair well with both casual and formal outfits."
  }
];

const Review: React.FC<ReviewProps> = ({ name, date, rating, comment }) => {
  return (
    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{name}</h4>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
          />
        ))}
      </div>
      <p className="text-sm">{comment}</p>
    </div>
  );
};

export const CustomerReviews = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-serif">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-gold text-gold"
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">4.8 (24 reviews)</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>
    </div>
  );
};
