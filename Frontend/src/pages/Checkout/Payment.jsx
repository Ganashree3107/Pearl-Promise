import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
import OrderSuccessModal from "../../components/checkout/OrderSuccessModal";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import {
  clearCheckoutDraft,
  readCheckoutDraft,
  saveCheckoutDraft,
} from "../../utils/checkoutDraft";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [initialDraft] = useState(readCheckoutDraft);
  const checkoutData = state || initialDraft;

  const { clearCart } = useCart();
  const { addOrder } = useOrder();

  const {
    clientOrderId,
    checkoutItems = [],
    address = {},
    deliveryMethod = {},
    subtotal = 0,
    grandTotal = 0,
  } = checkoutData || {};

  const [paymentMethod, setPaymentMethod] = useState(
    () => initialDraft?.paymentMethod || "upi"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(
    () => initialDraft?.showSuccessModal ?? Boolean(initialDraft?.paymentDetails)
  );
  const [paymentDetails, setPaymentDetails] = useState(
    () => initialDraft?.paymentDetails || null
  );
  const [orderError, setOrderError] = useState("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  useEffect(() => {
    if (!checkoutData) navigate("/checkout", { replace: true });
  }, [checkoutData, navigate]);

  useEffect(() => {
    if (!checkoutData) return;

    saveCheckoutDraft({
      ...initialDraft,
      ...checkoutData,
      paymentMethod,
      paymentDetails,
      showSuccessModal,
    });
  }, [
    checkoutData,
    initialDraft,
    paymentDetails,
    paymentMethod,
    showSuccessModal,
  ]);

  const handlePaymentSuccess = (details) => {
    setPaymentDetails(details);
    setShowSuccessModal(true);
    saveCheckoutDraft({
      ...initialDraft,
      ...checkoutData,
      paymentMethod,
      paymentDetails: details,
      showSuccessModal: true,
    });
  };

  const handleContinue = async () => {
    setOrderError("");
    setIsCreatingOrder(true);
    try {
      await addOrder({
        shipping_address: {
          full_name: address.fullName,
          phone: address.phone,
          email: address.email,
          address: address.address,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        delivery_method: deliveryMethod.id || "standard",
        payment_method: paymentMethod,
        idempotency_key: clientOrderId,
      });
      await clearCart();
      clearCheckoutDraft();
      setShowSuccessModal(false);
      navigate("/orders", { replace: true });
    } catch (error) {
      setOrderError(error.message || "Unable to place your order. Please try again.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (!checkoutData) return null;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-pink-600 font-medium hover:text-pink-700"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-10">
          Payment
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-6 shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <MapPin className="text-pink-600" />
                <h2 className="text-xl font-bold">
                  Shipping Address
                </h2>
              </div>

              <p className="font-semibold">
                {address.fullName}
              </p>

              <p className="mt-2 text-gray-600">
                {address.address}
              </p>

              <p className="text-gray-600">
                {address.city}, {address.state}
              </p>

              <p className="text-gray-600">
                {address.pincode}
              </p>

              <p className="mt-2">
                📞 {address.phone}
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-6 shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <Truck className="text-pink-600" />
                <h2 className="text-xl font-bold">
                  Delivery Method
                </h2>
              </div>

              <p className="font-semibold">
                {deliveryMethod.name}
              </p>

              <p className="text-gray-500 mt-1">
                {deliveryMethod.description}
              </p>

              <p className="mt-3 font-medium text-pink-600">
                {deliveryMethod.price}
              </p>

            </motion.div>
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              amount={grandTotal}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>

          <div>

            <OrderSummary
              checkoutItems={checkoutItems}
              subtotal={subtotal}
              shipping={deliveryMethod.price || 0}
              grandTotal={grandTotal}
              buttonText={
                paymentMethod === "cod"
                  ? "Place Order"
                  : "Proceed to Pay"
              }
              onButtonClick={() => {
                if (paymentMethod === "cod") {
                  handlePaymentSuccess({
                    app: "Cash on Delivery",
                    transactionId:
                      "COD" +
                      Math.floor(
                        100000000 + Math.random() * 900000000
                      ),
                  });
                }
              }}
            />

          </div>

        </div>

        <OrderSuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onContinue={handleContinue}
          amount={grandTotal}
          paymentMethod={paymentMethod}
          paymentDetails={paymentDetails}
          isSubmitting={isCreatingOrder}
        />
        {orderError && (
          <p className="mt-4 text-center font-medium text-red-600">
            {orderError}
          </p>
        )}
      </div>
    </div>
  );
}