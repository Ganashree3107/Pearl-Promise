import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShoppingBag,
  Receipt,
} from "lucide-react";

export default function OrderSuccessModal({
  open,
  onClose,
  onContinue,
  amount,
  paymentMethod,
  paymentDetails,
  isSubmitting = false,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
            y: 40,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.8,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        >

          <div className="text-center">

            <CheckCircle2
              size={85}
              className="mx-auto text-green-500"
            />

            <h2 className="mt-6 text-3xl font-bold">
              Order Placed!
            </h2>

            <p className="mt-3 text-gray-500">
              Thank you for shopping with Pearl Promise.
            </p>

            <div className="mt-7 rounded-2xl bg-pink-50 p-5">

              <p className="text-sm text-gray-500">
                Amount Paid
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                ₹{amount}
              </h3>

            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 p-5 text-left">

              <div className="flex items-center gap-3">

                <Receipt className="text-pink-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <h4 className="font-semibold">
                    {paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : paymentDetails?.app}
                  </h4>

                </div>

              </div>

              <div className="mt-5">

                <p className="text-sm text-gray-500">
                  Transaction ID
                </p>

                <p className="font-semibold mt-1">
                  {paymentDetails?.transactionId}
                </p>

              </div>

            </div>
            <div className="mt-8 flex flex-col gap-3">

              <button
                onClick={onContinue}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-2xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
              >
                <ShoppingBag size={20} />
                {isSubmitting ? "Placing Order..." : "Continue to Orders"}
              </button>

              <button
                onClick={onClose}
                className="rounded-2xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
              >
                Close
              </button>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}