import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }


    navigate(redirectTo, {
      replace: true,
    });
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your Pearl Promise journey."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="relative">
          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-pink-200 py-4 pl-12 pr-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />

            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-pink-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-center text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white transition hover:shadow-lg"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-pink-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;