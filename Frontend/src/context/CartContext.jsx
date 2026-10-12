import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { cartApi } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

function mapCart(response) {
  return (response?.items || []).map((item) => ({
    id: item.product_id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    originalPrice: item.original_price,
    image: item.image,
    quantity: item.quantity,
    stock: item.stock,
  }));
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      setCart(mapCart(await cartApi.get()));
    } catch {
      // Keep the last known cart if the API is temporarily unavailable.
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    const response = await cartApi.add(product.slug || product.id, quantity);
    setCart(mapCart(response));
  };

  const removeFromCart = async (id) => setCart(mapCart(await cartApi.remove(id)));
  const increaseQuantity = async (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (item) setCart(mapCart(await cartApi.update(id, item.quantity + 1)));
  };
  const decreaseQuantity = async (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (item) setCart(mapCart(await cartApi.update(id, Math.max(1, item.quantity - 1))));
  };
  const clearCart = async () => setCart(mapCart(await cartApi.clear()));
  const isInCart = (id) => cart.some((item) => item.id === id || item.slug === id);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isInCart,
    refreshCart,
  }), [cart, isAuthenticated, isLoading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
