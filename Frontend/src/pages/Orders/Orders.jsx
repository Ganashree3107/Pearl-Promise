import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { useOrder } from "../../context/OrderContext";

import OrderTimeline from "../../components/orders/OrderTimeline";
import OrderActions from "../../components/orders/OrderActions";
import ReviewModal from "../../components/orders/ReviewModal";
import ReturnModal from "../../components/orders/ReturnModal";

export default function Orders() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orders, cancelOrder, returnOrder } = useOrder();

  // Find current order
  const order = useMemo(() => {
    return orders.find((item) => item.orderId === orderId);
  }, [orders, orderId]);

  // Redirect if order not found
  useEffect(() => {
    if (!order) {
      navigate("/orders", { replace: true });
    }
  }, [order, navigate]);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  if (!order) return null;

  const orderStatus = order.status;
  const isCancelled = orderStatus === "Cancelled";
  const estimatedDate = new Date(order.orderDate);
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  // Cancel Order
  const handleCancelOrder = async () => {

    if (
      ["Shipped", "Out for Delivery", "Delivered"].includes(orderStatus)
    ) {
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    await cancelOrder(order.orderId);
  };

  const handleBuyAgain = () => {
    navigate("/shop");
  };

const handleReturn = async (returnData) => {
  try {
    await returnOrder(order.orderId, {
      reason: returnData.reason,
      comments: returnData.comments,
    });
    setIsReturnOpen(false);
  } catch (error) {
    window.alert(error.message);
  }
};
  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => navigate("/orders")}
          className="mb-8 flex items-center gap-2 text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Section */}

          <div className="space-y-6 lg:col-span-2">
            {/* Order Header */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-6 shadow"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <Package className="text-pink-600" />

                    <h2 className="text-2xl font-bold">
                      Order #{order.orderId}
                    </h2>

                  </div>

                  <p className="mt-2 text-gray-500">
                    Thank you for shopping with Pearl Promise 🌸
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Ordered on{" "}
                    {new Date(order.orderDate).toDateString()}
                  </p>

                </div>

                <div
                  className={`rounded-full px-5 py-2 text-sm font-semibold ${
                    isCancelled
                      ? "bg-red-100 text-red-600"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {isCancelled ? "Cancelled" : orderStatus}
                </div>

              </div>

              <OrderTimeline
                currentStatus={orderStatus}
                isCancelled={isCancelled}
              />

              {/* Delivery Details */}

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl bg-pink-50 p-5">

                  <div className="flex items-center gap-3">

                    <Truck className="text-pink-600" />

                    <div>

                      <p className="text-sm text-gray-500">
                        Delivery Method
                      </p>

                      <h3 className="font-semibold">
                        {order.deliveryMethod?.name}
                      </h3>

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl bg-pink-50 p-5">

                  <div className="flex items-center gap-3">

                    <CalendarDays className="text-pink-600" />

                    <div>

                      <p className="text-sm text-gray-500">
                        Estimated Delivery
                      </p>

                      <h3 className="font-semibold">
                        {isCancelled
                          ? "Cancelled"
                          : estimatedDate.toDateString()}
                      </h3>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* Ordered Items */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl bg-white p-6 shadow"
            >

              <h2 className="mb-6 text-2xl font-bold">
                Ordered Items
              </h2>

              <div className="space-y-5">

                {order.checkoutItems.map((item) => (

                  <div
                    key={item._id || item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-pink-100 p-4 md:flex-row md:items-center"
                  >

                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="text-lg font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity : {item.quantity}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Price : ₹{item.price}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <h3 className="text-xl font-bold text-pink-600">
                        ₹{item.price * item.quantity}
                      </h3>

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>
          {/* Right Section */}

          <div className="space-y-6">

            {/* Shipping Address */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl bg-white p-6 shadow"
            >
              <h2 className="mb-5 text-xl font-semibold">
                Shipping Address
              </h2>

              <div className="space-y-2 text-gray-700">

                <p className="font-semibold">
                  {order.shippingAddress.fullName}
                </p>

                <p>{order.shippingAddress.phone}</p>

                <p>
                  {order.shippingAddress.address}
                </p>

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                </p>

                <p>
                  {order.shippingAddress.pincode}
                </p>

              </div>

            </motion.div>

            {/* Payment Details */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-white p-6 shadow"
            >

              <h2 className="mb-5 text-xl font-semibold">
                Payment Details
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold">
                    {order.paymentMethod}
                  </span>
                </div>

                {order.paymentMethod !== "cod" &&
                  order.paymentDetails && (
                    <>
                      <div className="flex justify-between">
                        <span>Transaction ID</span>
                        <span className="font-semibold">
                          {order.paymentDetails.transactionId}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Payment Status</span>
                        <span className="font-semibold text-green-600">
                          Paid
                        </span>
                      </div>
                    </>
                  )}

              </div>

            </motion.div>

            {/* Price Summary */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl bg-white p-6 shadow"
            >

              <h2 className="mb-5 text-xl font-semibold">
                Price Details
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{order.deliveryFee}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.tax}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">

                  <span>Total</span>

                  <span className="text-pink-600">
                    ₹{order.grandTotal}
                  </span>

                </div>

              </div>

            </motion.div>

            {/* Actions */}

            <OrderActions
              orderStatus={orderStatus}
              isCancelled={isCancelled}
              paymentMethod={order.paymentMethod}
              returnStatus={order.returnStatus}
              onBuyAgain={handleBuyAgain}
              onCancel={handleCancelOrder}
              onReview={() => setIsReviewOpen(true)}
              onReturn={() => setIsReturnOpen(true)}
            />

          </div>

        </div>
        {/* Review Modal */}

        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          order={order}
        />

        {/* Return Modal */}

        <ReturnModal
          isOpen={isReturnOpen}
          onClose={() => setIsReturnOpen(false)}
          onSubmit={handleReturn}
        />

      </div>
    </div>
    </div>
  );
}