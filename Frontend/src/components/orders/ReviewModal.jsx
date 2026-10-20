import { useState } from "react";
import { X, Star, Upload } from "lucide-react";
import { reviewApi } from "../../services/api";
import SafeImage from "../common/SafeImage";

export default function ReviewModal({
  isOpen,
  onClose,
  order,
}) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstItem = order?.checkoutItems?.[0];

  if (!isOpen) return null;

  const resetForm = () => {
    setRating(0);
    setTitle("");
    setReview("");
    setImage(null);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    // Validation
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      setError("Please write your review.");
      return;
    }

    const productId = order?.checkoutItems?.[0]?.id;
    if (!productId) {
      setError("This order does not contain a reviewable product.");
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewApi.add(productId, {
        rating,
        text: title.trim()
          ? `${title.trim()}\n\n${review.trim()}`
          : review.trim(),
      });
      resetForm();
      onClose();
    } catch (error) {
      setError(error.message || "Unable to save your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Rate & Review
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Product */}

        {firstItem && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-pink-50 p-4">
            <SafeImage
              src={firstItem.images?.[0] || firstItem.image}
              alt={firstItem.name}
              className="h-16 w-16 rounded-xl object-cover"
              loading="lazy"
            />

            <div>
              <p className="text-sm text-gray-500">
                Reviewing
              </p>

              <h3 className="font-semibold text-gray-900">
                {firstItem.name}
              </h3>
            </div>
          </div>
        )}

        {/* Rating */}

        <div className="mb-6">
          <p className="mb-3 text-center font-medium text-gray-700">
            How would you rate this product?
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setError("");
                  }}
                >
                  <Star
                    size={34}
                    className={`transition ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Title */}

        <input
          type="text"
          placeholder="Review Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mb-4 w-full rounded-xl border p-3 outline-none transition focus:border-pink-500"
        />

        {/* Review */}

        <textarea
          rows={5}
          placeholder="Share your experience..."
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            setError("");
          }}
          className="mb-4 w-full resize-none rounded-xl border p-3 outline-none transition focus:border-pink-500"
        />

        {/* Image */}

        <label className="mb-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition hover:border-pink-400">
          <Upload size={20} />

          <span className="truncate text-sm text-gray-600">
            {image
              ? image.name
              : "Upload Image (Optional)"}
          </span>

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ||
                  null
              )
            }
          />
        </label>

        {/* Error */}

        {error && (
          <p className="mb-4 text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        {/* Buttons */}

        <div className="flex gap-4">
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
            className="flex-1 rounded-xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>

      </div>
    </div>
  );
}