import { motion } from "framer-motion";
import { Target, Sparkles } from "lucide-react";

export default function Mission() {
  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 sm:h-20 sm:w-20">
            <Target className="text-pink-600" size={40} />
          </div>

          <p className="font-semibold uppercase tracking-[0.3em] text-pink-600">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Inspiring Confidence
            <br />
            Through Healthy Skin
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            At Pearl Promise, our mission is to make skincare simple,
            effective, and enjoyable for everyone. We create
            thoughtfully formulated products that cleanse,
            nourish, hydrate, and protect your skin while helping
            you build healthy daily skincare habits.
          </p>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg sm:mt-10 sm:p-8">

            <Sparkles
              className="mx-auto mb-4 text-pink-500"
              size={36}
            />

            <p className="text-xl font-semibold italic text-gray-800 sm:text-2xl">
              "Healthy skin isn't about perfection —
              it's about confidence, consistency,
              and caring for yourself every day."
            </p>

            <p className="mt-5 font-medium text-pink-600">
              — Team Pearl Promise 🌸
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}