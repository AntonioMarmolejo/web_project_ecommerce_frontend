import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== password2) {
            return setError('Las contraseñas no coinciden.');
        }
        if (password.length < 4) {
            return setError('La contraseña debe tener al menos 4 caracteres.');
        }

        setLoading(true);
        try {
            await register(name, email, password);
            // Registro exitoso — mostrar mensaje y redirigir al login
            navigate('/login', { state: { registered: true } });
        } catch {
            setError('Este email ya está en uso o los datos son inválidos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">Inscribirse</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-form__field">
                        <input
                            type="text"
                            className="auth-form__input"
                            placeholder="Nombre de usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-form__field">
                        <input
                            type="email"
                            className={`auth-form__input ${error && error.includes('email') ? 'auth-form__input_error' : ''}`}
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-form__field">
                        <input
                            type="password"
                            className="auth-form__input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-form__field">
                        <input
                            type="password"
                            className={`auth-form__input ${error && error.includes('coinciden') ? 'auth-form__input_error' : ''}`}
                            placeholder="Volver a escribir la contraseña"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="auth-form__error">{error}</p>}

                    <button type="submit" className="auth-form__btn" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Inscribirse'}
                    </button>
                </form>

                <p className="auth-card__footer">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="auth-card__link">Iniciar sesión</Link>
                </p>
            </div>
        </main>
    );
}

export default Register;
