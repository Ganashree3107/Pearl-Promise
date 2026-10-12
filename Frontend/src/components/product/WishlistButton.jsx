import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext";

function WishlistButton({ product }) {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const liked = wishlist.some((item) => item.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.12,
        y: -2,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      onClick={handleWishlist}
      className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center
        rounded-full bg-white/90 shadow-md backdrop-blur-sm
        transition-all duration-300
        hover:shadow-lg
        ${
          liked
            ? "hover:bg-pink-50"
            : "hover:bg-pink-50"
        }`}
      aria-label={liked ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart
        size={20}
        strokeWidth={2}
        className={`transition-all duration-300 ${
          liked
            ? "fill-pink-500 text-pink-500"
            : "text-gray-500 group-hover:text-pink-500 hover:text-pink-500"
        }`}
      />
    </motion.button>
  );
}

export default WishlistButton;