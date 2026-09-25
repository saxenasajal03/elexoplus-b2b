import React, { createContext, useContext, useState, useEffect } from 'react';

const B2BCartContext = createContext();

export const B2BCartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('b2b_cart') || '[]'); } catch (e) { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('b2b_cart', JSON.stringify(items)); } catch (e) {}
  }, [items]);

  const addToCart = (product, qty) => {
    const quantity = Math.max(qty || product.min_qty || 1, product.min_qty || 1);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product_id === product.product_id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, {
        product_id: product.product_id, name: product.name, image_url: product.image_url,
        dealer_price: product.dealer_price, min_qty: product.min_qty || 1, quantity,
      }];
    });
  };

  const updateQuantity = (productId, qty) => {
    const n = parseInt(qty, 10);
    setItems((prev) => prev.map((i) => (i.product_id === productId ? { ...i, quantity: isNaN(n) ? i.quantity : Math.max(n, i.min_qty) } : i)));
  };

  const removeItem = (productId) => setItems((prev) => prev.filter((i) => i.product_id !== productId));
  const clearCart = () => setItems([]);

  const total = items.reduce((s, i) => s + i.dealer_price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <B2BCartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clearCart, total, itemCount }}>
      {children}
    </B2BCartContext.Provider>
  );
};

export const useB2BCart = () => useContext(B2BCartContext);
