import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center text-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em]">
            Glow With Confidence
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-4xl lg:text-6xl">
            Ready To Discover
            <br />
            Your Natural Glow?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-pink-100 sm:text-lg sm:leading-8">
            Start your skincare journey with Pearl Promise. Explore our
            thoughtfully crafted collections and build a routine
            that helps your skin look and feel its best every day.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-pink-600 transition hover:scale-105 sm:px-8 sm:py-4"
            >
              Shop Collection
              <ArrowRight size={20} />
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}