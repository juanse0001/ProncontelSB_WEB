import { useState } from 'react';
import { useRouter } from 'next/router';

// URL base de la API del backend desde variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación de email
    if (!validateEmail(email)) {
      setError('Por favor, ingrese un email válido');
      return;
    }

    // Validación de contraseña
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login. Inténtalo de nuevo.');
      }

      // Guardar el token JWT
      localStorage.setItem('admin_jwt_token', data.token);
      
      // Redirigir al panel de administración
      router.push('/admin');
    } catch (err) {
      console.error('Error de login:', err);
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Administrador</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="admin@example.com" 
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="Contraseña" 
            minLength={6}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <button 
          type="button"
          onClick={() => router.push('/')}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded font-bold hover:bg-gray-400 transition"
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default Login;
