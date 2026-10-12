import { motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Leaf,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders above ₹499.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return and replacement.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Dermatologist Tested",
    description: "Safe and suitable for everyday skincare.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "100% secure checkout with trusted payment partners.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Leaf,
    title: "Cruelty Free",
    description: "Never tested on animals and made with care.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Our skincare experts are here whenever you need help.",
    color: "bg-amber-100 text-amber-600",
  },
];

function DeliveryInfo() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-rose-50 rounded-4xl">

      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          Shop With Confidence
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          Delivery & Trust
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Every Pearl Promise order is carefully packed and delivered with
          premium care for the best shopping experience.
        </p>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {features.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all"
            >

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${item.color}`}
              >
                <Icon size={30} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {item.description}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}

export default DeliveryInfo;