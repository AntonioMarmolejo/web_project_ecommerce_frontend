import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../services/api';
import '../styles/SearchFilters.css';

// Debounce: espera Xms después del último cambio antes de ejecutar
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

function SearchFilters({ onFilterChange }) {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [categories, setCategories] = useState([]);

    // Debounce solo en el input de texto (500ms)
    const debouncedTitle = useDebounce(title, 500);

    // Cargar categorías al montar
    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => console.error('No se pudieron cargar las categorías'));
    }, []);

    // Notificar al padre cuando cambian los filtros
    useEffect(() => {
        onFilterChange({
            title: debouncedTitle || undefined,
            categoryId: categoryId || undefined,
            price_min: priceMin || undefined,
            price_max: priceMax || undefined,
        });
    }, [debouncedTitle, categoryId, priceMin, priceMax]);

    const handleReset = () => {
        setTitle('');
        setCategoryId('');
        setPriceMin('');
        setPriceMax('');
    };

    const hasFilters = title || categoryId || priceMin || priceMax;

    return (
        <div className="search-filters">

            {/* Input de búsqueda */}
            <div className="search-filters__search">
                <svg className="search-filters__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    className="search-filters__input"
                    placeholder="Buscar productos..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {title && (
                    <button className="search-filters__clear-input" onClick={() => setTitle('')} aria-label="Limpiar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                )}
            </div>

            {/* Selector de categoría */}
            <select
                className="search-filters__select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            {/* Rango de precio */}
            <div className="search-filters__price">
                <input
                    type="number"
                    className="search-filters__input search-filters__input_price"
                    placeholder="Precio mín."
                    value={priceMin}
                    min="0"
                    onChange={(e) => setPriceMin(e.target.value)}
                />
                <span className="search-filters__price-sep">—</span>
                <input
                    type="number"
                    className="search-filters__input search-filters__input_price"
                    placeholder="Precio máx."
                    value={priceMax}
                    min="0"
                    onChange={(e) => setPriceMax(e.target.value)}
                />
            </div>

            {/* Botón limpiar filtros */}
            {hasFilters && (
                <button className="search-filters__reset" onClick={handleReset}>
                    Limpiar filtros
                </button>
            )}
        </div>
    );
}

export default SearchFilters;
