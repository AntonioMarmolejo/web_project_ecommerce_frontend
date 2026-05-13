import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import '../styles/Home.css';

function Home() {
    const [featured, setFeatured] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, toggleFavorite, isFavorite } = useCart();

    useEffect(() => {
        Promise.all([
            getProducts({ limit: 4 }),
            getCategories(),
        ])
            .then(([productsRes, cats]) => {
                setFeatured(productsRes.data ?? productsRes);
                setCategories((Array.isArray(cats) ? cats : cats.data ?? []).slice(0, 6));
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="home">

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="home__hero">
                <div className="home__hero-content">
                    <p className="home__hero-eyebrow">Nueva colección 2025</p>
                    <h1 className="home__hero-title">Moda que habla<br />por ti</h1>
                    <p className="home__hero-sub">
                        Miles de productos, envío rápido y los mejores precios del mercado.
                    </p>
                    <div className="home__hero-actions">
                        <Link to="/products" className="home__btn home__btn_primary">
                            Ver catálogo
                        </Link>
                        <Link to="/register" className="home__btn home__btn_ghost">
                            Crear cuenta
                        </Link>
                    </div>
                </div>
                <div className="home__hero-glow" aria-hidden="true" />
            </section>

            {/* ── Categorías ───────────────────────────────────── */}
            {categories.length > 0 && (
                <section className="home__section">
                    <h2 className="home__section-title">Explorar categorías</h2>
                    <div className="home__categories">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/products?category=${cat.id}`}
                                className="home__category-chip"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Productos destacados ──────────────────────────── */}
            <section className="home__section home__section_grey">
                <div className="home__section-header">
                    <h2 className="home__section-title home__section-title_inline">
                        Productos destacados
                    </h2>
                    <Link to="/products" className="home__link-all">Ver todos →</Link>
                </div>

                {loading ? (
                    <div className="home__grid">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="product-skeleton" />
                        ))}
                    </div>
                ) : (
                    <div className="home__grid">
                        {featured.map((product) => (
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
            </section>

            {/* ── Ventajas ─────────────────────────────────────── */}
            <section className="home__features">
                <div className="home__feature">
                    <svg className="home__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="1" />
                        <path d="M16 8h4l3 5v3h-7V8z" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <strong>Envío gratis</strong>
                    <p>En pedidos mayores a $50</p>
                </div>
                <div className="home__feature">
                    <svg className="home__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <strong>Pago seguro</strong>
                    <p>Tus datos siempre protegidos</p>
                </div>
                <div className="home__feature">
                    <svg className="home__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 .49-4.49" />
                    </svg>
                    <strong>Devoluciones</strong>
                    <p>30 días sin preguntas</p>
                </div>
                <div className="home__feature">
                    <svg className="home__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <strong>Soporte 24/7</strong>
                    <p>Estamos aquí para ayudarte</p>
                </div>
            </section>

        </main>
    );
}

export default Home;
