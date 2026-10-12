import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ingredientsData from "../../data/ingredients";

function Ingredients({ product }) {
  const ingredients = product.ingredients
    .map((name) => ingredientsData[name])
    .filter(Boolean);

  if (ingredients.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}

      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          Powered By Nature
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          Key Ingredients
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500 leading-7">
          Every Pearl Promise formula is enriched with carefully selected
          ingredients that work together to nourish, protect and
          improve your skin.
        </p>

      </div>

      {/* Ingredient Cards */}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {ingredients.map((ingredient, index) => (

          <motion.div
            key={ingredient.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="rounded-[28px] border border-pink-100 bg-white shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
          >

            {/* Top */}

            <div
              className="p-8"
              style={{
                backgroundColor: ingredient.color,
              }}
            >

              <div className="text-6xl">
                {ingredient.icon}
              </div>

            </div>

            {/* Content */}

            <div className="p-8">

              <h3 className="text-2xl font-bold text-gray-900">
                {ingredient.name}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {ingredient.description}
              </p>

              {/* Benefits */}

              <div className="mt-6 space-y-3">

                {ingredient.benefits.map((benefit) => (

                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle
                      size={18}
                      className="text-pink-500"
                    />

                    <span className="text-gray-700">
                      {benefit}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Ingredients;