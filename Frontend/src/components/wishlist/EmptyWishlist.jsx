import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyWishlist() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
        <Heart size={42} className="text-pink-500" />
      </div>

      <h2 className="mt-8 text-4xl font-bold text-gray-900">
        Your Wishlist is Empty
      </h2>

      <p className="mt-4 text-gray-500 max-w-lg mx-auto leading-7">
        Save your favorite Pearl Promise products here and easily find them later.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-10 px-8 py-4 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
      >
        Explore Products
      </Link>
    </section>
  );
}

export default EmptyWishlist;