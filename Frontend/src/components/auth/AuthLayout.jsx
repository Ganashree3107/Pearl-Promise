import { motion } from "framer-motion";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-100 px-5 py-10">

      {/* Background Blur */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-rose-300/20 blur-3xl" />

      {/* Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative w-full max-w-xl rounded-[36px] border border-white/40 bg-white/80 px-10 py-12 shadow-2xl backdrop-blur-xl"
      >

        {/* Logo */}

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-4xl shadow-lg">

            💖

          </div>
         <div className="flex justify-center mb-6">
          <img 
          alt="PearlPromise Logo"
          src="images/logo/PearlPromise-logo.png"
          className="h-24 w-auto"/>
          </div>

          <h2 className="mt-3 text-2xl font-semibold text-gray-800">

            {title}

          </h2>

          <p className="mt-2 text-gray-500">

            {subtitle}

          </p>

        </div>

        {/* Content */}

        {children}

      </motion.div>

    </section>
  );
}

export default AuthLayout;