import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { authApi } from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await authApi.forgotPassword(email);
      setMessage(result.message);
      navigate("/reset-password", { state: { email } });
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password."
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full rounded-2xl border border-pink-200 py-4 pl-12 pr-4 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />

        </div>

        {message && (
          <div className="rounded-2xl bg-green-50 p-4 text-center text-green-600">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white"
        >
          Send Reset Link
        </button>

        <p className="text-center">

          <Link
            to="/login"
            className="font-semibold text-pink-500"
          >
            Back to Login
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;