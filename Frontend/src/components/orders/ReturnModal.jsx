import { useState } from "react";
import { X } from "lucide-react";

export default function ReturnModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const reasons = [
    "Damaged Product",
    "Wrong Item Received",
    "Product Quality Issue",
    "Changed My Mind",
    "Other",
  ];

  const resetForm = () => {
    setReason("");
    setComments("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!reason) {
      setError("Please select a return reason.");
      return;
    }

    const returnData = {
      reason,
      comments: comments.trim(),
    };

    if (onSubmit) {
      onSubmit(returnData);
    }

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Return Product
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <p className="mb-4 text-gray-500">
          Select the reason for returning your product.
        </p>

        {/* Reasons */}
        <div className="space-y-3">
          {reasons.map((item) => (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                reason === item
                  ? "border-pink-500 bg-pink-50"
                  : "hover:border-pink-300"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={item}
                checked={reason === item}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
              />

              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Comments */}
        <textarea
          rows={4}
          placeholder="Additional comments (optional)..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-5 w-full resize-none rounded-xl border p-3 outline-none transition focus:border-pink-500"
        />

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-xl border py-3 font-semibold transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!reason}
            className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${
              reason
                ? "bg-pink-600 hover:bg-pink-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Submit Return
          </button>
        </div>

      </div>
    </div>
  );
}