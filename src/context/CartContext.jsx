import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('cart')) || []; }
        catch { return []; }
    });

    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem('favorites')) || []; }
        catch { return []; }
    });

    // ─── Carrito ───────────────────────────────────────────────
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            const updated = exists
                ? prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
                : [...prev, { ...product, qty: 1 }];
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    const updateQty = (id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCart((prev) => {
            const updated = prev.map((p) => p.id === id ? { ...p, qty } : p);
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const cartTotal = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
    const cartCount = cart.reduce((sum, p) => sum + p.qty, 0);

    // ─── Favoritos ─────────────────────────────────────────────
    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            const updated = exists
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product];
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (id) => favorites.some((p) => p.id === id);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
            favorites, toggleFavorite, isFavorite,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
