import { motion } from "framer-motion";
import { Phone, Mail, Clock, Copy, CheckCircle2 } from "lucide-react";
import { supportInfo } from "../../data/contactData";
import toast from "react-hot-toast";

export default function ContactSupport() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportInfo.email);
      toast.success("Email copied to clipboard!");
    } catch {
      toast.error("Failed to copy email.");
    }
  };

  return (
    <section
      id="contact-support"
      className="bg-white py-20 mt-8"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            Contact Support
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">
            Still Need Help?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Our support team is always ready to help you with your
            orders, products, and account.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2">

          {/* Phone */}

          <motion.a
            whileHover={{ y: -6 }}
            href={`tel:${supportInfo.phone}`}
            className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100">

              <Phone
                size={30}
                className="text-pink-600"
              />

            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Call Us
            </h3>

            <p className="mt-3 text-gray-600">
              Speak directly with our support team.
            </p>

            <p className="mt-5 font-semibold text-pink-600">
              {supportInfo.phone}
            </p>

          </motion.a>

          {/* Email */}

          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition hover:shadow-xl"
          >

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100">

              <Mail
                size={30}
                className="text-pink-600"
              />

            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Email Us
            </h3>

            <p className="mt-3 text-gray-600">
              We'll usually reply within 24 hours.
            </p>

            <a
              href={`mailto:${supportInfo.email}`}
              className="mt-5 block font-semibold text-pink-600"
            >
              {supportInfo.email}
            </a>

            <button
              onClick={copyEmail}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-3 text-white transition hover:bg-pink-600"
            >
              <Copy size={18} />

              Copy Email
            </button>

          </motion.div>

        </div>

        {/* Working Hours */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-3xl border border-pink-300 bg-rose-100 p-8"
        >

          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center">

            <Clock
              className="text-pink-600"
              size={26}
            />

            <p className="font-medium text-gray-700">

              {supportInfo.hours}

            </p>

            <CheckCircle2
              className="text-green-500"
              size={24}
            />

          </div>

        </motion.div>

      </div>
    </section>
  );
}