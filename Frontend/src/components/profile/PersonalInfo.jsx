import { User, Mail, Phone, CalendarDays, Venus, Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function PersonalInfo({ user, onEdit }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-rose-100 bg-white p-8 shadow-sm"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-white transition hover:bg-pink-600"
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>

      {/* Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          icon={<User size={18} />}
          label="Full Name"
          value={user?.name || "Not Added"}
        />

        <InfoCard
          icon={<Mail size={18} />}
          label="Email"
          value={user?.email || "Not Added"}
        />

        <InfoCard
          icon={<Phone size={18} />}
          label="Phone"
          value={user?.phone || "Not Added"}
        />

        <InfoCard
          icon={<Venus size={18} />}
          label="Gender"
          value={user?.gender || "Not Added"}
        />

        <InfoCard
          icon={<CalendarDays size={18} />}
          label="Date of Birth"
          value={user?.dob || "Not Added"}
        />
      </div>
    </motion.section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-rose-50 p-5">
      <div className="mb-3 flex items-center gap-2 text-pink-600">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}