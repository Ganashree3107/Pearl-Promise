import { motion } from "framer-motion";
import { Tag, ShieldCheck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import {useNavigate} from "react-router-dom"; 

function OrderSummary() {

  const {cart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");

  const shipping =cart.length === 0 ? 0 : cartTotal >= 499 ? 0 : 49;

  const discount = 0;

  const total = cartTotal + shipping - discount;

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 40,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      className="sticky top-24 rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm"

    >

      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Order Summary
      </h2>
      {/* Items */}

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Items ({cartCount})
          </span>

          <span className="font-semibold">
            ₹{cartTotal}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Shipping
          </span>

          {shipping === 0 ? (

            <span className="font-semibold text-green-600">
              FREE
            </span>

          ) : (

            <span className="font-semibold">
              ₹{shipping}
            </span>

          )}

        </div>

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Discount
          </span>

          <span className="font-semibold text-green-600">
            -₹{discount}
          </span>

        </div>

      </div>

      <div className="my-8 border-t border-pink-100"></div>

      {/* Coupon */}

      <div>

        <label className="mb-3 flex items-center gap-2 font-semibold text-gray-900">

          <Tag
            size={18}
            className="text-pink-500"
          />

          Apply Coupon

        </label>

        <div className="mt-3 flex gap-3">

          <input

            type="text"

            value={coupon}

            onChange={(e) => setCoupon(e.target.value)}

            placeholder="Enter Coupon"

            className="flex-1 rounded-2xl border border-pink-200 px-5 py-3 outline-none transition focus:border-pink-500"

          />

          <button

            className="rounded-2xl bg-pink-500 px-6 font-semibold text-white transition hover:bg-pink-600"

          >

            Apply

          </button>

        </div>

      </div>

      <div className="my-8 border-t border-pink-100"></div>
      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-2xl font-bold text-gray-900">
          Total
        </span>

        <span className="text-3xl font-bold text-pink-600">
          ₹{total}
        </span>

      </div>

      {/* Checkout Button */}

      <motion.button

        whileHover={{ scale: 1.02 }}

        whileTap={{ scale: 0.98 }}
        onClick={() =>{
          if (cart.length > 0) {
            navigate("/checkout");
        }
        }}
        className="mt-8 w-full rounded-2xl bg-pink-500 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-pink-600">

        Proceed to Checkout →

      </motion.button>

      {/* Secure Checkout */}

      <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-pink-50 py-4">

        <ShieldCheck
          size={20}
          className="text-green-600"
        />

        <span className="font-medium text-gray-700">
          100% Secure Checkout
        </span>

      </div>

      {/* Free Shipping Note */}

      {shipping > 0 && (

        <p className="mt-5 text-center text-sm text-gray-500">

          Add
          <span className="font-semibold text-pink-600">
            {" "}₹{499 - cartTotal}{" "}
          </span>

          more to unlock
          <span className="font-semibold text-green-600">
            {" "}FREE Shipping 🚚
          </span>

        </p>

      )}

    </motion.div>

  );

}

export default OrderSummary;