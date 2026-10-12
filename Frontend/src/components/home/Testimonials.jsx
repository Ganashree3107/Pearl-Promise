import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Priya Nair",
    location: "Bangalore, India",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The Hydration Ritual Kit completely transformed my skincare routine. My skin feels softer, healthier and naturally glowing every day.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "Mumbai, India",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The Aloe Sunscreen is incredibly lightweight and blends perfectly without leaving a white cast. It's now part of my everyday routine.",
  },
  {
    id: 3,
    name: "Aanya Sharma",
    location: "Delhi, India",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I'm absolutely in love with the Blueberry Repair Serum. Within weeks my skin looked brighter, smoother and more hydrated.",
  },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2D1F2F] via-[#39263F] to-[#4A3153] pt-10 pb-12 px-6 lg:px-8">

      {/* Top Divider */}

      <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>

      {/* Background Texture */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_35%)]"></div>

      {/* Glow Effects */}

      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]"></div>

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]"></div>

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <span className="inline-flex items-center rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-pink-200 backdrop-blur-md border border-white/10">

            💗 Real Customer Stories

          </span>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">

            Loved by Our Community

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">

            Discover why thousands trust Pearl Promise for healthier,
            happier and naturally glowing skin.

          </p>

        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-10 text-center"
        >

          <div>

            <h3 className="text-4xl font-bold text-pink-400">

              4.9★

            </h3>

            <p className="mt-2 text-gray-300">

              Average Rating

            </p>

          </div>

          <div className="hidden h-14 w-px bg-white/20 md:block"></div>

          <div>

            <h3 className="text-4xl font-bold text-pink-400">

              10K+

            </h3>

            <p className="mt-2 text-gray-300">

              Happy Customers

            </p>

          </div>

          <div className="hidden h-14 w-px bg-white/20 md:block"></div>

          <div>

            <h3 className="text-4xl font-bold text-pink-400">

              96%

            </h3>

            <p className="mt-2 text-gray-300">

              Would Recommend

            </p>

          </div>

        </motion.div>

        {/* Cards */}

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
          >
            <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white p-7 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-pink-500/20 hover:shadow-2xl">

              {/* Profile */}

              <div className="flex items-center gap-4">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full border-4 border-pink-100 object-cover"
                />

                <div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>

                </div>

              </div>

              {/* Rating */}

              <div className="mt-5 flex gap-1">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-5 flex-grow leading-8 text-gray-600">

                "{testimonial.review}"

              </p>

              {/* Verified */}

              <div className="mt-6 flex items-center gap-2 text-pink-500">

                <BadgeCheck
                  size={18}
                  className="fill-pink-500 text-white"
                />

                <span className="text-sm font-medium">
                  Verified Customer
                </span>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* CTA */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >

        <h3 className="text-3xl font-bold text-white">

          Join Thousands Who Trust Pearl Promise

        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">

          Discover skincare designed to make every routine
          simple, effective and beautifully glowing.

        </p>

        <Link to="/shop">

          <button className="mt-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-9 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40">

            Shop Now →

          </button>

        </Link>

      </motion.div>

    </div>

  </section>

  );
}

export default Testimonials;