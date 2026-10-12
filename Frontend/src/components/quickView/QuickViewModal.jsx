import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Heart, Truck, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import SafeImage from "../common/SafeImage";
import { getProductDiscount, toPriceNumber } from "../../utils/pricing";

function QuickViewModal({ isOpen, onClose, product }) {
  const { addToCart, isInCart } = useCart();
  const [optimisticallyAddedProductId, setOptimisticallyAddedProductId] = useState(null);
  const added = Boolean(
    product && (
      isInCart(product.id) || optimisticallyAddedProductId === product.id
    )
  );

  if (!isOpen || !product) return null;

  const discount = getProductDiscount(product);
  const originalPrice = toPriceNumber(
    product.originalPrice ?? product.original_price
  );

  const handleAddToCart = async () => {
    setOptimisticallyAddedProductId(product.id);
    try {
      await addToCart(product);
    } catch {
      setOptimisticallyAddedProductId(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 transition"
          >
            <X />
          </button>

          <div className="grid lg:grid-cols-2">
            <div className="flex items-center justify-center bg-pink-50 p-10">
              <SafeImage
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="max-h-[500px] object-contain"
              />
            </div>

            <div className="space-y-6 p-10">
              {product.badge && (
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    product.badge === "Best Seller"
                      ? "bg-amber-100 text-amber-700"
                      : product.badge === "Trending"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} Reviews)</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {discount !== null && originalPrice !== null && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">₹{originalPrice}</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="leading-8 text-gray-500">{product.description}</p>

              <hr className="border-pink-100" />

              <div>
                <h3 className="mb-3 font-semibold">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.skinType?.map((type, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-sky-50 border border-sky-200 px-4 py-2 text-sm text-sky-700"
                    >
                      💧 {type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Size</h3>
                <span className="rounded-xl border border-pink-200 bg-pink-50 px-5 py-3 font-semibold text-pink-600">
                  {product.size}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4">
                <Truck size={22} className="text-pink-500" />
                <span className="text-gray-700">Free Delivery by Tomorrow</span>
              </div>

              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-pink-500 bg-white py-4 font-semibold text-pink-600 transition hover:bg-pink-50"
                  >
                    <Heart size={20} />
                    Wishlist
                  </motion.button>

                  <motion.button
                    onClick={handleAddToCart}
                    disabled={added}
                    whileHover={added ? undefined : { y: -3, scale: 1.02 }}
                    whileTap={added ? undefined : { scale: 0.97 }}
                    className={`add-to-cart-button rounded-2xl py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(236,72,153,0.28)] ${
                      added ? "bg-green-500 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-2xl bg-gray-900 py-4 text-lg font-semibold text-white transition hover:bg-black"
                >
                  ⚡ Buy Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuickViewModal;
