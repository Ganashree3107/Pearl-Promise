import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  Droplets,
} from "lucide-react";
import {Link} from "react-router-dom";

const heroSlides = [
  {
    title: "Hydration That",
    highlight: "Lasts All Day",
    description:
      "Experience lightweight SPF 50+ protection with deep hydration, zero white cast, and all-day comfort for healthy glowing skin.",
    image: "/images/hero/hero-1.png",
    bg: "bg-gradient-to-r from-[#eef6ff] via-[#dbeafe] to-[#93c5fd]",
    accent:"text-blue-600",
    size:"lg:h-[520px]",
    offset:"lg:-translate-x-12",
    slug:"hydrating-sunscreen"
  },

  {
    title: "Repair Your",
    highlight: "Skin Barrier",
    description:
      "Blueberry Repair Serum deeply nourishes, repairs damaged skin and restores your natural glow with antioxidant-rich care.",
    image: "/images/hero/hero-2.png",
    bg: "bg-gradient-to-r from-[#f3e8ff] via-[#ddd6fe] to-[#a78bfa]",
    accent:"text-purple-600",
    size:"lg:h-[480px]",
    offset:"lg:-translate-x-16",
    slug:"blueberry-repair-serum",

  },

  {
    title: "Strengthen With",
    highlight: "Ceramides",
    description:
      "Ceramide Moisturizer delivers lasting hydration while strengthening your skin barrier for soft, healthy skin every day.",
    image: "/images/hero/hero-3.png",
    bg: "bg-gradient-to-r from-[#fff8ef] via-[#f7ead6] to-[#efd3a4]",
    accent:"text-amber-600",
    size:"lg:h-[420px]",
    offset:"lg:-translate-x-28",
    slug:"ceramide-moisturizer",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, paused]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative overflow-hidden transition-all duration-700 ${heroSlides[currentSlide].bg}`}
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[750px] w-[550px] -translate-y-1/2 rounded-full bg-white/40 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex max-w-350 flex-col items-center justify-between gap-8 px-4 pt-14 pb-28 sm:px-6 md:px-8 hero-fit-screen lg:flex-row lg:gap-6 lg:px-12 lg:py-14">

        {/* LEFT CONTENT */}

        <AnimatePresence mode="wait">

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-flex items-center rounded-full bg-white/70 px-5 py-2 text-sm font-medium text-gray-700 backdrop-blur-md shadow-md">

              ✨ Powered by Pearl Promise

            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">

              {heroSlides[currentSlide].title}

              <br />

              <span className="text-pink-500">

                {heroSlides[currentSlide].highlight}

              </span>

            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-700 sm:text-lg sm:leading-8 lg:text-xl">

              {heroSlides[currentSlide].description}

            </p>

            <div className="mt-10 flex flex-wrap gap-5">
  <Link
    to={`/product/${heroSlides[currentSlide].slug}`}
    className="rounded-full bg-pink-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
  >
    Shop Now
  </Link>

  <button
    onClick={() => {
      document
        .getElementById("why-choose")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
    className="rounded-full border-2 border-pink-500 px-8 py-4 font-semibold text-pink-600 transition-all duration-300 hover:bg-pink-50"
  >
    Learn More
  </button>
</div>

            <div className="mt-12 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow">

                <Leaf size={18} />

                Natural Ingredients

              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow">

                <ShieldCheck size={18} />

                Dermatologist Tested

              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow">

                <Sparkles size={18} />

                Cruelty Free

              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow">

                <Droplets size={18} />

                All Skin Types

              </div>

            </div>

          </motion.div>

        </AnimatePresence>
        {/* RIGHT IMAGE */}

        <div className="relative flex w-full items-center justify-center lg:flex-1 lg:justify-end">

          <AnimatePresence mode="wait">

            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{
                duration: 0.7,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className={`h-56 max-w-full w-auto object-contain drop-shadow-2xl sm:h-72 md:h-80 lg:max-w-none ${heroSlides[currentSlide].size} lg:translate-x-10`}
            />

          </AnimatePresence>

        </div>

      </div>

      {/* Previous Arrow */}

      <button
        onClick={prevSlide}
        className="absolute z-20 left-4 bottom-5 rounded-full bg-white/70 p-2 shadow-lg sm:left-6 sm:p-3 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 backdrop-blur-md transition-all duration-300 hover:bg-pink-500 hover:text-white"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Arrow */}

      <button
        onClick={nextSlide}
        className="absolute z-20 right-4 bottom-5 rounded-full bg-white/70 p-2 shadow-lg sm:right-6 sm:p-3 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 backdrop-blur-md transition-all duration-300 hover:bg-pink-500 hover:text-white"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Dots */}

      <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 gap-3 sm:bottom-10 lg:bottom-8">

        {heroSlides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "h-2 w-10 bg-pink-500"
                : "h-2 w-2 bg-gray-400 hover:bg-pink-300"
            }`}
          />

        ))}

      </div>

    </section>
  );
}

export default Hero;