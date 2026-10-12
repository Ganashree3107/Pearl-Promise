import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";
import { authApi } from "../../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await authApi.resetPassword({
        email: location.state?.email || "",
        otp,
        password,
        confirm_password: confirm,
      });
      navigate("/login");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Choose a new password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit reset code"
          className="w-full rounded-2xl border border-pink-200 py-4 px-4 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        />
        <PasswordInput
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="New Password"
        />

        <PasswordInput
          value={confirm}
          onChange={(e) =>
            setConfirm(e.target.value)
          }
          placeholder="Confirm Password"
        />

        {error && (
          <div className="rounded-2xl bg-red-50 p-3 text-center text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white"
        >
          Reset Password
        </button>

      </form>
    </AuthLayout>
  );
}

export default ResetPassword;