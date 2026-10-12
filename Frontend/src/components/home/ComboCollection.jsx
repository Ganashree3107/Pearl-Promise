import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SafeImage from "../common/SafeImage";

const comboCategories = [
  {
    id: 1,
    title: "Pearl Promise Duo Collection",
    subtitle:
      "Perfect skincare pairs designed for quick, effective daily routines.",
    image: "/images/combos/two-product/glow-protect-duo.jpeg",
    products: "2 Products",
    link: "/combos/duos",
  },
  {
    id: 2,
    title: "Pearl Promise Trio Collection",
    subtitle:
      "Balanced skincare routines curated to cleanse, treat and protect.",
    image: "/images/combos/three-product/vitamin-c-glow-trio.jpeg",
    products: "3 Products",
    link: "/combos/trios",
  },
  {
    id: 3,
    title: "Pearl Promise Complete Kits",
    subtitle:
      "Complete skincare rituals with maximum value for healthy glowing skin.",
    image: "/images/combos/four-product/brightening-glow-kit.jpeg",
    products: "4 Products",
    link: "/combos/kits",
  },
];

function ComboCollection() {
  return (
    <section className="bg-gradient-to-b from-white via-pink-50/30 to-white py-24 px-6">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">

            ✨ Curated Skincare Bundles

          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">

            Pearl Promise Combo Collection

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">

            Discover skincare bundles carefully crafted to work beautifully
            together and save more with every routine.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {comboCategories.map((combo, index) => (

            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >

              <Link
                to={combo.link}
                className="block h-full"
              >

                <div className="group h-full overflow-hidden rounded-[34px] border border-pink-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                  {/* Image */}

                  <div className="relative overflow-hidden">

                    <SafeImage
                      src={combo.image}
                      alt={combo.title}
                      className="h-[350px] w-full object-cover object-center transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-pink-600 shadow">

                      {combo.products}

                    </span>

                  </div>

                  {/* Content */}

                  <div className="flex h-[220px] flex-col justify-between p-7">

                    <div>

                      <h3 className="text-2xl font-bold text-gray-900">

                        {combo.title}

                      </h3>

                      <p className="mt-3 leading-7 text-gray-500">

                        {combo.subtitle}

                      </p>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="font-semibold text-pink-600">

                        Explore Collection

                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-white transition duration-300 group-hover:translate-x-2">

                        <ArrowRight size={18} />

                      </div>

                    </div>

                  </div>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ComboCollection;