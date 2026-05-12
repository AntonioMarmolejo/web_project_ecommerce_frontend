import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useCart();

  const cleanImage = (url) =>
    typeof url === 'string' ? url.replace(/[\[\]"]/g, '') : 'https://placehold.co/80x80?text=?';

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page__container">
          <h1 className="cart-page__title">Carrito</h1>
          <div className="cart-page__empty">
            <p>Tu carrito está vacío.</p>
            <Link to="/products" className="cart-page__btn cart-page__btn_primary">
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">Carrito</h1>

        <div className="cart-page__layout">
          {/* Lista de productos */}
          <div className="cart-page__items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={cleanImage(Array.isArray(item.images) ? item.images[0] : item.images)}
                  alt={item.title}
                  className="cart-item__img"
                  onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=?'; }}
                />
                <div className="cart-item__info">
                  <p className="cart-item__title">{item.title}</p>
                  <p className="cart-item__price">${item.price}</p>
                </div>
                <div className="cart-item__qty">
                  <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="cart-item__qty-num">{item.qty}</span>
                  <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p className="cart-item__subtotal">${(item.price * item.qty).toFixed(2)}</p>
                <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}

            <button className="cart-page__clear" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div className="cart-page__summary">
            <h2 className="cart-page__summary-title">Resumen</h2>
            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-page__summary-row">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="cart-page__btn cart-page__btn_primary">
              Proceder al pago
            </button>
            <Link to="/products" className="cart-page__btn cart-page__btn_ghost">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
