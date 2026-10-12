export default function OrderActions({
  orderStatus,
  isCancelled,
  paymentMethod,
  returnStatus,
  onBuyAgain,
  onCancel,
  onReview,
  onReturn,
}) {
  const isReturnRequested =
    returnStatus === "Return Requested";

  const isReturned =
    returnStatus === "Returned";

  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      {/* Buy Again */}
      <button
        type="button"
        onClick={onBuyAgain}
        className="mb-4 w-full rounded-2xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
      >
        🛒 Buy Again
      </button>

      {/* Cancel Order */}
      {!isCancelled &&
        orderStatus !== "Delivered" && (
          <button
            type="button"
            onClick={onCancel}
            disabled={[
              "Shipped",
              "Out for Delivery",
            ].includes(orderStatus)}
            className={`mb-4 w-full rounded-2xl py-3 font-semibold transition ${
              [
                "Shipped",
                "Out for Delivery",
              ].includes(orderStatus)
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            ❌ Cancel Order
          </button>
        )}

      {/* Cancelled Order */}
      {isCancelled && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="font-semibold text-red-600">
            Order Cancelled
          </p>

          {paymentMethod !== "cod" && (
            <p className="mt-2 text-sm text-gray-600">
              Refund will be processed within
              3–5 business days.
            </p>
          )}
        </div>
      )}

      {/* Delivered Order */}
      {orderStatus === "Delivered" &&
        !isCancelled && (
          <>
            {/* Review */}
            <button
              type="button"
              onClick={onReview}
              className="mb-4 w-full rounded-2xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              ⭐ Rate & Review
            </button>

            {/* Return Requested */}
            {isReturnRequested && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-center">
                <p className="font-semibold text-orange-600">
                  🔄 Return Requested
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Your return request has been submitted.
                </p>
              </div>
            )}

            {/* Returned */}
            {isReturned && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="font-semibold text-green-600">
                  ✅ Product Returned
                </p>
              </div>
            )}

            {/* Return Product */}
            {!isReturnRequested &&
              !isReturned && (
                <button
                  type="button"
                  onClick={onReturn}
                  className="w-full rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  🔄 Return Product
                </button>
              )}
          </>
        )}
    </div>
  );
}