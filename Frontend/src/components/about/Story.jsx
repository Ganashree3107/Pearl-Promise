import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf } from "lucide-react";

export default function Story() {
  return (
    <section className="bg-[#FFF5F8] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">

          {/* Left Content */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              Our Story
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Skincare Made
              <br />
              Simple & Effective
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              Pearl Promise was created with one simple belief—
              everyone deserves healthy, glowing skin without
              complicated routines. We combine carefully selected
              ingredients with modern skincare to create products
              that cleanse, hydrate, nourish, and protect every
              skin type.
            </p>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              From refreshing face washes to nourishing serums,
              moisturizers, sunscreens, face masks, and lip tints,
              every Pearl Promise product is thoughtfully designed to
              help you feel confident in your own skin every day.
            </p>
          </motion.div>

          {/* Right Cards */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >

            <div className="rounded-3xl border border-pink-100 bg-pink-50 p-6 shadow-sm">
              <Sparkles className="mb-4 text-pink-600" size={34} />
              <h3 className="mb-2 text-xl font-semibold">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To make premium skincare simple, accessible,
                and enjoyable for everyone.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6 shadow-sm">
              <Heart className="mb-4 text-purple-600" size={34} />
              <h3 className="mb-2 text-xl font-semibold">
                Our Promise
              </h3>
              <p className="text-gray-600">
                Every Pearl Promise product is created with care,
                quality, and ingredients your skin will love.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm">
              <Leaf className="mb-4 text-green-600" size={34} />
              <h3 className="mb-2 text-xl font-semibold">
                Our Commitment
              </h3>
              <p className="text-gray-600">
                We are committed to creating skincare that
                supports healthy skin while promoting confidence
                and self-care.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}