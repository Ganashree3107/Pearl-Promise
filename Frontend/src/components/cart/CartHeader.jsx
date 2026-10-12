import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

function CartHeader() {
  const { cart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex flex-col items-center justify-between gap-6 rounded-[32px] bg-gradient-to-r from-pink-50 via-white to-rose-50 p-8 shadow-sm md:flex-row"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <ShoppingBag className="h-8 w-8 text-pink-600" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {cart.length} {cart.length === 1 ? "Item" : "Items"} in your cart
          </p>
        </div>
      </div>

      <div className="rounded-full bg-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg">
        Happy Shopping 🌸
      </div>
    </motion.div>
  );
}

export default CartHeader;