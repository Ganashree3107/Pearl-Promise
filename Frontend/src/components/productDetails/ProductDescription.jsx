import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Leaf,
} from "lucide-react";

function ProductDescription({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          About Product
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          Discover Healthy Skin
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Every Pearl Promise formula is thoughtfully created to give
          your skin the nourishment, hydration and protection
          it deserves.
        </p>

      </motion.div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[32px] bg-gradient-to-br from-pink-50 via-white to-rose-50 border border-pink-100 p-10 shadow-sm"
      >

        <h3 className="text-2xl font-semibold text-gray-900">
          Description
        </h3>

        <p className="mt-6 leading-8 text-gray-600 text-lg">
          {product.description}
        </p>

        {/* Features */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="flex items-start gap-4">

            <div className="rounded-full bg-pink-100 p-3 text-pink-600">
              <Sparkles size={22}/>
            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Naturally Effective
              </h4>

              <p className="mt-2 text-gray-500">
                Carefully formulated to deliver visible skincare results.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <Leaf size={22}/>
            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Skin Loving Formula
              </h4>

              <p className="mt-2 text-gray-500">
                Made using gentle ingredients suitable for everyday use.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <ShieldCheck size={22}/>
            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Dermatologist Tested
              </h4>

              <p className="mt-2 text-gray-500">
                Designed with safety and skin compatibility in mind.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-full bg-amber-100 p-3 text-amber-600">
              <HeartHandshake size={22}/>
            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Cruelty Free
              </h4>

              <p className="mt-2 text-gray-500">
                Never tested on animals and made with care.
              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default ProductDescription;