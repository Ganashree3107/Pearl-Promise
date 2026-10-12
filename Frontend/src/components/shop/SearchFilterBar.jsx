import { Search } from "lucide-react";

function SearchFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  concern,
  setConcern,
  skinType,
  setSkinType,
  sort,
  setSort
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Shop
        </h1>

        <p className="text-gray-500 mt-2">
          Discover skincare crafted for every skin type.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}
        <div className="relative lg:col-span-2">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-pink-300"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
        >

          <option value="All">All Categories</option>

          <option value="Serum">Serums</option>

          <option value="Moisturizer">Moisturizers</option>

          <option value="Sunscreen">Sunscreens</option>

          <option value="Face Wash">Face Wash</option>

          <option value="Face Mask">Face Masks</option>

          <option value="Lip Tint">Lip Tints</option>

        </select>

        {/* Sort */}

        <select
        value={sort}
        onChange={(e)=> setSort(e.target.value)}
        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300">

          <option value="Featured">Featured</option>

          <option value="Best Selling">Best Selling</option>

          <option value="Price: Low → High">Price: Low → High</option>

          <option value="Price: High → Low">Price: High → Low</option>

          <option value="Newest">Newest</option>

        </select>

        <select
  value={concern}
  onChange={(e) => setConcern(e.target.value)}
  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
>
  <option value="All">Skin Concern</option>
  <option value="Acne">Acne</option>
  <option value="Dryness">Dryness</option>
  <option value="Pigmentation">Pigmentation</option>
  <option value="Barrier Repair">Barrier Repair</option>
  <option value="Dullness">Dullness</option>
  <option value="Oil Control">Oil Control</option>
  <option value="Sun Protection">Sun Protection</option>
</select>

<select
  value={skinType}
  onChange={(e) => setSkinType(e.target.value)}
  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
>
  <option value="All">Skin Type</option>
  <option value="Dry">Dry</option>
  <option value="Oily">Oily</option>
  <option value="Combination">Combination</option>
  <option value="Sensitive">Sensitive</option>
  <option value="All Skin Types">All Skin Types</option>
</select>

      </div>

    </section>


  )
}

export default SearchFilterBar;
