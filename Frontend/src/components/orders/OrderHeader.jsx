import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderHeader({
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-pink-600 transition hover:text-pink-700"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View and track all your Pearl Promise orders.
        </p>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by Order ID or Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        />

      </div>
    </>
  );
}