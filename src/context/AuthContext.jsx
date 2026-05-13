import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Cargar perfil si hay token al montar
    useEffect(() => {
        if (token) {
            api.get('/auth/profile')
                .then((r) => setUser(r.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    // ─── Login ─────────────────────────────────────────────────
    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        const { access_token } = data;
        localStorage.setItem('token', access_token);
        setToken(access_token);

        // Obtener perfil
        const profile = await api.get('/auth/profile');
        setUser(profile.data);
        showToast('Sesión iniciada correctamente', 'info');
        return profile.data;
    };

    // ─── Registro ──────────────────────────────────────────────
    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    };

    // ─── Logout ────────────────────────────────────────────────
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        showToast('Sesión cerrada', 'info');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
