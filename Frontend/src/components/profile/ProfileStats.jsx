import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useOrder } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { reviewApi } from "../../services/api";

function ProfileStats() {
  const { orders } = useOrder();
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    let active = true;
    reviewApi.myCount()
      .then((result) => {
        if (active) setReviewCount(result.count);
      })
      .catch(() => {
        if (active) setReviewCount(0);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    {
      id: 1,
      title: "Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      id: 2,
      title: "Wishlist",
      value: wishlist.length,
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      id: 3,
      title: "Cart",
      value: cartCount,
      icon: ShoppingCart,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      id: 4,
      title: "Reviews",
      value: reviewCount,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
            >
              <Icon
                size={28}
                className={item.color}
              />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              {item.value}
            </h2>

            <p className="mt-2 text-gray-500">
              {item.title}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ProfileStats;