import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProductBadge from "./ProductBadge";
import WishlistButton from "./WishlistButton";
import ImageSlider from "./ImageSlider";
import ProductRating from "./ProductRating";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const {addToWishlist} =useWishlist();
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`}>

        <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

          {/* Badge */}
          <ProductBadge badge={product.badge} />

          {/* Wishlist */}
          <WishlistButton product={product}/>

          {/* Images */}
          <ImageSlider
            images={product.images}
            productName={product.name}
            bgColor={product.bgColor}
          />

          {/* Content */}
          <div className="p-6">

            {/* Category */}
            <p className="text-xs uppercase tracking-[3px] text-pink-500">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="mt-2 text-xl font-semibold text-gray-900">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <ProductRating
              rating={product.rating}
              reviews={product.reviews}
            />

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">

              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>

              <span className="text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>

            </div>

            {/* Button */}
            <div className="mt-6">

              <span className="inline-flex items-center gap-2 font-medium text-pink-600 transition-all duration-300 group-hover:gap-3">

                View Product

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </span>

            </div>

          </div>

        </div>

      </Link>
    </motion.div>
  );
}

export default ProductCard;