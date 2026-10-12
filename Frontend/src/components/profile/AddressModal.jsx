import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, X } from "lucide-react";

export default function AddressModal({
  isOpen,
  onClose,
  address,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (address) {
      reset(address);
    } else {
      reset({
        fullName: "",
        phone: "",
        house: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        type: "Home",
        isDefault: false,
      });
    }
  }, [address, reset]);

  const submitHandler = (data) => {
    onSave(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="text-pink-500" />
                <h2 className="text-2xl font-bold">
                  {address ? "Edit Address" : "Add Address"}
                </h2>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <input
                {...register("fullName")}
                placeholder="Full Name"
                className="rounded-xl border p-3"
              />

              <input
                {...register("phone")}
                placeholder="Phone Number"
                className="rounded-xl border p-3"
              />

              <input
                {...register("house")}
                placeholder="House / Flat No."
                className="rounded-xl border p-3"
              />

              <input
                {...register("street")}
                placeholder="Street"
                className="rounded-xl border p-3"
              />

              <input
                {...register("landmark")}
                placeholder="Landmark"
                className="rounded-xl border p-3"
              />

              <input
                {...register("city")}
                placeholder="City"
                className="rounded-xl border p-3"
              />

              <input
                {...register("state")}
                placeholder="State"
                className="rounded-xl border p-3"
              />

              <input
                {...register("pincode")}
                placeholder="Pincode"
                className="rounded-xl border p-3"
              />

              <select
                {...register("type")}
                className="rounded-xl border p-3"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("isDefault")}
                />
                Set as Default
              </label>

              <div className="col-span-full mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border px-6 py-3"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-pink-500 px-6 py-3 text-white hover:bg-pink-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}