import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function LogoutModal({
  isOpen,
  onClose,
  onLogout,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LogOut size={38} className="text-red-500" />
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Logout?
            </h2>

            {/* Message */}
            <p className="mt-3 text-center text-gray-500">
              Are you sure you want to logout from your Pearl Promise account?
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={onLogout}
                className="flex-1 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}