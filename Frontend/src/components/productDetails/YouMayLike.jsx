import ProductCard from "../product/ProductCard";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products";

function YouMayLike({ product }) {

  const recommendations = useMemo(() => {

    const sameCategory = products.filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    );

    let result = [...sameCategory];

    if (result.length < 4) {

      const randomProducts = products
        .filter(
          (item) =>
            item.category !== product.category &&
            item.id !== product.id
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4 - result.length);

      result = [...result, ...randomProducts];

    }

    return result.slice(0, 4);

  }, [product]);

  return (

    <section className="max-w-7xl mx-auto px-6 py-20 bg-pink-50 rounded-4xl">

      <div className="flex items-end justify-between mb-14">

        <div>

          <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
            Recommended For You
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            You May Also Like
          </h2>

        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {recommendations.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
            />

          ))}

        </div>

      </motion.div>

      <div className="mt-12 text-center">

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-2xl border border-pink-200 bg-pink-50 px-8 py-4 font-semibold text-pink-600 transition hover:bg-pink-500 hover:text-white"
        >

          Explore All Products

          <ArrowRight size={20} />

        </Link>

      </div>

    </section>

  );
}

export default YouMayLike;