import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PolicyHeader({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white py-24">

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .5 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100"
        >
          <ShieldCheck
            size={30}
            className="text-pink-600"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1 }}
          className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600"
        >
          {subtitle}
        </motion.p>

      </div>

    </section>
  );
}