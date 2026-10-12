import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
      });
    }
  }, [user, reset]);

  const submitHandler = (data) => {
    onSave(data);

    toast.success("Profile updated successfully!");

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: .9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .9, y: 40 }}
            transition={{ duration: .25 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-8 py-6">
              <h2 className="text-2xl font-bold">
                Edit Profile
              </h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-6 p-8"
            >
              {/* Name */}

              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full rounded-xl border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.name?.message}
                </p>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block font-medium">
                  Phone
                </label>

                <input
                  {...register("phone")}
                  className="w-full rounded-xl border p-3"
                />
              </div>

              {/* Gender */}

              <div>
                <label className="mb-2 block font-medium">
                  Gender
                </label>

                <select
                  {...register("gender")}
                  className="w-full rounded-xl border p-3"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DOB */}

              <div>
                <label className="mb-2 block font-medium">
                  Date of Birth
                </label>

                <input
                  type="date"
                  {...register("dob")}
                  className="w-full rounded-xl border p-3"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border px-6 py-3"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-pink-500 px-6 py-3 font-medium text-white hover:bg-pink-600"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}