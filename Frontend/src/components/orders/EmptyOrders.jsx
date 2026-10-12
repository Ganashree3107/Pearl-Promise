import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-12 text-center shadow"
    >
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-100">
        <ShoppingBag
          size={42}
          className="text-pink-600"
        />
      </div>

      <h2 className="text-3xl font-bold text-gray-900">
        No Orders Yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-gray-500">
        Looks like you haven't placed any orders yet.
        Start shopping and discover your Pearl Promise favorites!
      </p>

      <button
        onClick={() => navigate("/shop")}
        className="mt-8 rounded-2xl bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-700"
      >
        Start Shopping
      </button>
    </motion.div>
  );
}