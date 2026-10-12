import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#f9dce5] via-[#f6e6ef] to-[#efe4ff] border-t border-pink-200 shadow-[0_-20px_60px_rgba(236,72,153,0.08)]">
    
      {/* Background Glow */}

       <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

       <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />

      {/* Background Blur */}

      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-5">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* ---------------- Brand ---------------- */}

          <motion.div
            initial={{ opacity:0, y:25 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:.5 }}
            className="lg:col-span-2"
          >

            <Link to="/">
              <div className="rounded-2xl inline-block p-2">
              <img
              src="/images/logo/PearlPromise-logo.png"
                alt="Pearl Promise Logo"
                className="h-30 w-auto"/>
                </div>
            </Link>

            <p className="mt-5 leading-8 text-gray-600 max-w-md">

              Discover skincare inspired by nature,
              powered by gentle ingredients,
              and crafted to reveal your healthiest glow.

            </p>

            {/* Contact */}

            <div className="mt-6 space-y-4">

              <div className="flex items-center gap-3">

                <Mail className="text-pink-500" size={20} />

                <a
                  href="mailto:support@Pearl Promise.com"
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  support@Pearl Promise.com
                </a>

              </div>

              <div className="flex items-center gap-3">

                <MapPin className="text-pink-500" size={20} />

                <p className="text-gray-600">

                  Bengaluru, Karnataka, India

                </p>

              </div>

            </div>

          </motion.div>

          {/* ---------------- Shop ---------------- */}

         <div>
  <h3 className="font-bold mb-6 text-xl">Shop</h3>

  <ul className="space-y-3">
    <li>
      <Link to="/shop" className="hover:text-pink-500 transition">
        Shop All
      </Link>
    </li>

    <li>
      <Link to="/combos/duos" className="hover:text-pink-500 transition">
        Duos
      </Link>
    </li>

    <li>
      <Link to="/combos/trios" className="hover:text-pink-500 transition">
        Trios
      </Link>
    </li>

    <li>
      <Link to="/combos/kits" className="hover:text-pink-500 transition">
        Complete Kits
      </Link>
    </li>
  </ul>
</div>

          {/* ---------------- Company ---------------- */}

          <div>

            <h3 className="font-bold text-xl mb-6">

              Company

            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>
          {/* ---------------- Why Shop ---------------- */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Why Shop With Pearl Promise
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Truck
                  size={20}
                  className="text-pink-500"
                />

                <span className="text-gray-600">
                  Free Shipping on ₹499+
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={20}
                  className="text-pink-500"
                />

                <span className="text-gray-600">
                  100% Secure Payments
                </span>

              </div>

              <div className="flex items-center gap-3">

                <RotateCcw
                  size={20}
                  className="text-pink-500"
                />

                <span className="text-gray-600">
                  Easy Returns
                </span>

              </div>

            </div>

            {/* Payment */}

            <div className="mt-10">

              <h4 className="font-semibold text-lg mb-4">

                Safe & Secure Checkout

              </h4>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-white shadow px-4 py-2 text-sm">
                  Visa
                </span>

                <span className="rounded-full bg-white shadow px-4 py-2 text-sm">
                  Mastercard
                </span>

                <span className="rounded-full bg-white shadow px-4 py-2 text-sm">
                  RuPay
                </span>

                <span className="rounded-full bg-white shadow px-4 py-2 text-sm">
                  UPI
                </span>

              </div>

            </div>

            {/* Social */}

            <div className="mt-10">

              <h4 className="font-semibold text-lg mb-4">

                Follow Us

              </h4>

              <div className="flex gap-4">

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white/70 backdrop-blur-md shadow flex items-center justify-center text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook size={20} />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white/70 backdrop-blur-md shadow flex items-center justify-center text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram size={20} />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white/70 backdrop-blur-md shadow flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaYoutube size={20} />
                </a>

                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white/70 backdrop-blur-md shadow flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaPinterest size={20} />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 border-t border-pink-200 pt-5 items-center gap-4  text-center">

          <p className="text-gray-500 pb-3 text-sm">
    © {new Date().getFullYear()}{" "}
      Pearl Promise
          </p>
          <p className="text-gray-500  text-sm">

            Crafted with care for naturally glowing skin.

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;