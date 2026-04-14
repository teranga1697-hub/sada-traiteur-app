import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('sadaCart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('sadaCart', JSON.stringify(items));
  }, [items]);

  const addProduct = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.product === product.product);
      if (existing) {
        return current.map((item) =>
          item.product === product.product ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...current, product];
    });
  };

  const updateProduct = (productId, quantity) => {
    setItems((current) => current.map((item) => (item.product === productId ? { ...item, quantity } : item)));
  };

  const removeProduct = (productId) => {
    setItems((current) => current.filter((item) => item.product !== productId));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addProduct, updateProduct, removeProduct, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
