import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

export default function SavedAddresses({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}) {
  const getIcon = (type) => {
    switch (type) {
      case "Home":
        return Home;
      case "Office":
        return Briefcase;
      default:
        return MapPin;
    }
  };

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
          Saved Addresses
        </h2>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* Empty State */}

      {addresses.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-pink-200 py-12 text-center">
          <MapPin
            size={48}
            className="mx-auto mb-4 text-pink-400"
          />

          <h3 className="text-lg font-semibold text-gray-800">
            No Saved Addresses
          </h3>

          <p className="mt-2 text-gray-500">
            Add your first delivery address.
          </p>

          <button
            onClick={onAdd}
            className="mt-6 rounded-xl bg-pink-500 px-6 py-3 font-medium text-white hover:bg-pink-600"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {addresses.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-pink-100 bg-pink-50 p-6 transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="rounded-2xl bg-white flex h-14 w-14 shrink-0 items-center justify-center">
                      <Icon
                        size={22}
                        className="text-pink-500"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {item.type}
                        </h3>

                        {item.isDefault && (
                          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                            <Star size={12} />
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-gray-700">
                        {item.fullName}
                      </p>

                      <p className="text-gray-600">
                        {item.house}, {item.street}
                      </p>

                      {item.landmark && (
                        <p className="text-gray-600">
                          {item.landmark}
                        </p>
                      )}

                      <p className="text-gray-600">
                        {item.city}, {item.state} - {item.pincode}
                      </p>

                      <p className="mt-2 font-medium text-gray-700">
                        📞 {item.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="flex items-center gap-2 rounded-lg border border-pink-200 px-4 py-2 text-pink-600 transition hover:bg-pink-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}