import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    icon: <Heart size={38} />,
    title: "Self-Care",
    description:
      "We believe skincare is an act of self-love that builds confidence and promotes healthy daily habits.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: <Leaf size={38} />,
    title: "Nature Inspired",
    description:
      "Our products are thoughtfully crafted with carefully selected ingredients inspired by nature.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: <Sparkles size={38} />,
    title: "Innovation",
    description:
      "We continuously improve our skincare formulas to deliver effective and enjoyable experiences.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: <ShieldCheck size={38} />,
    title: "Trust & Quality",
    description:
      "Quality, transparency, and customer satisfaction remain at the heart of everything we create.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export default function Values() {
  return (
    <section className="bg-[#FFF5F8] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 lg:mb-14 text-center">

          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Our Values
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            The Heart of Pearl Promise
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base sm:mt-5 sm:text-lg text-gray-600">
            Every Pearl Promise product is created with values that
            inspire confidence, simplicity, and healthier skin.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {values.map((value, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl bg-white p-6 text-center shadow-md sm:p-8"
            >

              <div
                className={`mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full ${value.bg} ${value.color}`}
              >
                {value.icon}
              </div>

              <h3 className="mb-3 text-xl sm:text-2xl font-semibold">
                {value.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {value.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}