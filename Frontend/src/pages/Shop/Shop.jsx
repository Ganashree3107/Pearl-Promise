import ProductCard from "../../components/shop/ProductCard";
import {useState} from "react";
import SearchFilterBar from "../../components/shop/SearchFilterBar";
import products from "../../data/products"; 
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function Shop() {
    const location=useLocation();
    const [search, setSearch]=useState("");
     const[category, setCategory]=useState("All");
      const [concern,setConcern]=useState("All");
  const[skinType,setSkinType]=useState("All");
    const [sort, setSort]=useState("Featured");
    let filteredProducts = products.filter((product) => {
  const matchSearch =
    product.name.toLowerCase().includes(search.toLowerCase());
  const matchCategory =
    category === "All" || product.category === category;
  const matchConcern=
  concern === "All" || product.concern?.includes(concern);
  const matchSkinTypes=
  skinType==="All" || product.skinType?.includes(skinType);

  return matchSearch && matchCategory && matchConcern && matchSkinTypes;
});

// Sorting & Filtering
if (sort === "Best Selling") {
  filteredProducts = filteredProducts.filter(
    (product) => product.badge === "Best Seller"
  );
}

if (sort === "Price: Low → High") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sort === "Price: High → Low") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sort === "Newest") {
  filteredProducts = filteredProducts.filter(
    (product) => product.badge === "New"
  );
}
useEffect(()=>{
  if (location.state?.search){
    setSearch(location.state.search);
  }
},[location.state])


  return (
    <main className="bg-[#FFF9FB]">
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        concern={concern}
        setConcern={setConcern}
        skinType={skinType}
        setSkinType={setSkinType}
        sort={sort}
        setSort={setSort}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Shop;