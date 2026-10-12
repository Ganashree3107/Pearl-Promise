import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 40 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.5 }}

      className="flex flex-col items-center justify-center rounded-[36px] border border-pink-100 bg-gradient-to-b from-pink-50 via-white to-rose-50 px-8 py-24 text-center"

    >

      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-pink-100">

        <ShoppingBag
          size={54}
          className="text-pink-500"
        />

      </div>

      <h2 className="mt-8 text-4xl font-bold text-gray-900">

        Your Cart is Empty

      </h2>

      <p className="mt-4 max-w-xl text-lg leading-8 text-gray-500">

        Looks like you haven't added any Pearl Promise products yet.
        Start shopping and build your perfect skincare routine.

      </p>

      <Link

        to="/shop"

        className="mt-10 inline-flex items-center gap-3 rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-pink-600"

      >

        Continue Shopping

        <ArrowRight size={20} />

      </Link>

    </motion.div>

  );

}

export default EmptyCart;