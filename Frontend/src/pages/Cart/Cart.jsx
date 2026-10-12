import CartHeader from "../../components/cart/CartHeader";
import CartGrid from "../../components/cart/CartGrid";
import OrderSummary from "../../components/cart/CartOrderSummary";
import {useCart} from "../../context/CartContext"
import {Link} from "react-router-dom";
import Breadcrumb from "../../components/cart/Breadcrumb";

function Cart() {
const {cart} =useCart();
  return (

    <section className="bg-gradient-to-b from-pink-50 via-white to-rose-50 min-h-screen py-16">

      <div className="mx-auto max-w-7xl px-6">
        <Breadcrumb/>

        {/* Header */}

        <CartHeader />

        {/* Content */}

{cart.length === 0 ? (

  <div className="mt-16 flex flex-col items-center justify-center rounded-[32px] bg-white py-20 shadow-sm">

    <div className="text-7xl">🛒</div>

    <h2 className="mt-6 text-3xl font-bold text-gray-900">
      Your Cart is Empty
    </h2>
    <p className="mt-3 text-center text-gray-500">
      Looks like you haven't added any skincare products yet.
    </p>

    <Link
      to="/shop"
      className="mt-8 rounded-2xl bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
    >
      Continue Shopping
    </Link>

  </div>

) : (

  <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">

    <div>
      <CartGrid />
    </div>

    <div>
      <OrderSummary />
    </div>

  </div>

)}

        </div>

    </section>

  );

}

export default Cart;