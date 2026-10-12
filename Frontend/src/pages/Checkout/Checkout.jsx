import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import OrderSummary from "../../components/checkout/OrderSummary";

import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import {
  readCheckoutDraft,
  saveCheckoutDraft,
} from "../../utils/checkoutDraft";

function Checkout() {

  const { cart, isLoading: isCartLoading } = useCart();

  const navigate = useNavigate();

  const location = useLocation();

  const [initialDraft] = useState(readCheckoutDraft);
  const buyNowProduct =
    location.state?.buyNowProduct || initialDraft?.buyNowProduct;

  const checkoutItems = buyNowProduct
    ? [buyNowProduct]
    : cart.length > 0
      ? cart
      : initialDraft?.checkoutItems || [];

  useEffect(() => {

    if (!isCartLoading && checkoutItems.length === 0 && !buyNowProduct) {
      
      toast.error("Your cart is empty.");
      
      navigate("/cart");

    }

  }, [checkoutItems.length, isCartLoading, buyNowProduct, navigate]);

  // Shipping Address

  const [address, setAddress] = useState(() => initialDraft?.address || null);

  // Delivery Method

  const [deliveryMethod, setDeliveryMethod] = useState(() => initialDraft?.deliveryMethod || {
    id: "standard",
    name: "Standard Delivery",
    price: 0,
    days: "3 - 5 Days",
  });
  const [clientOrderId] = useState(
    () => initialDraft?.clientOrderId || crypto.randomUUID()
  );

  const subtotal = checkoutItems.reduce(

    (total, item) =>

      total + item.price * (item.quantity || 1),

    0

  );

  const grandTotal =

    subtotal + deliveryMethod.price;

  useEffect(() => {
    if (isCartLoading && !buyNowProduct) return;

    saveCheckoutDraft({
      ...initialDraft,
      clientOrderId,
      buyNowProduct,
      checkoutItems,
      address,
      deliveryMethod,
      subtotal,
      grandTotal,
    });
  }, [
    address,
    buyNowProduct,
    checkoutItems,
    clientOrderId,
    deliveryMethod,
    grandTotal,
    initialDraft,
    isCartLoading,
    subtotal,
  ]);

  const handleContinue = () => {

    if (!address) {

      toast.error("Please save your shipping address.");

      return;

    }
    if (!deliveryMethod) {

      toast.error("Please select a delivery method.");

      return;

    } 

    navigate("/payment", {

      state: {

        clientOrderId,
        checkoutItems,

        address,

        deliveryMethod,

        subtotal,

        grandTotal,

      },

    });

  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">

      <CheckoutHeader />

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-10 lg:grid-cols-3">

        {/* Left Section */}

        <div className="space-y-8 lg:col-span-2">

          <ShippingAddress
            address={address}
            setAddress={setAddress}
          />

          <DeliveryMethod
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />

        </div>

        {/* Right Section */}
        <div className="sticky top-28 self-start">
        <OrderSummary
          checkoutItems={checkoutItems}
          subtotal={subtotal}
          shipping={deliveryMethod.price}
          grandTotal={grandTotal}
          buttonText="Continue to Payment"
          onButtonClick={handleContinue}
        />
        </div>
      </div>
    </div>

  );

}

export default Checkout;