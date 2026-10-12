import { motion } from "framer-motion";
import { quickActions } from "../../data/contactData";
import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >

          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">

            Quick Help

          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">

            How Can We Help?

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">

            Choose a category below to quickly find answers,
            track your order, or contact our support team.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {quickActions.map((action, index) => (

            <motion.div
              key={action.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
            >

              <QuickActionCard {...action} />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}