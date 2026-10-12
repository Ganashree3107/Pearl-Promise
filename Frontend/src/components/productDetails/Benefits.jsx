import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Sparkles,
  Heart,
  Leaf,
} from "lucide-react";

const benefitIcons = {
  "Repairs skin barrier": {
    icon: ShieldCheck,
    color: "bg-amber-100 text-amber-600",
    desc: "Strengthens and protects your skin barrier.",
  },

  "Deep hydration": {
    icon: Droplets,
    color: "bg-sky-100 text-sky-600",
    desc: "Keeps your skin hydrated all day long.",
  },

  "Healthy glow": {
    icon: Sparkles,
    color: "bg-pink-100 text-pink-600",
    desc: "Reveals naturally radiant and glowing skin.",
  },

  "Soft skin": {
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
    desc: "Leaves your skin silky smooth and nourished.",
  },

  "Bright skin": {
    icon: Sparkles,
    color: "bg-orange-100 text-orange-600",
    desc: "Improves brightness and enhances radiance.",
  },

  "Even tone": {
    icon: Sparkles,
    color: "bg-yellow-100 text-yellow-600",
    desc: "Helps improve uneven skin tone.",
  },

  "Reduces pigmentation": {
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    desc: "Targets dark spots and pigmentation.",
  },

  "Oil control": {
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600",
    desc: "Controls excess oil without drying skin.",
  },

  default: {
    icon: Leaf,
    color: "bg-pink-100 text-pink-600",
    desc: "Designed to keep your skin healthy and beautiful.",
  },
};

function Benefits({ product }) {
  return (
    <section className="max-w-7xl mx-auto w-full rounded-3xl px-6 py-20 bg-gradient-to-b from-pink-100 to-pink-50 ">

      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          Why You'll Love It
        </p>

        <h2 className="text-4xl font-bold mt-3 text-gray-900">
          Product Benefits
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Experience visible results with carefully formulated skincare
          designed to nourish, protect and enhance your natural glow.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {product.benefits.map((benefit, index) => {

          const data =
            benefitIcons[benefit] || benefitIcons.default;

          const Icon = data.icon;

          return (

            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${data.color}`}
              >
                <Icon size={30} />
              </div>

              <h3 className="mt-6 text-center text-xl font-semibold text-gray-900">
                {benefit}
              </h3>

              <p className="mt-3 text-center text-sm leading-6 text-gray-500">
                {data.desc}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}

export default Benefits;