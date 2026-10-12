import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Droplets,
  HeartHandshake,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <Leaf size={36} />,
    title: "Natural Ingredients",
    description:
      "Carefully selected ingredients inspired by nature for healthier skin.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: <Droplets size={36} />,
    title: "Deep Hydration",
    description:
      "Products that lock in moisture and keep your skin soft all day.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: <Sparkles size={36} />,
    title: "Effective Formulas",
    description:
      "Scientifically inspired skincare designed for visible results.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: <HeartHandshake size={36} />,
    title: "Cruelty-Free",
    description:
      "We never test our products on animals and believe in ethical beauty.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Trusted Quality",
    description:
      "Every Pearl Promise product is made with quality and care in mind.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: <BadgeCheck size={36} />,
    title: "Skin Friendly",
    description:
      "Suitable for everyday skincare routines and different skin types.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FFF5F8] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 lg:mb-14 text-center">

          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Why Choose Pearl Promise
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Skincare You Can Trust
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base sm:mt-5 sm:text-lg text-gray-600">
            Pearl Promise combines quality ingredients, thoughtful
            formulations, and simple skincare routines to help
            you achieve naturally healthy and radiant skin.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition sm:p-8"
            >

              <div
                className={`mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl sm:text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}