export default function OrderTabs({
  selectedTab,
  setSelectedTab,
}) {
  const tabs = [
    "All",
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            selectedTab === tab
              ? "bg-pink-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-pink-100 hover:text-pink-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}