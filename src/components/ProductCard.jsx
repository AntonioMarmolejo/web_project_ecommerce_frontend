import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
    const { id, title, price, images, category } = product;

    // Platzi API a veces devuelve URLs con corchetes o caracteres extraños
    const imageUrl = Array.isArray(images) && images[0]
        ? images[0].replace(/[\[\]"]/g, '')
        : 'https://placehold.co/300x300?text=Sin+imagen';

    const handleAddToCart = (e) => {
        e.preventDefault(); // evita navegar al detalle
        onAddToCart && onAddToCart(product);
    };

    const handleFavorite = (e) => {
        e.preventDefault();
        onToggleFavorite && onToggleFavorite(product);
    };

    return (
        <Link to={`/products/${id}`} className="product-card">
            {/* Imagen */}
            <div className="product-card__image-wrap">
                <img
                    src={imageUrl}
                    alt={title}
                    className="product-card__image"
                    onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=Sin+imagen'; }}
                />
                {/* Botón favorito */}
                <button
                    className={`product-card__fav ${isFavorite ? 'product-card__fav_active' : ''}`}
                    onClick={handleFavorite}
                    aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? '#2F71E5' : 'none'} stroke={isFavorite ? '#2F71E5' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Info */}
            <div className="product-card__body">
                {category && (
                    <span className="product-card__category">{category.name}</span>
                )}
                <h3 className="product-card__title">{title}</h3>
                <div className="product-card__footer">
                    <span className="product-card__price">${price}</span>
                    <button className="product-card__btn" onClick={handleAddToCart}>
                        Añadir
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
