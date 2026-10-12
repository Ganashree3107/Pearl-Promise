import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function ProfileHeader({ onEdit }) {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "G";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 p-8 text-white shadow-xl"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row">

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-4xl font-bold text-pink-500 shadow-lg">
          {initials}
        </div>

        {/* User Info */}

        <div className="flex-1 text-center md:text-left">

          <h1 className="text-3xl font-bold">

            {user?.name || "Pearl Promise User"}

          </h1>

          <p className="mt-2 text-pink-100">

            {user?.email || "user@Pearl Promise.com"}

          </p>

          <p className="mt-2 text-sm text-pink-100">

            Welcome back to your skincare journey 🌿

          </p>

        </div>

        {/* Edit Button */}

        <button onClick={onEdit} className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-pink-500 transition hover:scale-105">

          <Pencil size={18} />

          Edit Profile

        </button>

      </div>
    </motion.div>
  );
}

export default ProfileHeader;