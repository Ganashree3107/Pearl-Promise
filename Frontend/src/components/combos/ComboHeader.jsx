import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function ComboHeader({ title, total }) {
  return (
    <section className="border-b border-pink-100 bg-gradient-to-b from-pink-50 via-white to-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500"
        >
          <Link
            to="/"
            className="transition hover:text-pink-500"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <span className="font-medium text-pink-500">
            Combos
          </span>
        </motion.div>

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>

            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">

              <Sparkles
                size={32}
                className="text-pink-500"
              />

              {title}

            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-7 text-gray-500">
              Discover carefully curated skincare combinations
              designed to simplify your routine and maximize results.
            </p>

          </div>

          {/* Count */}

          <div className="mt-6 w-fit rounded-2xl border border-pink-100 bg-white px-6 py-4 shadow-sm md:mt-0">

            <p className="text-sm text-gray-500">
              Available Combos
            </p>

            <h2 className="mt-1 text-3xl font-bold text-pink-600">
              {total}
            </h2>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default ComboHeader;