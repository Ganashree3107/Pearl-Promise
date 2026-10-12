import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Wallet,
  ShieldCheck,
  ChevronRight,
  X,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-hot-toast";

const upiApps = [
  {
    id: 1,
    name: "Google Pay",
    logo: "/images/payment/gpay.png",
    color: "bg-white",
  },
  {
    id: 2,
    name: "PhonePe",
    logo: "/images/payment/phonepe.png",
    color: "bg-[#5F259F] text-white",
  },
  {
    id: 3,
    name: "Paytm",
    logo: "/images/payment/paytm.png",
    color: "bg-[#00BAF2] text-white",
  },
];

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  amount,
  onPaymentSuccess,
}) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const transactionId =
    "TXN" + Math.floor(100000000 + Math.random() * 900000000);

  const handleAppSelect = (app) => {
    setSelectedApp(app);

    toast.success(`${app.name} selected`);

    setTimeout(() => {
      setShowPinModal(true);
    }, 300);
  };

  const handlePayment = () => {
    if (pin.length !== 6) {
      toast.error("Please enter a valid 6-digit UPI PIN.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        setShowPinModal(false);

        onPaymentSuccess({
          app: selectedApp.name,
          transactionId,
        });

        setSuccess(false);
        setPin("");
      }, 1800);
    }, 2500);
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Payment Method
      </h2>

      <div className="space-y-5">

        {/* UPI */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod("upi")}
          className={`w-full border rounded-2xl p-5 flex items-center justify-between transition
          ${
            paymentMethod === "upi"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <Smartphone className="text-pink-600" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold">
                UPI Payment
              </h3>

              <p className="text-sm text-gray-500">
                Google Pay, PhonePe, Paytm
              </p>
            </div>

          </div>

          <ChevronRight />
        </motion.button>

        {/* COD */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod("cod")}
          className={`w-full border rounded-2xl p-5 flex items-center justify-between transition
          ${
            paymentMethod === "cod"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Wallet className="text-green-600" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold">
                Cash on Delivery
              </h3>

              <p className="text-sm text-gray-500">
                Pay when your order arrives
              </p>
            </div>

          </div>

          <ChevronRight />
        </motion.button>

      </div>

      {/* UPI Apps */}

      {paymentMethod === "upi" && (
        <div className="mt-8">

          <h3 className="font-semibold mb-5">
            Choose UPI App
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {upiApps.map((app) => (
              <motion.button
                key={app.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAppSelect(app)}
                className="border rounded-2xl p-6 hover:border-pink-400 transition"
              >
                <img
                  src={app.logo}
                  alt={app.name}
                  className="h-14 mx-auto object-contain"
                />

                <p className="mt-4 font-semibold">
                  {app.name}
                </p>

              </motion.button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
      {showPinModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
          >
            {!processing && !success && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedApp?.logo}
                      alt={selectedApp?.name}
                      className="h-10"
                    />

                    <div>
                      <h3 className="text-lg font-bold">
                        {selectedApp?.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Demo Payment
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPinModal(false);
                      setPin("");
                    }}
                  >
                    <X />
                  </button>
                </div>

                <div className="mt-8 rounded-2xl bg-pink-50 p-5">
                  <p className="text-sm text-gray-500">
                    Amount
                  </p>

                  <h2 className="mt-1 text-3xl font-bold">
                    ₹{amount}
                  </h2>
                </div>

                <div className="mt-7">
                  <label className="font-medium">
                    Enter 6-digit UPI PIN
                  </label>

                  <div className="relative mt-3">
                    <input
                      type={showPin ? "text" : "password"}
                      value={pin}
                      maxLength={6}
                      onChange={(e) =>
                        setPin(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="******"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-pink-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPin(!showPin)
                      }
                      className="absolute right-4 top-3.5"
                    >
                      {showPin ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={15} />
                    Demo payment only. No real transaction.
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => {
                      setShowPinModal(false);
                      setPin("");
                    }}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePayment}
                    className="flex-1 rounded-xl bg-pink-600 py-3 font-medium text-white hover:bg-pink-700"
                  >
                    Pay ₹{amount}
                  </button>
                </div>
              </>
            )}

            {processing && (
              <div className="py-12 text-center">
                <Loader2
                  size={55}
                  className="mx-auto animate-spin text-pink-600"
                />

                <h2 className="mt-6 text-xl font-bold">
                  Processing Payment...
                </h2>

                <p className="mt-2 text-gray-500">
                  Please wait while we verify your payment.
                </p>
              </div>
            )}

            {success && (
              <div className="py-10 text-center">
                <CheckCircle2
                  size={70}
                  className="mx-auto text-green-500"
                />

                <h2 className="mt-5 text-2xl font-bold">
                  Payment Successful
                </h2>

                <p className="mt-2 text-gray-500">
                  ₹{amount} paid successfully.
                </p>

                <div className="mt-6 rounded-xl bg-green-50 p-4">
                  <p className="font-medium">
                    {selectedApp?.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Transaction ID
                  </p>

                  <p className="font-semibold">
                    {transactionId}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}