import { AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import CartCard from "./CartCard";
import EmptyCart from "./EmptyCart";

function CartGrid() {

  const { cart } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (

    <div className="space-y-8">

      <AnimatePresence mode="popLayout">

        {cart.map((product) => (

          <CartCard
            key={product.id}
            product={product}
          />

        ))}

      </AnimatePresence>

    </div>

  );

}

export default CartGrid;