import { CheckCircle2 } from "lucide-react";

export default function OrderTimeline({
  currentStatus,
  isCancelled = false,
}) {
  const statuses = [
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="mt-8">

      <div className="flex items-center">

        {statuses.map((status, index) => {

          const completed =
            !isCancelled && index <= currentIndex;

          return (
            <div
              key={status}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    isCancelled
                      ? index === 0
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-gray-400"
                      : completed
                      ? "bg-pink-600 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <span className="text-xs font-semibold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <p className="mt-2 w-20 text-center text-xs text-gray-600">
                  {status}
                </p>

              </div>

              {index !== statuses.length - 1 && (
                <div
                  className={`mb-6 h-1 flex-1 rounded ${
                    completed &&
                    index < currentIndex
                      ? "bg-pink-600"
                      : "bg-gray-300"
                  }`}
                />
              )}

            </div>
          );
        })}

      </div>

      {isCancelled && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center">

          <p className="font-semibold text-red-600">
            ❌ Order Cancelled
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Refund will be processed within
            3–5 business days.
          </p>

        </div>
      )}

    </div>
  );
}