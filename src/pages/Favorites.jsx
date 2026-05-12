import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

function Favorites() {
  const { favorites, toggleFavorite, addToCart, isFavorite } = useCart();

  if (favorites.length === 0) {
    return (
      <main className="favorites-page">
        <div className="favorites-page__container">
          <h1 className="favorites-page__title">Favoritos</h1>
          <div className="favorites-page__empty">
            <p>No tienes productos en favoritos.</p>
            <Link to="/products" className="favorites-page__btn">
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <div className="favorites-page__container">
        <h1 className="favorites-page__title">
          Favoritos <span className="favorites-page__count">({favorites.length})</span>
        </h1>

        <div className="favorites-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Favorites;
