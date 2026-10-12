import { motion } from "framer-motion";
import {
  PackageCheck,
  Users,
  Star,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: <PackageCheck size={40} />,
    number: "20+",
    title: "Premium Products",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: <Users size={40} />,
    number: "10K+",
    title: "Happy Customers",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: <Star size={40} />,
    number: "98%",
    title: "Positive Reviews",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: <ShieldCheck size={40} />,
    number: "100%",
    title: "Cruelty-Free",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

export default function Statistics() {
  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 lg:mb-14 text-center">

          <p className="font-semibold uppercase tracking-widest text-pink-600">
            Pearl Promise By Numbers
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Trusted Every Day
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600 sm:mt-5 sm:text-lg">
            Every product we create reflects our commitment to
            quality, innovation, and customer satisfaction.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.04,
              }}
              className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-lg sm:p-8"
            >

              <div
                className={`mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                {item.number}
              </h3>

              <p className="mt-3 text-base font-medium text-gray-600 sm:text-lg sm:mt-4">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}