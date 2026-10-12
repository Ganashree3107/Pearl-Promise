import { motion } from "framer-motion";
import {
  Sparkles,
  Droplets,
  Hand,
  Smile,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Cleanse",
    description:
      "Start with a clean face by washing away dirt, oil and impurities.",
    icon: Droplets,
    color: "bg-sky-100 text-sky-600",
  },
  {
    number: "02",
    title: "Apply",
    description:
      "Take a small amount of product and apply evenly to your skin.",
    icon: Sparkles,
    color: "bg-pink-100 text-pink-600",
  },
  {
    number: "03",
    title: "Massage",
    description:
      "Massage gently using upward circular motions until absorbed.",
    icon: Hand,
    color: "bg-amber-100 text-amber-600",
  },
  {
    number: "04",
    title: "Glow",
    description:
      "Finish your routine and enjoy soft, healthy and glowing skin.",
    icon: Smile,
    color: "bg-green-100 text-green-600",
  },
];

function HowToUse() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-rose-50 rounded-4xl">

      {/* Heading */}

      <div className="text-center mb-16">

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          Simple Routine
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          How To Use
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Follow these simple steps to get the best results from your
          Pearl Promise skincare routine.
        </p>

      </div>

      {/* Steps */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (

            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="relative rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-8 shadow-sm hover:shadow-xl transition-all"
            >

              {/* Step Number */}

              <div className="absolute right-5 top-5 text-5xl font-bold text-pink-100">
                {step.number}
              </div>

              {/* Icon */}

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${step.color} `}
              >
                <Icon size={30} />
              </div>

              {/* Title */}

              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}

              <p className="mt-4 leading-7 text-gray-500">
                {step.description}
              </p>

            </motion.div>

          );

        })}
      
      </div>

    </section>
  );
}

export default HowToUse;