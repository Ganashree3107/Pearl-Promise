import { motion } from "framer-motion";
import { Headset } from "lucide-react";

export default function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white py-20">

      {/* Background Blob */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-5 py-2 shadow-md backdrop-blur-lg">

            <Headset
              size={18}
              className="text-pink-500"
            />

            <span className="text-sm font-semibold tracking-wide text-pink-600">

              Pearl Promise Support

            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-6 text-4xl font-bold text-gray-800 md:text-5xl">

            Contact Us

          </h1>

          {/* Subtitle */}

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">

            Need help with your order, skincare products, or account?
            Search our help center, browse FAQs, or contact our support team.

          </p>

        </motion.div>

      </div>

    </section>
  );
}