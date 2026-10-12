// import { useState } from "react";
// import { Heart, ZoomIn } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// function ImageGallery({ product }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [wishlist, setWishlist] = useState(false);

//   return (
//     <div className="flex flex-col lg:flex-row gap-6">

//       {/* ========================= */}
//       {/* Thumbnail Images */}
//       {/* ========================= */}

//       <div className="order-2 lg:order-1 flex lg:flex-col gap-4 justify-center">

//         {product.images.map((image, index) => (

//           <button
//             key={index}
//             onClick={() => setSelectedImage(index)}
//             className={`h-24 w-24 overflow-hidden rounded-2xl border-2 transition-all duration-300

//             ${
//               selectedImage === index
//                 ? "border-pink-500 shadow-lg"
//                 : "border-pink-100 hover:border-pink-300"
//             }
//             `}
//           >

//             <img
//               src={image}
//               alt={product.name}
//               className="h-full w-full object-contain p-2"
//             />

//           </button>

//         ))}

//       </div>

//       {/* ========================= */}
//       {/* Main Image */}
//       {/* ========================= */}

//       <div
//         className="relative flex-1 overflow-hidden rounded-[32px] shadow-xl"
//         style={{
//           backgroundColor: product.bgColor,
//         }}
//       >
//         {/* Badge */}

//         {product.badge && (
//           <div className="absolute left-6 top-6 z-20">
//             <span
//               className={`rounded-full px-4 py-2 text-xs font-semibold shadow-lg
//               ${
//                 product.badge === "Best Seller"
//                   ? "bg-amber-100 text-amber-700"
//                   : product.badge === "Trending"
//                   ? "bg-pink-100 text-pink-600"
//                   : "bg-purple-100 text-purple-700"
//               }`}
//             >
//               {product.badge}
//             </span>
//           </div>
//         )}

//         {/* Wishlist */}

//         <button
//           onClick={() => setWishlist(!wishlist)}
//           className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition-all duration-300 hover:scale-110"
//         >
//           <Heart
//             size={22}
//             className={`transition-all duration-300 ${
//               wishlist
//                 ? "fill-pink-500 text-pink-500"
//                 : "text-gray-500"
//             }`}
//           />
//         </button>

//         {/* Zoom Button */}

//         <button
//           className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition hover:scale-110"
//         >
//           <ZoomIn
//             size={20}
//             className="text-gray-700"
//           />
//         </button>

//         {/* Main Product Image */}

//         <div className="flex h-[550px] items-center justify-center p-10">

//           <AnimatePresence mode="wait">

//             <motion.img
//               key={selectedImage}
//               src={product.images[selectedImage]}
//               alt={product.name}
//               initial={{
//                 opacity: 0,
//                 scale: 0.9,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.9,
//                 x: -30,
//               }}
//               transition={{
//                 duration: 0.35,
//               }}
//               whileHover={{
//                 scale: 1.08,
//               }}
//               className="max-h-full max-w-full object-contain cursor-zoom-in"
//             />

//           </AnimatePresence>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default ImageGallery;



import { useEffect, useState } from "react";
import { Heart, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext";
import SafeImage from "../common/SafeImage";

function ImageGallery({ product }) {

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [product.slug]);

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const liked = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {

    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }

  };

  return (

    <div className="space-y-8">

      {/* ================= Gallery ================= */}

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ================= Thumbnails ================= */}

        <div className="order-2 lg:order-1 flex lg:flex-col gap-4 justify-center">

          {(product.images || []).map((image, index) => (

            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-24 w-24 overflow-hidden rounded-3xl border-2 transition-all duration-300

              ${
                selectedImage === index
                  ? "border-pink-500 shadow-xl"
                  : "border-pink-100 hover:border-pink-300"
              }

              `}
            >

              <SafeImage
                src={image}
                alt={product.name}
                className="h-full w-full object-contain p-2"
              />

            </button>

          ))}

        </div>

        {/* ================= Main Image ================= */}

        <div
          className="relative flex-1 overflow-hidden rounded-[36px] shadow-2xl"
          style={{
            backgroundColor: product.bgColor,
          }}
        >

          {/* Badge */}

          {product.badge && (

            <div className="absolute left-6 top-6 z-20">

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold shadow-lg

                ${
                  product.badge === "Best Seller"
                    ? "bg-amber-100 text-amber-700"
                    : product.badge === "Trending"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-purple-100 text-purple-700"
                }

                `}
              >

                {product.badge}

              </span>

            </div>

          )}

          {/* Wishlist */}

          <button
            onClick={handleWishlist}
            className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition duration-300 hover:scale-110"
          >

            <Heart
              size={22}
              className={`transition

              ${
                liked
                  ? "fill-pink-500 text-pink-500"
                  : "text-gray-500 hover:text-pink-500"
              }

              `}
            />

          </button>

          {/* Zoom */}

          <button
            className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition hover:scale-110"
          >

            <ZoomIn
              size={20}
              className="text-gray-700"
            />

          </button>

          {/* Main Product Image */}

          <div className="flex min-h-[620px] items-center justify-center p-10">

            <AnimatePresence mode="wait">

              <motion.img
                key={selectedImage}
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  x: -30,
                }}
                transition={{
                  duration: 0.35,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                className="max-h-[520px] w-auto object-contain cursor-zoom-in"
                onError={(event) => {
                  event.currentTarget.src = "/images/logo/PearlPromise-logo.png";
                }}
              />

            </AnimatePresence>

          </div>

        </div>

      </div>
      {/* ================= Product Highlights ================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Ingredients */}

        <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">

          <h3 className="text-2xl font-bold text-gray-900">
            Key Ingredients
          </h3>

          <div className="mt-6 space-y-4">

            {product.ingredients?.slice(0, 4).map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl bg-pink-50 p-4"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  🌿
                </div>

                <div>

                  <h4 className="font-semibold text-gray-900">
                    {item}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Helps improve skin health naturally.
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Why You'll Love It */}

        <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">

          <h3 className="text-2xl font-bold text-gray-900">
            Why You'll Love It
          </h3>

          <div className="mt-6 space-y-5">

            <div className="flex gap-4">

              <div className="text-3xl">
                💧
              </div>

              <div>

                <h4 className="font-semibold">
                  Deep Hydration
                </h4>

                <p className="mt-1 text-gray-500">
                  Keeps skin soft and hydrated throughout the day.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="text-3xl">
                ✨
              </div>

              <div>

                <h4 className="font-semibold">
                  Healthy Glow
                </h4>

                <p className="mt-1 text-gray-500">
                  Improves dullness and enhances natural radiance.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="text-3xl">
                🩺
              </div>

              <div>

                <h4 className="font-semibold">
                  Dermatologist Tested
                </h4>

                <p className="mt-1 text-gray-500">
                  Suitable for everyday skincare routine.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Texture & Usage ================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Texture */}

        <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-6">

          <h3 className="text-xl font-bold text-gray-900">
            Texture
          </h3>

          <p className="mt-4 leading-8 text-gray-600">

            Lightweight, fast-absorbing and non-sticky formula
            that blends effortlessly into the skin without
            leaving a greasy finish.

          </p>

        </div>

        {/* How To Use */}

        <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-6">

          <h3 className="text-xl font-bold text-gray-900">
            How To Use
          </h3>

          <ol className="mt-4 space-y-4 text-gray-600">

            <li>1. Cleanse your face thoroughly.</li>

            <li>2. Apply the product evenly.</li>

            <li>3. Massage gently until absorbed.</li>

            <li>4. Follow with moisturizer or sunscreen if needed.</li>

          </ol>

        </div>

      </div>

      {/* ================= Premium Promise ================= */}

      <div className="mt-12 flex justify-center">
  <div className="w-full max-w-5xl rounded-[32px] border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-rose-50 p-8 shadow-sm">

        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div>

            <div className="text-4xl">
              🌿
            </div>

            <h4 className="mt-4 font-semibold text-gray-900">
              Natural Ingredients
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Skin-loving botanical extracts.
            </p>

          </div>

          <div>

            <div className="text-4xl">
              🩺
            </div>

            <h4 className="mt-4 font-semibold text-gray-900">
              Dermatologist Tested
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Gentle and safe for daily use.
            </p>

          </div>

          <div>

            <div className="text-4xl">
              🐰
            </div>

            <h4 className="mt-4 font-semibold text-gray-900">
              Cruelty Free
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Never tested on animals.
            </p>

          </div>

          <div>

            <div className="text-4xl">
              ✨
            </div>

            <h4 className="mt-4 font-semibold text-gray-900">
              Glow Guaranteed
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Designed to reveal healthy glowing skin.
            </p>

          </div>

        </div>
        </div>
      </div>

    </div>

  );

}

export default ImageGallery;
