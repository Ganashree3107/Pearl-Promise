import { ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

function WishlistActions() {
    const {clearWishlist}=useWishlist();
  return (
    <section className="max-w-7xl mx-auto px-6 mb-16 mt-8">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-gray-500">
          Keep your favorite Pearl Promise products in one place.
        </p>

        <div className="flex gap-4">

          <button
          onClick={clearWishlist}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 transition"
          >
            <Trash2 size={18} />
            Remove All
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition shadow-md"
          >
            <ShoppingCart size={18} />
            Move All To Cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default WishlistActions;