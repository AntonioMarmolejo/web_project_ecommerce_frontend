import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ cartCount = 0, favCount = 0, isLoggedIn = false, userName = '' }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <header className="navbar">
            <div className="navbar__container">

                <Link to="/" className="navbar__logo">StyleStore</Link>

                <nav className="navbar__nav">
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'navbar__link navbar__link_active' : 'navbar__link'}>
                        Catálogo
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? 'navbar__link navbar__link_active' : 'navbar__link'}>
                        Favoritos
                    </NavLink>
                </nav>

                <div className="navbar__actions">
                    <Link to="/cart" className="navbar__icon-btn" aria-label="Carrito">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
                    </Link>

                    {isLoggedIn ? (
                        <div className="navbar__user">
                            <span className="navbar__username">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                                {userName}
                            </span>
                            <button className="navbar__btn navbar__btn_ghost" onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    ) : (
                        <div className="navbar__auth">
                            <Link to="/login" className="navbar__btn navbar__btn_ghost">Iniciar sesión</Link>
                            <Link to="/register" className="navbar__btn navbar__btn_primary">Inscribirse</Link>
                        </div>
                    )}

                    <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
                        {menuOpen
                            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        }
                    </button>
                </div>
            </div>

            {/* Menú mobile */}
            <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu_open' : ''}`}>
                <NavLink to="/products" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Catálogo</NavLink>
                <NavLink to="/favorites" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Favoritos</NavLink>
                <NavLink to="/cart" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                    Carrito {cartCount > 0 && `(${cartCount})`}
                </NavLink>
                <div className="navbar__mobile-auth">
                    {isLoggedIn ? (
                        <>
                            <span className="navbar__mobile-username">{userName}</span>
                            <button className="navbar__btn navbar__btn_ghost navbar__btn_full" onClick={() => { handleLogout(); setMenuOpen(false); }}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar__btn navbar__btn_ghost navbar__btn_full" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                            <Link to="/register" className="navbar__btn navbar__btn_primary navbar__btn_full" onClick={() => setMenuOpen(false)}>Inscribirse</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
