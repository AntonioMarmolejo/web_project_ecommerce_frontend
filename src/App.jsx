import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// ─── Scroll al tope en cada navegación ────────────────────
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

// ─── Ruta protegida ────────────────────────────────────────
function PrivateRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    return isLoggedIn
        ? children
        : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

// ─── Layout principal ──────────────────────────────────────
function AppLayout() {
    const { user, logout, isLoggedIn } = useAuth();
    const { cartCount } = useCart();

    return (
        <>
            <Navbar
                isLoggedIn={isLoggedIn}
                userName={user?.name || ''}
                onLogout={logout}
                cartCount={cartCount}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

// ─── App raíz ──────────────────────────────────────────────
function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <AuthProvider>
                    <CartProvider>
                        <ScrollToTop />
                        <AppLayout />
                    </CartProvider>
                </AuthProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
