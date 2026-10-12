import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

function Breadcrumb({ product }) {
  return (
    <section className="border-b border-pink-100 bg-gradient-to-r from-pink-50 via-white to-rose-50">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 text-md"
        >

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors"
          >
            <Home size={18} />
            Home
          </Link>

          <ChevronRight size={18} className="text-gray-300" />

          <Link
            to="/shop"
            className="text-gray-500 hover:text-pink-500 transition-colors"
          >
            Shop
          </Link>
          <ChevronRight size={18} className="text-gray-300" />

          <Link
            to="/cart"
            className="text-gray-500 hover:text-pink-500 transition-colors"
          >
            Cart
          </Link>

        </motion.div>

      </div>

    </section>
  );
}

export default Breadcrumb;