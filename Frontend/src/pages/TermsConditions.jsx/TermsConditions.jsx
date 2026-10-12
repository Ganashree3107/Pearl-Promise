import { motion } from "framer-motion";
import PolicyHeader from "../../components/policy/PolicyHeader";

export default function TermsConditions() {
  const contents = [
    { id: "acceptance", number: "01", title: "Acceptance of Terms" },
    { id: "products", number: "02", title: "Products" },
    { id: "pricing", number: "03", title: "Pricing & Payments" },
    { id: "orders", number: "04", title: "Orders" },
    { id: "shipping", number: "05", title: "Shipping & Delivery" },
    { id: "returns", number: "06", title: "Returns & Refunds" },
    { id: "responsibilities", number: "07", title: "User Responsibilities" },
    { id: "property", number: "08", title: "Intellectual Property" },
    { id: "liability", number: "09", title: "Limitation of Liability" },
    { id: "law", number: "10", title: "Governing Law" },
    { id: "contact", number: "11", title: "Contact Us" },
  ];

  return (
    <main className="bg-gray-50">

      <PolicyHeader
        title="Terms & Conditions"
        subtitle="Please read these Terms & Conditions carefully before using Pearl Promise."
      />

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Document */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

          {/* Contents */}

          <section className="border-b border-gray-200 bg-rose-50 p-10">

            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              📑 Table of Contents
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              {contents.map((item) => (

                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-xl border border-rose-100 bg-white p-4 transition hover:bg-pink-50 hover:shadow-md"
                >
                  <span className="mr-3 font-bold text-pink-600">
                    {item.number}
                  </span>

                  {item.title}
                </a>

              ))}

            </div>

          </section>

          {/* 01 */}

          <motion.section
            id="acceptance"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                01
              </div>

              <h2 className="text-2xl font-bold">
                Acceptance of Terms
              </h2>

            </div>

            <p className="mt-6 leading-8 text-gray-600">
              By accessing or using Pearl Promise, you agree to comply with these
              Terms & Conditions. If you do not agree with any part of these
              terms, please discontinue the use of our website.
            </p>

          </motion.section>

          {/* 02 */}

          <motion.section
            id="products"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                02
              </div>

              <h2 className="text-2xl font-bold">
                Products
              </h2>

            </div>

            <p className="mt-6 leading-8 text-gray-600">
              We strive to display product images, descriptions, and pricing
              accurately. Minor variations in product appearance or packaging
              may occur without affecting product quality.
            </p>

          </motion.section>

          {/* 03 */}

          <motion.section
            id="pricing"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                03
              </div>

              <h2 className="text-2xl font-bold">
                Pricing & Payments
              </h2>

            </div>

            <ul className="mt-6 list-disc space-y-3 pl-6 leading-8 text-gray-600">
              <li>All prices are displayed in Indian Rupees (₹).</li>
              <li>Taxes are calculated during checkout.</li>
              <li>Prices may change without prior notice.</li>
              <li>Orders are processed only after successful payment.</li>
            </ul>

          </motion.section>

          {/* 04 */}

          <motion.section
            id="orders"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                04
              </div>

              <h2 className="text-2xl font-bold">
                Orders
              </h2>

            </div>

            <p className="mt-6 leading-8 text-gray-600">
              Pearl Promise reserves the right to refuse, cancel, or limit any order
              due to product availability, payment issues, pricing errors, or
              suspected fraudulent activity.
            </p>

          </motion.section>

          {/* 05 */}

          <motion.section
            id="shipping"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                05
              </div>

              <h2 className="text-2xl font-bold">
                Shipping & Delivery
              </h2>

            </div>

            <p className="mt-6 leading-8 text-gray-600">
              Delivery timelines are estimates and may vary depending on
              location, courier services, weather conditions, or unforeseen
              circumstances.
            </p>

          </motion.section>
          {/* 06 */}

          <motion.section
            id="returns"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                06
              </div>

              <h2 className="text-2xl font-bold">
                Returns & Refunds
              </h2>
            </div>

            <p className="mt-6 leading-8 text-gray-600">
              Eligible products may be returned according to our Return &
              Refund Policy. Refunds are initiated after the returned
              products are inspected and approved. Certain items may not be
              eligible for return due to hygiene or safety reasons.
            </p>
          </motion.section>

          {/* 07 */}

          <motion.section
            id="responsibilities"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                07
              </div>

              <h2 className="text-2xl font-bold">
                User Responsibilities
              </h2>
            </div>

            <ul className="mt-6 list-disc space-y-3 pl-6 leading-8 text-gray-600">
              <li>Provide accurate account information.</li>
              <li>Keep your login credentials confidential.</li>
              <li>Use Pearl Promise only for lawful purposes.</li>
              <li>Do not misuse or interfere with our services.</li>
            </ul>
          </motion.section>

          {/* 08 */}

          <motion.section
            id="property"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                08
              </div>

              <h2 className="text-2xl font-bold">
                Intellectual Property
              </h2>
            </div>

            <p className="mt-6 leading-8 text-gray-600">
              All trademarks, logos, graphics, product images, website
              content, designs, and other materials displayed on Pearl Promise are
              the intellectual property of Pearl Promise and may not be copied,
              reproduced, or distributed without prior written permission.
            </p>
          </motion.section>

          {/* 09 */}

          <motion.section
            id="liability"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                09
              </div>

              <h2 className="text-2xl font-bold">
                Limitation of Liability
              </h2>
            </div>

            <p className="mt-6 leading-8 text-gray-600">
              Pearl Promise shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our website,
              products, or services, to the maximum extent permitted by
              applicable law.
            </p>
          </motion.section>

          {/* 10 */}

          <motion.section
            id="law"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                10
              </div>

              <h2 className="text-2xl font-bold">
                Governing Law
              </h2>
            </div>

            <p className="mt-6 leading-8 text-gray-600">
              These Terms & Conditions shall be governed by the laws of
              India. Any disputes arising from the use of Pearl Promise shall be
              subject to the jurisdiction of the competent courts in India.
            </p>
          </motion.section>

          {/* 11 */}

          <motion.section
            id="contact"
            className="border-b border-gray-200 p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                11
              </div>

              <h2 className="text-2xl font-bold">
                Contact Us
              </h2>
            </div>

            <div className="mt-6 space-y-2 leading-8 text-gray-600">
              <p>Email: support@Pearl Promise.com</p>
              <p>Phone: +91 XXXXX XXXXX</p>
            </div>
          </motion.section>

          {/* Footer */}

          <div className="bg-gray-50 px-10 py-8 text-center">
            <p className="text-sm text-gray-500">
              Last Updated • July 2026
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}