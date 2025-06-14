import { useState } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor, ingrese un email válido');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro. Inténtalo de nuevo.');
      }

      // Redirigir al login después del registro exitoso
      router.push('/admin/login');
    } catch (err) {
      console.error('Error de registro:', err);
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Administrador</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nombre</label>
          <input 
            type="text" 
            name="nombre"
            value={formData.nombre} 
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="Tu nombre completo" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="admin@example.com" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Contraseña</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="Contraseña" 
            minLength={6}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirmar Contraseña</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword} 
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
            placeholder="Confirmar contraseña" 
            minLength={6}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
          <button 
            type="button"
            onClick={() => router.push('/admin/login')}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded font-bold hover:bg-gray-400 transition"
          >
            Volver al Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register; 