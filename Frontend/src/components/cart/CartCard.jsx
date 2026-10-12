import { motion } from "framer-motion";
import {
  Heart,
  Trash2,
  Plus,
  Minus,
  Star,
  Truck,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SafeImage from "../common/SafeImage";
import { getProductDiscount, toPriceNumber } from "../../utils/pricing";

function CartCard({ product }) {
  const discount = getProductDiscount(product);
  const originalPrice = toPriceNumber(
    product.originalPrice ?? product.original_price
  );

  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const {
    addToWishlist,
  } = useWishlist();

  const handleSaveForLater = async () => {
    await addToWishlist(product);
    await removeFromCart(product.id);
  };

  return (

    <motion.div

      layout

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: 30,
        scale: 0.95,
      }}

      whileHover={{
        y: -5,
      }}

      transition={{
        duration: 0.35,
      }}

      className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm hover:shadow-xl"

    >

      <div className="grid gap-8 p-8 lg:grid-cols-[220px_1fr]">

        {/* Image */}

        <div
          className="flex items-center justify-center rounded-3xl"
          style={{
            backgroundColor: product.bgColor,
          }}
        >

          <SafeImage
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="h-56 object-contain transition duration-300 hover:scale-105"
          />

        </div>

        {/* Right Side */}

        <div className="space-y-6">
          {/* Product Badge */}

          {product.badge && (
            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
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

          {/* Product Name */}

          <h2 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h2>

          {/* Rating */}

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-1">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {product.rating}
              </span>

            </div>

            <span className="text-gray-500">
              ({product.reviews} Reviews)
            </span>

          </div>

          {/* Price */}

          <div className="flex flex-wrap items-center gap-4">

            <span className="text-4xl font-bold text-gray-900">
              ₹{product.price}
            </span>

            {discount !== null && originalPrice !== null && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {discount}% OFF
                </span>
              </>
            )}

          </div>

          {/* Delivery */}

          <div className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4">

            <Truck
              size={20}
              className="text-pink-500"
            />

            <span className="text-gray-700">
              Free Delivery for orders above ₹499.
            </span>

          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={handleSaveForLater}
              className="flex items-center gap-2 rounded-xl border border-pink-200 px-5 py-3 text-pink-600 transition hover:bg-pink-50"
            >
              <Heart size={18} />
              Save for Later
            </button>

            <button
              onClick={() => removeFromCart(product.id)}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
              Remove
            </button>

          </div>
          {/* Quantity & Subtotal */}

          <div className="flex flex-col gap-6 border-t border-pink-100 pt-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Quantity */}

            <div>

              <p className="mb-3 text-sm font-semibold text-gray-500">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-2xl border border-pink-200 bg-pink-50">

                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-pink-100"
                >
                  <Minus size={18} />
                </button>

                <span className="w-14 text-center text-lg font-semibold">
                  {product.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-pink-100"
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

            {/* Subtotal */}

            <div className="text-right">

              <p className="text-sm font-semibold text-gray-500">
                Subtotal
              </p>

              <h3 className="mt-2 text-3xl font-bold text-pink-600">
                ₹{product.price * product.quantity}
              </h3>

            </div>

          </div>
          </div>

      </div>

    </motion.div>

  );

}

export default CartCard;