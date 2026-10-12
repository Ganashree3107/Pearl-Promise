import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Lock,
  HelpCircle,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountMenu({ onChangePassword }) {
  const menuItems = [
    {
      id: 1,
      title: "My Orders",
      subtitle: "Track and manage your orders",
      icon: ShoppingBag,
      color: "text-pink-500",
      bg: "bg-pink-50",
      link: "/orders",
    },
    {
      id: 2,
      title: "Wishlist",
      subtitle: "Your saved skincare products",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
      link: "/wishlist",
    },
    {
      id: 3,
      title: "Change Password",
      subtitle: "Update your account password",
      icon: Lock,
      color: "text-purple-500",
      bg: "bg-purple-50",
      action: "changePassword",
    },
    {
      id: 4,
      title: "Help Center",
      subtitle: "Need help? Contact us",
      icon: HelpCircle,
      color: "text-sky-500",
      bg: "bg-sky-50",
      link: "/contact",
    },
    {
      id: 5,
      title: "Privacy Policy",
      subtitle: "Read our privacy policy",
      icon: Shield,
      color: "text-green-500",
      bg: "bg-green-50",
      link: "/privacy-policy",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-2xl font-bold text-gray-900">
        Account
      </h2>

      <div className="space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const Card = (
            <div className="flex items-center gap-5 rounded-2xl border border-pink-100 p-5 transition-all duration-300 hover:border-pink-300 hover:bg-pink-50">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={24}
                  className={item.color}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>

              <ChevronRight
                size={22}
                className="text-gray-400"
              />
            </div>
          );

          if (item.action === "changePassword") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={onChangePassword}
                className="w-full text-left"
              >
                {Card}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.link}
            >
              {Card}
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}