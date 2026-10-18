import { motion } from "framer-motion";
import {
  Leaf,
  FlaskConical,
  Rabbit,
  Droplets,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "Plant-powered ingredients carefully selected to nourish and protect your skin naturally.",
  },

  {
    icon: FlaskConical,
    title: "Science-Backed",
    description:
      "Every formula is developed using effective ingredients backed by skincare research.",
  },

  {
    icon: Rabbit,
    title: "Cruelty Free",
    description:
      "Never tested on animals because beautiful skin should never come at their expense.",
  },

  {
    icon: Droplets,
    title: "All Skin Types",
    description:
      "Suitable for dry, oily, combination and sensitive skin with gentle formulations.",
  },
];

function WhyPearlPromise() {
  return (
    <section id="why-choose" className="relative bg-gradient-to-b from-white via-pink-50 to-white py-20">
      <div className="absolute inset-0 bg-pink-100/20 blur-3xl"></div>
      <div className="relative mx-auto max-w-7xl px-6">
     
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold tracking-wide text-pink-600">
            ✨ WHY TO CHOOSE PEARL PROMISE
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-center text-4xl font-bold text-gray-900 lg:text-5xl"
        >
          Skincare That Truly
          <br />
          Cares For Your Skin.
        </motion.h2>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600"
        >
          Every Pearl Promise product is thoughtfully crafted using
          nature-inspired ingredients and science-backed
          formulations to deliver healthy, radiant skin you
          can trust.
        </motion.p>

        {/* Cards */}

        <div className="mt-20 mx-auto max-w-7xl ">
            <div className="grid gap-8 lg:grid-cols-4">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                // whileHover={{
                //   y: -10,
                // }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-2xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 transition-all duration-300 group-hover:bg-pink-500">

                  <Icon
                    size={30}
                    className="text-pink-500 transition-all duration-300 group-hover:text-white"
                  />

                </div>

                <h3 className="text-xl font-semibold text-gray-900">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-gray-600">

                  {feature.description}

                </p>

              </motion.div>

            );

          })}

        </div>
        </div>
      </div>
    </section>
  );
}

export default WhyPearlPromise;