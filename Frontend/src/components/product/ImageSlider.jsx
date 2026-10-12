import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ImageSlider({ images = [], productName, bgColor }) {
  const [currentImage, setCurrentImage] = useState(0);
  const safeImages = images.filter(Boolean);

  if (!safeImages.length) {
    return (
      <div
        className="flex h-64 items-center justify-center rounded-2xl text-sm text-gray-400"
        style={{ backgroundColor: bgColor }}
      >
        No image
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#FFF9F8]">

      {/* Product Image */}
      <div className="flex h-72 items-center justify-center rounded-2xl p-4" style={{ backgroundColor: bgColor }}>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={safeImages[currentImage]}
            alt={productName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">

        {safeImages.map((_, index) => (

          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentImage(index);
            }}
            className={`h-2.5 rounded-full transition-all duration-300

            ${
              currentImage === index
                ? "w-6 bg-pink-500"
                : "w-2.5 bg-gray-300 hover:bg-pink-300"
            }`}
          />

        ))}

      </div>

    </div>
  );
}

export default ImageSlider;