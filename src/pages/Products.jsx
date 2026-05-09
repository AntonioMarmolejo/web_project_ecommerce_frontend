import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const LIMIT = 12;

    // ─── Cargar productos ──────────────────────────────────────
    useEffect(() => {
        setLoading(true);
        setError(null);

        getProducts({ page, limit: LIMIT })
            .then(({ data, pagination }) => {
                setProducts(data);
                setHasMore(pagination.count === LIMIT);
            })
            .catch(() => setError('No se pudieron cargar los productos.'))
            .finally(() => setLoading(false));
    }, [page]);

    // ─── Carrito ───────────────────────────────────────────────
    const handleAddToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            const updated = exists
                ? prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
                : [...prev, { ...product, qty: 1 }];
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    // ─── Favoritos ─────────────────────────────────────────────
    const handleToggleFavorite = (product) => {
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

    // ─── Render ────────────────────────────────────────────────
    if (error) {
        return (
            <main className="products-page">
                <div className="products-page__error">
                    <p>{error}</p>
                    <button className="products-page__retry" onClick={() => setPage(1)}>
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="products-page">
            <div className="products-page__container">
                <h1 className="products-page__title">Catálogo</h1>

                {/* Grilla */}
                {loading ? (
                    <div className="products-grid">
                        {Array.from({ length: LIMIT }).map((_, i) => (
                            <div key={i} className="product-skeleton" />
                        ))}
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={isFavorite(product.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {!loading && (
                    <div className="products-page__pagination">
                        <button
                            className="products-page__page-btn"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            ← Anterior
                        </button>
                        <span className="products-page__page-num">Página {page}</span>
                        <button
                            className="products-page__page-btn"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!hasMore}
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Products;
