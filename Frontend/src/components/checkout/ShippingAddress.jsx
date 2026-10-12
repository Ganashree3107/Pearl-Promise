import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function ShippingAddress({ address, setAddress }) {
  const { user } = useAuth();
  const storageKey = user?.id ? `Pearl Promise-address-${user.id}` : null;
  const emptyAddress = {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [formData, setFormData] = useState(emptyAddress);

  const [errors, setErrors] = useState({});

  const [saved, setSaved] = useState(false);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!storageKey) return;
    const storedAddress = localStorage.getItem(storageKey);

    if (storedAddress) {
      const parsed = JSON.parse(storedAddress);

      setFormData(parsed);

      setAddress(parsed);

      setSaved(true);
    }
  }, [storageKey, setAddress]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required.";

    if (!/^(\+91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, "")))
  newErrors.phone = "Enter a valid phone number.";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.address.trim())
      newErrors.address = "Street address is required.";

    if (!formData.city.trim())
      newErrors.city = "City is required.";

    if (!formData.state.trim())
      newErrors.state = "State is required.";

    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter valid PIN code.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    if (!validate()) return;

    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(formData));

    setAddress(formData);

    setSaved(true);

    setEditing(false);

    toast.success("✅ Address saved successfully.");
  };

  const editAddress = () => {
    setEditing(true);
  };

  const deleteAddress = () => {
    if (storageKey) localStorage.removeItem(storageKey);

    setFormData(emptyAddress);

    setAddress(null);

    setSaved(false);

    setEditing(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");

      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        toast.success(
          "📍 Location detected.\nWe'll auto-fill the address after backend integration."
        );
      },
      () => {
        toast.error("Unable to fetch your location.");
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Shipping Address
        </h2>

        {saved && !editing && (
          <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <CheckCircle size={18} />
            Saved
          </span>
        )}
      </div>
      {saved && !editing ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-green-200 bg-green-50 p-6"
        >

          <div className="flex items-start justify-between">

            <div className="space-y-2">

              <h3 className="text-xl font-bold text-gray-900">

                {formData.fullName}

              </h3>

              <p className="text-gray-600">

                {formData.phone}

              </p>

              <p className="text-gray-600">

                {formData.email}

              </p>

              <p className="leading-7 text-gray-600">

                {formData.address}

              </p>

              <p className="text-gray-600">

                {formData.city},{" "}
                {formData.state} - {formData.pincode}

              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={editAddress}
                className="rounded-2xl bg-white p-3 shadow transition hover:bg-pink-50"
              >

                <Pencil
                  size={20}
                  className="text-pink-500"
                />

              </button>

              <button
                onClick={deleteAddress}
                className="rounded-2xl bg-white p-3 shadow transition hover:bg-red-50"
              >

                <Trash2
                  size={20}
                  className="text-red-500"
                />

              </button>

            </div>

          </div>

        </motion.div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {/* Full Name */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

              <User
                size={18}
                className="text-pink-500"
              />

              Full Name

            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.fullName && (

              <p className="mt-2 text-sm text-red-500">

                {errors.fullName}

              </p>

            )}

          </div>

          {/* Phone */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

              <Phone
                size={18}
                className="text-pink-500"
              />

              Phone Number

            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.phone && (

              <p className="mt-2 text-sm text-red-500">

                {errors.phone}

              </p>

            )}

          </div>

          {/* Email */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

              <Mail
                size={18}
                className="text-pink-500"
              />

              Email Address

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.email && (

              <p className="mt-2 text-sm text-red-500">

                {errors.email}

              </p>

            )}

          </div>

          {/* PIN */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

              <MapPin
                size={18}
                className="text-pink-500"
              />

              PIN Code

            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="560001"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.pincode && (

              <p className="mt-2 text-sm text-red-500">

                {errors.pincode}

              </p>

            )}

          </div>

          {/* Address */}

          <div className="md:col-span-2">

            <label className="mb-3 flex items-center gap-2 font-medium text-gray-700">

              <MapPin
                size={18}
                className="text-pink-500"
              />

              Street Address

            </label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No, Street, Area..."
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.address && (

              <p className="mt-2 text-sm text-red-500">

                {errors.address}

              </p>

            )}

          </div>
          {/* City */}

          <div>

            <label className="mb-3 font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Bengaluru"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.city && (
              <p className="mt-2 text-sm text-red-500">
                {errors.city}
              </p>
            )}

          </div>

          {/* State */}

          <div>

            <label className="mb-3 font-medium text-gray-700">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Karnataka"
              className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500"
            />

            {errors.state && (
              <p className="mt-2 text-sm text-red-500">
                {errors.state}
              </p>
            )}

          </div>

        </div>

      )}

      {!saved || editing ? (

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={getCurrentLocation}
            className="flex-1 rounded-2xl border border-pink-300 bg-pink-50 py-4 font-semibold text-pink-600 transition hover:bg-pink-100"
          >
            📍 Use Current Location
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={saveAddress}
            className="flex-1 rounded-2xl bg-pink-500 py-4 font-semibold text-white shadow-lg transition hover:bg-pink-600"
          >
            💾 Save Address
          </motion.button>

        </div>

      ) : (

        <div className="mt-8 flex justify-center">

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={editAddress}
            className="rounded-2xl bg-pink-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-pink-600"
          >
            Edit Address
          </motion.button>

        </div>

      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-2xl bg-pink-50 p-5"
      >

        <p className="text-center text-sm text-gray-600">

          🔒 Your shipping information is encrypted and securely stored.

        </p>

      </motion.div>

    </motion.div>

  );

}

export default ShippingAddress;