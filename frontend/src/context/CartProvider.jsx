// CartProvider.jsx — global app and cart state provider

import { useState, useCallback, useEffect } from 'react';
import { CartContext } from './CartContext.js';
import {
  INITIAL_PURCHASED_GAME_IDS,
  INITIAL_VIEWED_GAME_IDS,
  INITIAL_PURCHASE_HISTORY,
  INITIAL_VIEW_HISTORY,
} from '../data/mockData';

export function CartProvider({ children }) {
  // --- Cart items state ---
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('gv_cart');
    return stored ? JSON.parse(stored) : [];
  });

  // --- Purchased & Viewed state ---
  const [purchasedGameIds, setPurchasedGameIds] = useState(() => {
    const stored = localStorage.getItem('gv_purchased_ids');
    return stored ? JSON.parse(stored) : INITIAL_PURCHASED_GAME_IDS;
  });

  const [viewedGameIds, setViewedGameIds] = useState(() => {
    const stored = localStorage.getItem('gv_viewed_ids');
    return stored ? JSON.parse(stored) : INITIAL_VIEWED_GAME_IDS;
  });

  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const stored = localStorage.getItem('gv_purchase_history');
    return stored ? JSON.parse(stored) : INITIAL_PURCHASE_HISTORY;
  });

  const [viewHistory, setViewHistory] = useState(() => {
    const stored = localStorage.getItem('gv_view_history');
    return stored ? JSON.parse(stored) : INITIAL_VIEW_HISTORY;
  });

  // --- Sync state to LocalStorage ---
  useEffect(() => {
    localStorage.setItem('gv_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('gv_purchased_ids', JSON.stringify(purchasedGameIds));
  }, [purchasedGameIds]);

  useEffect(() => {
    localStorage.setItem('gv_viewed_ids', JSON.stringify(viewedGameIds));
  }, [viewedGameIds]);

  useEffect(() => {
    localStorage.setItem('gv_purchase_history', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  useEffect(() => {
    localStorage.setItem('gv_view_history', JSON.stringify(viewHistory));
  }, [viewHistory]);

  // --- Cart operations ---
  const addToCart = useCallback((game) => {
    setItems(prev => {
      if (prev.find(i => i.id === game.id)) return prev;
      return [...prev, { ...game, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId) => {
    setItems(prev => prev.filter(i => i.id !== gameId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback((gameId) => items.some(i => i.id === gameId), [items]);

  // --- Viewed history operations ---
  const addViewedGame = useCallback((gameId) => {
    // 1. Update viewed IDs list (unique, move to front)
    setViewedGameIds(prev => {
      const filtered = prev.filter(id => id !== gameId);
      return [gameId, ...filtered].slice(0, 10); // keep top 10
    });

    // 2. Update view history details
    setViewHistory(prev => {
      const filtered = prev.filter(h => h.gameId !== gameId);
      return [
        { gameId, viewedAt: new Date().toISOString() },
        ...filtered
      ].slice(0, 10);
    });
  }, []);

  // --- Purchase / Checkout operations ---
  const purchaseCart = useCallback(() => {
    if (items.length === 0) return;

    const newPurchasedIds = items.map(i => i.id);
    const purchaseDate = new Date().toISOString().split('T')[0];

    // Add purchase records
    const newRecords = items.map(item => ({
      gameId: item.id,
      purchasedAt: purchaseDate,
      price: item.price
    }));

    // Update purchased game IDs
    setPurchasedGameIds(prev => {
      const combined = [...new Set([...prev, ...newPurchasedIds])];
      return combined;
    });

    // Update purchase history list
    setPurchaseHistory(prev => [...newRecords, ...prev]);

    // Clear cart items
    clearCart();
  }, [items, clearCart]);

  const cartCount = items.length;
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      cartCount,
      cartTotal,
      purchasedGameIds,
      viewedGameIds,
      purchaseHistory,
      viewHistory,
      addViewedGame,
      purchaseCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
