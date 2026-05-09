import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgIndex, setImgIndex] = useState(0);
    const [added, setAdded] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    // ─── Cargar producto ───────────────────────────────────────
    useEffect(() => {
        setLoading(true);
        setError(null);
        setImgIndex(0);

        getProductById(id)
            .then((data) => {
                setProduct(data);
                return getRelatedProducts(id);
            })
            .then((rel) => setRelated(rel.slice(0, 4)))
            .catch(() => setError('No se pudo cargar el producto.'))
            .finally(() => setLoading(false));
    }, [id]);

    // ─── Carrito ───────────────────────────────────────────────
    const handleAddToCart = (prod = product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === prod.id);
            const updated = exists
                ? prev.map((p) => p.id === prod.id ? { ...p, qty: p.qty + 1 } : p)
                : [...prev, { ...prod, qty: 1 }];
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
        // Feedback visual por 1.5s
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    // ─── Favoritos ─────────────────────────────────────────────
    const handleToggleFavorite = (prod = product) => {
        setFavorites((prev) => {
            const exists = prev.find((p) => p.id === prod.id);
            const updated = exists
                ? prev.filter((p) => p.id !== prod.id)
                : [...prev, prod];
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (pid) => favorites.some((p) => p.id === pid);

    // ─── Limpiar imagen de Platzi API ──────────────────────────
    const cleanImage = (url) =>
        typeof url === 'string' ? url.replace(/[\[\]"]/g, '') : 'https://placehold.co/600x600?text=Sin+imagen';

    // ─── Estados ───────────────────────────────────────────────
    if (loading) return (
        <main className="detail-page">
            <div className="detail-page__container">
                <div className="detail-skeleton">
                    <div className="detail-skeleton__img" />
                    <div className="detail-skeleton__info">
                        <div className="detail-skeleton__line detail-skeleton__line_title" />
                        <div className="detail-skeleton__line" />
                        <div className="detail-skeleton__line detail-skeleton__line_short" />
                    </div>
                </div>
            </div>
        </main>
    );

    if (error) return (
        <main className="detail-page">
            <div className="detail-page__container">
                <div className="detail-page__error">
                    <p>{error}</p>
                    <button className="detail-page__btn detail-page__btn_primary" onClick={() => navigate('/products')}>
                        Volver al catálogo
                    </button>
                </div>
            </div>
        </main>
    );

    const images = Array.isArray(product.images) ? product.images.map(cleanImage) : [];
    const mainImage = images[imgIndex] || 'https://placehold.co/600x600?text=Sin+imagen';

    return (
        <main className="detail-page">
            <div className="detail-page__container">

                {/* Breadcrumb */}
                <nav className="detail-page__breadcrumb">
                    <button onClick={() => navigate('/products')}>Catálogo</button>
                    <span>/</span>
                    <span>{product.category?.name}</span>
                    <span>/</span>
                    <span className="detail-page__breadcrumb_active">{product.title}</span>
                </nav>

                {/* Layout principal */}
                <div className="detail-page__layout">

                    {/* Columna izquierda — imágenes */}
                    <div className="detail-page__images">
                        <div className="detail-page__main-img-wrap">
                            <img
                                src={mainImage}
                                alt={product.title}
                                className="detail-page__main-img"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=Sin+imagen'; }}
                            />
                        </div>
                        {/* Miniaturas */}
                        {images.length > 1 && (
                            <div className="detail-page__thumbs">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`detail-page__thumb ${i === imgIndex ? 'detail-page__thumb_active' : ''}`}
                                        onClick={() => setImgIndex(i)}
                                    >
                                        <img src={img} alt={`Vista ${i + 1}`} onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=?'; }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Columna derecha — info */}
                    <div className="detail-page__info">
                        {product.category && (
                            <span className="detail-page__category">{product.category.name}</span>
                        )}
                        <h1 className="detail-page__title">{product.title}</h1>
                        <p className="detail-page__price">${product.price}</p>
                        <p className="detail-page__description">{product.description}</p>

                        {/* Acciones */}
                        <div className="detail-page__actions">
                            <button
                                className={`detail-page__btn detail-page__btn_primary ${added ? 'detail-page__btn_added' : ''}`}
                                onClick={() => handleAddToCart()}
                            >
                                {added ? '✓ Añadido' : 'Añadir al carrito'}
                            </button>
                            <button
                                className={`detail-page__btn detail-page__btn_fav ${isFavorite(product.id) ? 'detail-page__btn_fav_active' : ''}`}
                                onClick={() => handleToggleFavorite()}
                                aria-label="Favoritos"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite(product.id) ? '#2F71E5' : 'none'} stroke={isFavorite(product.id) ? '#2F71E5' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Productos relacionados */}
                {related.length > 0 && (
                    <section className="detail-page__related">
                        <h2 className="detail-page__related-title">Productos relacionados</h2>
                        <div className="detail-page__related-grid">
                            {related.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    onAddToCart={handleAddToCart}
                                    onToggleFavorite={handleToggleFavorite}
                                    isFavorite={isFavorite(p.id)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default ProductDetail;
