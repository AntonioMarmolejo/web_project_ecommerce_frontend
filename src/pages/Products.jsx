import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';
import { useCart } from '../context/CartContext';
import '../styles/Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({});

    const { addToCart, toggleFavorite, isFavorite } = useCart();

    const LIMIT = 12;

    // ─── Cargar productos ──────────────────────────────────────
    useEffect(() => {
        setLoading(true);
        setError(null);

        getProducts({ page, limit: LIMIT, ...filters })
            .then(({ data, pagination }) => {
                setProducts(data);
                setHasMore(pagination.count === LIMIT);
            })
            .catch(() => setError('No se pudieron cargar los productos.'))
            .finally(() => setLoading(false));
    }, [page, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };

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

                <SearchFilters onFilterChange={handleFilterChange} />

                {!loading && products.length === 0 && (
                    <div className="products-page__empty">
                        No se encontraron productos con esos filtros.
                    </div>
                )}

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
                                onAddToCart={addToCart}
                                onToggleFavorite={toggleFavorite}
                                isFavorite={isFavorite(product.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {!loading && products.length > 0 && (
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
