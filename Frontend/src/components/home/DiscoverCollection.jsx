import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import products from "../../data/products";
import ProductCard from "../product/ProductCard";

function DiscoverCollection() {
  const homeProducts = products.filter(
    (product) => product.showOnHome
  );

  return (
    <section className="bg-gradient-to-b from-white via-pink-50/30 to-white py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left"
        >

          <div>

            <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold uppercase tracking-[3px] text-pink-600">
              Our Collection
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
              Discover Our Collection
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Explore Pearl Promise's thoughtfully crafted skincare essentials
              designed to nourish, protect, and reveal your natural glow.
            </p>

          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-pink-300 bg-white px-6 py-3 font-medium text-pink-600 shadow-sm transition-all duration-300 hover:bg-pink-500 hover:text-white"
          >
            Explore All Products

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </motion.div>

        {/* Product Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {homeProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default DiscoverCollection;