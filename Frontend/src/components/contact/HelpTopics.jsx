import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { helpTopics } from "../../data/contactData";
import toast from "react-hot-toast";

export default function HelpTopics() {
  const handleClick = (title) => {
    toast.success(`${title} articles will be available soon.`);
  };

  return (
    <section
      id="help-topics"
      className="bg-orange-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            Help Topics
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">
            Browse Support Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Explore helpful topics to find quick answers about your
            orders, payments, products, and account.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {helpTopics.map((topic, index) => {
            const Icon = topic.icon;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                onClick={() => handleClick(topic.title)}
                className="group cursor-pointer rounded-3xl border border-pink-100 bg-white p-7 shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100">

                  <Icon
                    size={30}
                    className="text-pink-600"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-800">
                  {topic.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {topic.description}
                </p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-pink-600 transition-all group-hover:gap-3">

                  Learn More

                  <ArrowRight size={18} />

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}