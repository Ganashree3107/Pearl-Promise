import { Star } from "lucide-react";

function ProductRating({ rating, reviews }) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <span className="text-sm font-medium text-gray-700">
        {rating}
      </span>

      <span className="text-sm text-gray-500">
        ({reviews} reviews)
      </span>
    </div>
  );
}

export default ProductRating;