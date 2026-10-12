import { motion } from "framer-motion";
import { ShoppingBag, Truck, Tag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import SafeImage from "../common/SafeImage";

function OrderSummary({

  checkoutItems,

  subtotal,

  shipping,

  grandTotal,

  buttonText,

  onButtonClick,

}) {

  const [coupon, setCoupon] = useState("");

  const discount = 0;

  return (

    <motion.div

      initial={{ opacity: 0, x: 30 }}

      animate={{ opacity: 1, x: 0 }}

      transition={{ duration: 0.4 }}

      className="sticky top-24 rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm"

    >

      <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">

        <ShoppingBag className="text-pink-500" />

        Order Summary

      </h2>

      {/* Products */}

      <div className="space-y-5">

        {checkoutItems.map((item) => (

          <div

            key={item.id}

            className="flex items-center gap-4"

          >

            <SafeImage

              src={item.images?.[0] || item.image}

              alt={item.name}

              className="h-20 w-20 rounded-2xl border object-cover"

            />

            <div className="flex-1">

              <h3 className="font-semibold text-gray-900">

                {item.name}

              </h3>

              <p className="text-sm text-gray-500">

                Qty : {item.quantity || 1}

              </p>

            </div>

            <p className="font-semibold">

              ₹{item.price * (item.quantity || 1)}

            </p>

          </div>

        ))}

      </div>
      {/* Coupon */}

      <div className="mt-8">

        <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

          <Tag size={18} />

          Coupon Code

        </label>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="flex-1 rounded-2xl border border-pink-200 px-4 py-3 outline-none transition focus:border-pink-500"
          />

          <button
            type="button"
            onClick={()=> toast("Coupons will be availabe soon.")}
            className="rounded-2xl bg-pink-500 px-6 font-semibold text-white transition hover:bg-pink-600"
          >
            Apply
          </button>

        </div>

      </div>

      {/* Price Details */}

      <div className="mt-8 space-y-4 border-t border-pink-100 pt-6">

        <div className="flex items-center justify-between">

          <span className="text-gray-600">

            Subtotal

          </span>

          <span className="font-medium">

            ₹{subtotal}

          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="flex items-center gap-2 text-gray-600">

            <Truck size={18} />

            Shipping

          </span>

          <span className="font-medium">

            {shipping === 0 ? "FREE" : `₹${shipping}`}

          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-gray-600">

            Discount

          </span>

          <span className="font-medium text-green-600">

            -₹{discount}

          </span>

        </div>

        <div className="border-t border-pink-100 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-xl font-bold text-gray-900">

              Grand Total

            </span>

            <span className="text-2xl font-bold text-pink-600">

              ₹{grandTotal}

            </span>

          </div>

        </div>

      </div>
      {/* Button */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onButtonClick}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
      >
        {buttonText}
      </motion.button>

      {/* Secure Checkout */}

      <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">

        <h3 className="mb-3 text-lg font-semibold text-gray-900">

          🔒 Secure Checkout

        </h3>

        <div className="space-y-2 text-sm text-gray-600">

          <p>✅ 100% Secure Payment</p>

          <p>🚚 Fast & Reliable Delivery</p>

          <p>↩️ Easy Returns</p>

        </div>

      </div>

    </motion.div>

  );

}

export default OrderSummary;