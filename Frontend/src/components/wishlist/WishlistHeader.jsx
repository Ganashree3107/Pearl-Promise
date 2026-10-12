import { Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

function WishlistHeader() {
    const {wishlist}=useWishlist();
  return (
    <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-md text-gray-500 mb-8">

        <Link
          to="/"
          className="hover:text-pink-500 transition"
        >
          Home
        </Link>

        <ChevronRight size={16} />

        <span className="text-pink-500 font-medium">
          Wishlist
        </span>

      </div>

      {/* Heading */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">

              <Heart
                className="text-pink-500 fill-pink-500"
                size={26}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">
                My Wishlist
              </h1>

              <p className="text-gray-500 mt-2">
                {wishlist.length}{wishlist.length===1?"Product":"Products"} Saved
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WishlistHeader;