import { motion } from "framer-motion";
import {
  Star,
  Truck,
  CheckCircle2,
  Check,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import {useCart} from "../../context/CartContext"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { getProductDiscount, toPriceNumber } from "../../utils/pricing";


function ProductInfo({ product }) {
  const {addToCart, isInCart} =useCart();
  const { isAuthenticated } = useAuth();
    const navigate=useNavigate();
  const discount = getProductDiscount(product);
  const originalPrice = toPriceNumber(
    product.originalPrice ?? product.original_price
  );
  const [optimisticallyAdded, setOptimisticallyAdded] = useState(false);
  const maxQuantity = Math.min(
    Number.isInteger(product.stock) && product.stock > 0 ? product.stock : 20,
    20
  );
  const [quantity, setQuantity] = useState(1);
  const added = isInCart(product.id) || optimisticallyAdded;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/product/${product.slug}` } } });
      return;
    }

    setOptimisticallyAdded(true);
    try {
      await addToCart(product, quantity);
    } catch {
      setOptimisticallyAdded(false);
      navigate("/login", { state: { from: { pathname: `/product/${product.slug}` } } });
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/product/${product.slug}` } } });
      return;
    }

    navigate("/checkout", {
      state: { buyNowProduct: { ...product, quantity: 1 } },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8"
    >

      {/* Badge */}

      {product.badge && (
        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-semibold
          ${
            product.badge === "Best Seller"
              ? "bg-amber-100 text-amber-700"
              : product.badge === "Trending"
              ? "bg-pink-100 text-pink-600"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Rating */}

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-1">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold text-gray-900">
            {product.rating}
          </span>

        </div>

        <span className="text-gray-400">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Product Name */}

      <div>

        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          {product.name}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-500">
          {product.description}
        </p>

      </div>

      {/* Price */}

      <div className="space-y-3">

        <div className="flex items-center gap-4">

          <span className="text-5xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          {discount !== null && originalPrice !== null && (
            <>
              <span className="text-2xl text-gray-400 line-through">
                ₹{originalPrice}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle2
            size={18}
            className="text-green-500"
          />

          <span className="font-medium text-green-600">
            In Stock
          </span>

        </div>

        <div className="flex items-center gap-3 text-gray-500">

          <Truck size={18} />

          <span>
            Free Delivery by Tomorrow
          </span>

        </div>

      </div>

      <div className="border-b border-pink-100"></div>
      {/* Size */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-gray-900">
          Size
        </h3>

        <div className="inline-flex rounded-2xl border border-pink-200 bg-pink-50 px-6 py-3 font-semibold text-pink-600">
          {product.size}
        </div>

      </div>

      <div className="border-b border-pink-100"></div>

      {/* Skin Type */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-gray-900">
          Best For Skin Type
        </h3>

        <div className="flex flex-wrap gap-3">

          {product.skinType.map((type, index) => (

            <span
              key={index}
              className="rounded-full bg-sky-50 border border-sky-200 px-5 py-2 text-sm font-medium text-sky-700"
            >
              💧 {type}
            </span>

          ))}

        </div>

      </div>

      <div className="border-b border-pink-100"></div>

      {/* Skin Concern */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-gray-900">
          Targets
        </h3>

        <div className="flex flex-wrap gap-3">

          {product.concern.map((item, index) => (

            <span
              key={index}
              className="rounded-full bg-rose-50 border border-rose-200 px-5 py-2 text-sm font-medium text-rose-600"
            >
              ✨ {item}
            </span>

          ))}

        </div>

      </div>

      <div className="border-b border-pink-100"></div>


      {/* Add to Cart & Buy Now */}

    <div className="flex flex-wrap items-center gap-4">
      <label htmlFor="product-quantity" className="font-semibold text-gray-700">
        Quantity
      </label>
      <div className="inline-flex h-12 items-center rounded-xl border border-pink-200 bg-white">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          disabled={quantity <= 1 || added}
          className="flex h-full w-12 items-center justify-center rounded-l-xl text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:text-gray-300"
          aria-label="Decrease quantity"
        >
          <Minus size={18} />
        </button>
        <input
          id="product-quantity"
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          disabled={added}
          onChange={(event) => {
            const nextQuantity = Number(event.target.value);
            if (Number.isInteger(nextQuantity)) {
              setQuantity(Math.min(maxQuantity, Math.max(1, nextQuantity)));
            }
          }}
          className="w-12 appearance-none border-0 bg-transparent text-center font-semibold text-gray-900 outline-none disabled:text-gray-400"
          aria-label="Product quantity"
        />
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
          disabled={quantity >= maxQuantity || added}
          className="flex h-full w-12 items-center justify-center rounded-r-xl text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:text-gray-300"
          aria-label="Increase quantity"
        >
          <Plus size={18} />
        </button>
      </div>
      <span className="text-sm text-gray-500">Up to {maxQuantity} per order</span>
    </div>

    <div className="grid grid-cols-2 gap-4">

<motion.button
  onClick={handleAddToCart}
  disabled={added}
  whileHover={added ? undefined : { y: -3, scale: 1.02 }}
  whileTap={added ? undefined : { scale: 0.97 }}
  className={`add-to-cart-button rounded-2xl py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(236,72,153,0.28)] ${
    added ? "bg-green-500 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
  }`}
>
  <motion.span
    key={added ? "added" : "cart"}
    initial={{ opacity: 0, y: 5, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="inline-flex items-center justify-center gap-2"
  >
    {added ? <Check size={20} /> : <ShoppingCart size={20} />}
    {added ? "Added" : "Add to Cart"}
  </motion.span>
</motion.button>
  <button onClick={handleBuyNow}
    className="rounded-2xl border-2 border-pink-500 bg-white py-4 text-lg font-semibold text-pink-600 transition hover:bg-pink-50"
  >
    ⚡ Buy Now
  </button>

</div>

      <div className="rounded-3xl border border-pink-100 bg-pink-50 p-6">

        <h3 className="mb-5 text-lg font-semibold text-gray-900">
          Why You'll Love It
        </h3>

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={20}
              className="text-green-500"
            />

            <span className="text-gray-700">
              Dermatologist Tested
            </span>

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={20}
              className="text-green-500"
            />

            <span className="text-gray-700">
              Cruelty Free
            </span>

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={20}
              className="text-green-500"
            />

            <span className="text-gray-700">
              Secure Checkout
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Truck
              size={20}
              className="text-pink-500"
            />

            <span className="text-gray-700">
              Free Shipping on Orders Above ₹499
            </span>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductInfo;