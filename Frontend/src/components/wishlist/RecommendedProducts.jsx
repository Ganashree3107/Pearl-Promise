import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import products from "../../data/products";
import ProductCard from "../shop/ProductCard";

function RecommendedProducts() {

  const recommendedProducts = products
    .filter((product) => product.badge || product.rating >= 4.8)
    .slice(0, 4);

  return (
    <section className="mt-24 rounded-[40px] bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >

          <span className="mb-3 inline-block rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            YOU MAY ALSO LOVE
          </span>

          <h2 className="mt-5 text-5xl font-bold text-gray-900">
            Complete Your Glow Routine ✨
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            Discover Pearl Promise's most loved skincare essentials carefully selected
            to pair perfectly with your wishlist.
          </p>

        </motion.div>
        {/* Products Grid */}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {recommendedProducts.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
            >

              <ProductCard product={product} />

            </motion.div>

          ))}

        </div>

        {/* View All Button */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >

          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-pink-500 bg-white px-8 py-4 text-lg font-semibold text-pink-600 transition-all duration-300 hover:bg-pink-500 hover:text-white"
          >

            View All Products

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

        </motion.div>
      </div>

    </section>
  );
}

export default RecommendedProducts;