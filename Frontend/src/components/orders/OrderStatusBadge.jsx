export default function OrderStatusBadge({ status }) {
  const statusStyles = {
    "Order Placed": "bg-gray-100 text-gray-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Packed: "bg-orange-100 text-orange-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    "Out for Delivery" : "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-3 text-sm font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}