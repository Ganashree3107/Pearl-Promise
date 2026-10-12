import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  name = "password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">

      <Lock
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-pink-200 bg-white py-4 pl-12 pr-14 text-gray-800 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>

    </div>
  );
}

export default PasswordInput;