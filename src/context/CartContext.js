import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage("nivora_cart", []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage("nivora_wishlist", []));

  useEffect(() => {
    localStorage.setItem("nivora_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nivora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product, qty = 1, subscribeAndSave = false) {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.subscribeAndSave === subscribeAndSave
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.subscribeAndSave === subscribeAndSave
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount || 0,
          image: product.image,
          gender: product.gender,
          qty,
          subscribeAndSave
        }
      ];
    });
  }

  function removeFromCart(id, subscribeAndSave = false) {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.subscribeAndSave === subscribeAndSave)));
  }

  function updateQty(id, subscribeAndSave, qty) {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.subscribeAndSave === subscribeAndSave ? { ...item, qty } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(id) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }

  function isInWishlist(id) {
    return wishlist.includes(id);
  }

  function lineTotal(item) {
    const base = item.price * item.qty;
    const discountPct = item.subscribeAndSave ? Math.max(item.discount, 10) : item.discount;
    return base - (base * discountPct) / 100;
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + lineTotal(item), 0);
  const shippingFee = cart.length === 0 || cartTotal >= 10000 ? 0 : 250;

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    lineTotal,
    cartCount,
    cartSubtotal,
    cartTotal,
    shippingFee,
    grandTotal: cartTotal + shippingFee
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}