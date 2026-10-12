import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingBag } from "lucide-react";

function CheckoutHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-pink-50 via-white to-pink-50 border-b border-pink-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-pink-500 transition"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            to="/cart"
            className="hover:text-pink-500 transition"
          >
            Cart
          </Link>

          <ChevronRight size={15} />

          <span className="font-semibold text-pink-500">
            Checkout
          </span>

        </div>

        {/* Heading */}

        <div className="mt-8 flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">

            <ShoppingBag
              size={30}
              className="text-pink-500"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-gray-900">
              Secure Checkout
            </h1>

            <p className="mt-2 text-gray-500">
              Complete your Pearl Promise order securely and enjoy glowing skin.
            </p>

          </div>

        </div>

      </div>
    </motion.section>
  );
}

export default CheckoutHeader;