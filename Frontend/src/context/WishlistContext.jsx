import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { wishlistApi } from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

function mapWishlist(response) {
  return (response?.items || []).map((item) => ({
    id: item.product_id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    image: item.image,
  }));
}

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const refreshWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    try {
      setWishlist(mapWishlist(await wishlistApi.get()));
    } catch {
      // Keep the last known wishlist if the API is temporarily unavailable.
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (product) => {
    setWishlist(mapWishlist(await wishlistApi.add(product.slug || product.id)));
    toast.success("Added to Wishlist");
  };

  const removeFromWishlist = async (id) => {
    setWishlist(mapWishlist(await wishlistApi.remove(id)));
    toast.success("Removed from Wishlist");
  };

  const clearWishlist = async () => {
    setWishlist(mapWishlist(await wishlistApi.clear()));
    toast.success("Wishlist Cleared");
  };

  const value = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    refreshWishlist,
  }), [wishlist, isAuthenticated]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
