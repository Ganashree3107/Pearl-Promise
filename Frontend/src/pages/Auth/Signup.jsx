import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";

function Signup() {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setIsSubmitting(true);
    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  const handleGoogleLogin = async (idToken) => {
    const result = await googleLogin(idToken);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Pearl Promise and start your skincare journey."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="relative">
          <User
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-pink-200 py-4 pl-12 pr-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div className="relative">
          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-pink-200 py-4 pl-12 pr-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-center text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white transition hover:shadow-lg"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <SocialLogin onGoogleLogin={handleGoogleLogin} />

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;