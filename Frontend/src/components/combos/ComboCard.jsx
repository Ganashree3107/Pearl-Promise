import { motion } from "framer-motion";
import { Check, Star, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import SafeImage from "../common/SafeImage";
import { getDiscountPercent } from "../../utils/pricing";

function ComboCard({ combo }) {

  const navigate = useNavigate();
  const {cart, addToCart } = useCart();
  const [optimisticallyAdded, setOptimisticallyAdded] = useState(false);
  const {wishlist,addToWishlist,removeFromWishlist}=useWishlist();

  const isWishlist=wishlist.some((item)=>item.id===combo.id);

  const discount = getDiscountPercent(combo.price, combo.originalPrice);
  const isInCart = cart.some((item) => item.id === combo.id);
  const added = isInCart || optimisticallyAdded;

  const handleAddToCart = async () => {
    const wasInCart = isInCart;
    setOptimisticallyAdded(true);
    try {
      await addToCart({ ...combo, quantity: 1 });
      if (wasInCart) {
        toast.error("Quantity updated");
      } else {
        toast.success("Added to cart");
      }
    } catch {
      setOptimisticallyAdded(false);
      toast.error("Unable to add to cart");
    }
  };
  return (

    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm transition hover:shadow-2xl"
    >

      {/* Image */}

      <div className="relative overflow-hidden">
       
        <SafeImage
          src={combo.image}
          alt={combo.name}
          className="h-80 w-full object-cover object-center transition duration-500 hover:scale-105"
        />
        <button
  onClick={() =>
    isWishlist
      ? removeFromWishlist(combo.id)
      : addToWishlist(combo)
  }
  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110"
>
  <Heart
    size={22}
    className={
      isWishlist
        ? "fill-pink-500 text-pink-500"
        : "text-gray-500"
    }
  />
</button>

        {/* Badge */}

        <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">

          {combo.badge}

        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Rating */}

        <div className="mb-3 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {combo.rating}
          </span>

        </div>

        {/* Name */}

        <h2 className="text-2xl font-bold text-gray-900">

          {combo.name}

        </h2>

        {/* Description */}

        <p className="mt-3 leading-7 text-gray-500">
          {Array.isArray(combo.description)
            ? combo.description.filter(Boolean).join(" • ")
            : combo.description}
        </p>

        {/* Products */}

        <div className="mt-5 inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">

          📦 {combo.products} Products

        </div>

        {/* Price */}

        <div className="mt-6 flex items-center gap-4">

          <span className="text-3xl font-bold text-gray-900">

            ₹{combo.price}

          </span>

          {discount !== null && (
            <span className="text-xl text-gray-400 line-through">
              ₹{combo.originalPrice}
            </span>
          )}

        </div>

        {/* Discount */}

        <div className="mt-3">

          {discount !== null && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {discount}% OFF
            </span>
          )}

        </div>

        {/* Buttons */}

        <div className="mt-8 grid grid-cols-2 gap-4">

<motion.button
  onClick={handleAddToCart}
  whileHover={{ y: -3, scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  className={`group flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:scale-[1.02]
    hover:shadow-lg
    active:translate-y-0
    active:scale-95
    ${
      isInCart
        ? "bg-green-600 text-white hover:bg-green-700"
        : "bg-pink-500 text-white hover:bg-pink-600"
    }`}
>
  <motion.span
    key={added ? "added" : "cart"}
    initial={{ opacity: 0, y: 5, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="inline-flex items-center gap-2"
  >
    {added ? <Check size={18} /> : <ShoppingCart size={18} />}
    {added ? "Added" : "Add to Cart"}
  </motion.span>
</motion.button>
          <button
            onClick={() => navigate("/checkout",{state:{buyNowProduct:{...combo, quantity: 1},},
            })
        }
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-pink-500 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
          >

            <Zap size={18} />

            Buy Now

          </button>

        </div>

      </div>

    </motion.div>

  );

}

export default ComboCard;