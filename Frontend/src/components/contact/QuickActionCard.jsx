import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
  target,
}) {
  const handleClick = () => {
    const section = document.getElementById(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Icon */}

      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `${color}15`,
        }}
      >
        <Icon
          size={30}
          style={{
            color,
          }}
        />
      </div>

      {/* Title */}

      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-3 text-gray-600 leading-7">
        {description}
      </p>

      {/* Button */}

      <div
        className="mt-6 inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3"
        style={{
          color,
        }}
      >
        Explore

        <ArrowRight size={18} />
      </div>
    </motion.div>
  );
}