import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas (por ahora públicas, JWT en Sprint 3) */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
