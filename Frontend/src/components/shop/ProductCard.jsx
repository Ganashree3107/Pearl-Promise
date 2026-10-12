import { Check, Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import SafeImage from "../common/SafeImage";
import { getProductDiscount, toPriceNumber } from "../../utils/pricing";

function ProductCard({ product }) {
  const {wishlist,addToWishlist,removeFromWishlist}=useWishlist();
  const liked=wishlist.some(item=>item.id===product.id);
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const price = toPriceNumber(product.price);
  const originalPrice = toPriceNumber(
    product.originalPrice ?? product.original_price
  );
  const discount = getProductDiscount(product);
  const [optimisticallyAdded, setOptimisticallyAdded] = useState(false);
  const added = isInCart(product.id) || optimisticallyAdded;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/shop" } } });
      return;
    }

    setOptimisticallyAdded(true);
    try {
      await addToCart(product);
    } catch {
      setOptimisticallyAdded(false);
      navigate("/login", { state: { from: { pathname: "/shop" } } });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl bg-white border border-pink-100 shadow-sm hover:shadow-2xl transition-all duration-300"
    >

      {/* Badge */}

      {product.badge && (
        <span
          className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold shadow-md
          ${
            product.badge === "Best Seller"
              ? "bg-amber-100 text-amber-700"
              : product.badge === "New"
              ? "bg-pink-100 text-pink-600"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {product.badge}
        </span>
      )}
      

      {/* Wishlist */}

      <button
        onClick={() => {
          const liked=wishlist.some(item=>item.id===product.id);

          if(liked){
            removeFromWishlist(product.id);
          }else{
            addToWishlist(product)
          }
        }}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
      >
        <Heart
          size={20}
          className={`transition ${
            liked
              ? "fill-pink-500 text-pink-500"
              : "text-gray-500 hover:text-pink-500"
          }`}
        />
      </button>

      {/* Image */}

      <Link to={`/product/${product.slug}`}>

        <div className="relative overflow-hidden rounded-t-3xl p-6"
        style={{backgroundColor:product.bgColor}}>

          <SafeImage
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="mx-auto h-64 w-full object-contain transition duration-500 group-hover:scale-105"
          />

          {/* Quick View */}

          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition duration-300 group-hover:opacity-100">

            <button className="rounded-full bg-white p-3 shadow-xl hover:bg-pink-500 hover:text-white transition">
              <Eye size={20} />
            </button>

          </div>

        </div>

      </Link>

      {/* Content */}

      <div className="p-5">

        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-2">

          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-medium">
            {product.rating}
          </span>

          <span className="text-sm text-gray-400">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}

        <div className="mt-5 flex items-center gap-3">

          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          {discount !== null && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>

              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        {/* Add To Cart */}


<motion.button
  onClick={handleAddToCart}
  disabled={added}
  whileHover={added ? undefined : { y: -3, scale: 1.02 }}
  whileTap={added ? undefined : { scale: 0.97 }}
  className={`group w-full rounded-xl py-3 text-lg font-semibold text-white
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:scale-[1.02]
    hover:shadow-lg
    active:translate-y-0 active:scale-95
    ${
      added
        ? "cursor-not-allowed bg-green-500"
        : "bg-pink-500 hover:bg-pink-600"
    }`}
>
  <motion.span
    key={added ? "added" : "cart"}
    initial={{ opacity: 0, y: 5, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="inline-flex items-center justify-center gap-2"
  >
    {added ? <Check size={20} /> : <ShoppingCart size={20} />}
    {added ? "Added" : "Add to Cart"}
  </motion.span>
</motion.button>
      </div>

    </motion.div>
  );
}

export default ProductCard;