import { motion } from "framer-motion";
import {
  Truck,
  Zap,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";

function DeliveryMethod({
  deliveryMethod,
  setDeliveryMethod,
}) {
  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 0,
      days: "3-5 Business Days",
      icon: Truck,
      description: "Free shipping on all orders.",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 99,
      days: "Tomorrow",
      icon: Zap,
      description: "Priority delivery for faster shipping.",
    },
  ];

  const handleSelect = (option) => {
    setDeliveryMethod({
      id: option.id,
      name: option.name,
      price: option.price,
      days: option.days,
      description: option.description,
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Delivery Method
      </h2>

      <div className="space-y-5">
        {deliveryOptions.map((option) => {

          const Icon = option.icon;

          const selected =
            deliveryMethod.name === option.name;

          return (

            <motion.div
              key={option.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer rounded-3xl border-2 p-6 transition-all duration-300 ${
                selected
                  ? "border-pink-500 bg-pink-50 shadow-lg"
                  : "border-pink-100 bg-white hover:border-pink-300"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-5">

                  <div
                    className={`rounded-2xl p-4 ${
                      selected
                        ? "bg-pink-500 text-white"
                        : "bg-pink-100 text-pink-500"
                    }`}
                  >

                    <Icon size={26} />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-gray-900">

                      {option.name}

                    </h3>

                    <p className="mt-2 text-sm text-gray-500">

                      {option.description}

                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">

                      <span className="rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">

                        🚚 Delivery:
                        {" "}
                        {option.days}

                      </span>

                      <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">

                        {option.price === 0
                          ? "FREE"
                          : `₹${option.price}`}

                      </span>

                    </div>

                  </div>

                </div>

                {selected && (

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >

                    <CheckCircle2
                      size={30}
                      className="text-pink-500"
                    />

                  </motion.div>

                )}

              </div>

            </motion.div>

          );

        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-3xl border border-pink-100 bg-pink-50 p-6"
      >

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h4 className="text-lg font-semibold text-gray-900">
              Selected Delivery
            </h4>

            <p className="mt-1 text-gray-600">
              {deliveryMethod.name}
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <p className="font-semibold text-pink-600">
              {deliveryMethod.days}
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Shipping Charge
            </p>

            <p className="font-semibold text-green-600">

              {deliveryMethod.price === 0
                ? "FREE"
                : `₹${deliveryMethod.price}`}

            </p>

          </div>

        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-2xl bg-blue-50 p-5"
      >

        <p className="text-center text-sm leading-6 text-gray-600">

          📦 Orders are carefully packed and shipped with
          premium protection to ensure your Pearl Promise products
          arrive safely and in perfect condition.

        </p>

      </motion.div>

    </motion.div>

  );

}

export default DeliveryMethod;