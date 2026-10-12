import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, index }) {
  const navigate = useNavigate();

  const firstItem = order.checkoutItems?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        {/* Product Image */}

        <img
          src={firstItem?.images?.[0]}
          alt={firstItem?.name}
          className="h-28 w-28 rounded-2xl object-cover"
        />

        {/* Order Details */}

        <div className="flex-1">

          <h2 className="text-xl font-bold text-gray-900">
            {order.checkoutItems.length > 1
              ? `${firstItem?.name} + ${
                  order.checkoutItems.length - 1
                } more item(s)`
              : firstItem?.name}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Order ID :
            <span className="ml-2 font-medium text-gray-700">
              {order.orderId}
            </span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Ordered :
            <span className="ml-2 font-medium text-gray-700">
              {order.orderDate}
            </span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Items :
            <span className="ml-2 font-medium text-gray-700">
              {order.checkoutItems.length}
            </span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Total :
            <span className="ml-2 text-lg font-bold text-pink-600">
              ₹{order.grandTotal}
            </span>
          </p>

        </div>

        {/* Right Section */}

        <div className="flex flex-col items-start gap-4 md:items-end">

          <OrderStatusBadge status={order.status} />

          <button
            onClick={() =>
              navigate(`/orders/${order.orderId}`, {
                state: order,
              })
            }
            className="flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            <Eye size={18} />
            View Details
          </button>

        </div>

      </div>
    </motion.div>
  );
}