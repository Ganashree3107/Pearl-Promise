import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import SafeImage from "../common/SafeImage";

function WishlistCard({ product }) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [optimisticallyAdded, setOptimisticallyAdded] = useState(false);
  const added = isInCart(product.id) || optimisticallyAdded;

  const handleAddToCart = async () => {
    setOptimisticallyAdded(true);
    try {
      await addToCart(product);
    } catch {
      setOptimisticallyAdded(false);
    }
  };

  return (
   
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: 30 }}
    transition={{ duration: 0.35 }}
    className="group bg-white rounded-[30px] border border-gray-200 overflow-hidden hover:shadow-xl transition"
  >

      {/* Image */}
      <div className="relative overflow-hidden">

        <SafeImage
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="h-72 w-full object-contain p-6 group-hover:scale-105 transition duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        
        <motion.button
  whileHover={{ scale: 1.15 }}
  whileTap={{ scale: 0.8 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 12,
  }}
  onClick={() => removeFromWishlist(product.id)}
  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md"
>

  <motion.div
    whileTap={{
      scale: 1.4,
      rotate: 15,
    }}
    transition={{
      duration: 0.2,
    }}
  >
    <Heart
      className="fill-pink-500 text-pink-500"
    />
  </motion.div>

</motion.button>

      </div>

      {/* Content */}
      <div className="p-6">

        <p className="uppercase text-xs tracking-[3px] text-pink-500">
          {product.category}
        </p>

        <h3 className="text-2xl font-semibold mt-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-3">

          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <Star
                key={star}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <span className="text-gray-500">
            ({product.reviews})
          </span>

        </div>

        <div className="flex items-center gap-3 mt-4">

          <span className="text-3xl font-bold">
            ₹{product.price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>

        </div>

        <p className="text-green-600 mt-3 font-medium">
          ✓ In Stock
        </p>

<motion.button
  onClick={handleAddToCart}
  disabled={added}
  whileHover={added ? undefined : { y: -3, scale: 1.02 }}
  whileTap={added ? undefined : { scale: 0.97 }}
  className={`group w-full rounded-2xl py-4 text-lg font-semibold text-white
    transition-colors duration-300 ease-out hover:shadow-lg
    ${
      added
        ? "cursor-default bg-green-500"
        : "bg-pink-500 hover:bg-pink-600"
    }`}
>
  <span className="inline-flex items-center justify-center gap-2">
    <motion.span
      key={added ? "added" : "cart"}
      initial={{ opacity: 0, y: 5, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2"
    >
      {added ? <Check size={20} /> : <ShoppingCart size={20} />}
      {added ? "Added" : "Add to Cart"}
    </motion.span>
  </span>
</motion.button>
      </div>
    </motion.div>
  );
}

export default WishlistCard;