import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistActions from "../../components/wishlist/WishlistActions";
import WishlistGrid from "../../components/wishlist/WishlistGrid";
import RecommendedProducts from "../../components/wishlist/RecommendedProducts";
import EmptyWishlist from "../../components/wishlist/EmptyWishlist";
import { useWishlist } from "../../context/WishlistContext";

function Wishlist() {
  const {wishlist} = useWishlist();
  return (
    <>
      <WishlistHeader />
 
      <WishlistActions />
      {wishlist.length === 0 ?(
        <EmptyWishlist/>
      ):(
      <>
       <WishlistGrid />
      <RecommendedProducts />
      </>
)} 
    </>
  );
}

export default Wishlist;