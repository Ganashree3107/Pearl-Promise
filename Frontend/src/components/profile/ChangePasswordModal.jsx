import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmitPassword,
}) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const submitHandler = (data) => {
    if (onSubmitPassword) {
      onSubmitPassword(data);
    }

    toast.success("Password changed successfully");

    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-2">
                <Lock className="text-pink-500" />
                <h2 className="text-xl font-bold">
                  Change Password
                </h2>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-5 p-6"
            >
              {/* Current Password */}

              <PasswordInput
                label="Current Password"
                visible={showCurrent}
                setVisible={setShowCurrent}
                register={register("currentPassword", {
                  required: "Current password is required",
                })}
                error={errors.currentPassword?.message}
              />

              {/* New Password */}

              <PasswordInput
                label="New Password"
                visible={showNew}
                setVisible={setShowNew}
                register={register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
                error={errors.newPassword?.message}
              />

              {/* Confirm Password */}

              <PasswordInput
                label="Confirm Password"
                visible={showConfirm}
                setVisible={setShowConfirm}
                register={register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border px-5 py-2.5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-pink-500 px-5 py-2.5 text-white transition hover:bg-pink-600"
                >
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PasswordInput({
  label,
  visible,
  setVisible,
  register,
  error,
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          {...register}
          className="w-full rounded-xl border p-3 pr-12"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}