import { useWishlist } from "../../context/WishlistContext";
import WishlistCard from "./WishlistCard";
import EmptyWishlist from "./EmptyWishlist";
import { AnimatePresence } from "framer-motion";

function WishlistGrid() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
        {wishlist.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
          />
        ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default WishlistGrid;