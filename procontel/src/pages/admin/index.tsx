import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Contact {
  _id: string;
  nombre: string;
  email: string;
  mensaje: string;
  estado: string;
  fecha: string;
  replies?: {
    replyBody: string;
    replyDate: string;
  }[];
}

// URL base de la API del backend desde variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const AdminPanel = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');

  const checkAuth = () => {
    const token = localStorage.getItem('admin_jwt_token');
    if (!token) {
      router.replace('/admin/login');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!checkAuth()) return;
      fetchContacts();
    }
  }, [router]);

  const fetchContacts = async () => {
    if (!checkAuth()) return;
    
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('admin_jwt_token');
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('admin_jwt_token');
          router.replace('/admin/login');
          return;
        }
        throw new Error(data.message || 'Error al obtener los mensajes');
      }

      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message || 'Error al obtener los mensajes desde la API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, estado: string) => {
    if (!checkAuth()) return;

    try {
      const token = localStorage.getItem('admin_jwt_token');
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('admin_jwt_token');
          router.replace('/admin/login');
          return;
        }
        throw new Error(errorData.message || 'No se pudo actualizar el estado');
      }
      
      fetchContacts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'No se pudo actualizar el estado');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_jwt_token');
    router.push('/admin/login');
  };

  const prepareReply = (contact: Contact) => {
    setSelectedContact(contact);
    setReplyBody(`Hola ${contact.nombre},\n\n`);
    setReplyError('');
  };

  const sendReply = async () => {
    if (!selectedContact || sendingReply) return;
    if (!replyBody.trim()) {
        setReplyError('El cuerpo de la respuesta no puede estar vacío.');
        return;
    }

    setSendingReply(true);
    setReplyError('');

    try {
      const token = localStorage.getItem('admin_jwt_token');
      const res = await fetch(`${API_BASE_URL}/api/contact/${selectedContact._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ replyBody }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('admin_jwt_token');
          router.replace('/admin/login');
          return;
        }
        throw new Error(data.message || 'Error al enviar la respuesta por correo.');
      }

      alert(data.message || 'Respuesta enviada por correo exitosamente.');
      setSelectedContact(null);
      setReplyBody('');
      fetchContacts();

    } catch (err) {
      console.error('Error al enviar respuesta por correo:', err);
      setReplyError(err instanceof Error ? err.message : 'Error de conexión al enviar respuesta.');
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition duration-200 ease-in-out">Cerrar sesión</button>
        </div>
        {selectedContact && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
            <div className="relative p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
              <button 
                onClick={() => setSelectedContact(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                disabled={sendingReply}
                aria-label="Cerrar modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Responder a {selectedContact.nombre}</h2>
              {replyError && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">{replyError}</div>}
              <div className="mb-4 p-3 bg-gray-100 rounded-md">
                <p className="text-gray-700"><strong>Para:</strong> {selectedContact.email}</p>
                <p className="text-gray-700 mt-2"><strong>Mensaje original:</strong></p>
                <div className="border border-gray-300 p-2 rounded bg-white max-h-32 overflow-y-auto text-gray-800 text-sm">{selectedContact.mensaje}</div>
              </div>
              {selectedContact.replies && selectedContact.replies.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-blue-800 font-semibold mb-2">Historial de Respuestas:</p>
                  <div className="max-h-32 overflow-y-auto space-y-3">
                    {selectedContact.replies.map((reply, index) => (
                      <div key={index} className="border border-blue-200 p-2 rounded bg-white text-sm text-gray-800">
                        <p className="font-medium text-blue-700">Respondido el: {new Date(reply.replyDate).toLocaleString()}</p>
                        <p className="mt-1">{reply.replyBody}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="replyBody" className="block mb-2 font-medium text-gray-700">Tu respuesta:</label>
                <textarea
                  id="replyBody"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800" rows={6} required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setSelectedContact(null)} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sendingReply}
                >
                  Cancelar
                </button>
                <button 
                  onClick={sendReply} 
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sendingReply}
                >
                  {sendingReply ? 'Enviando...' : 'Enviar Correo'}
                </button>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <div className="text-center py-10 text-gray-700">Cargando mensajes...</div>
        ) : error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded text-center border border-red-400">{error}</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-10 text-gray-700">No hay mensajes para mostrar.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((c, index) => (
                  <tr key={c._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.nombre}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                    <td className="py-3 px-4 max-w-xs break-words text-sm text-gray-500">{c.mensaje}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500 capitalize">{c.estado}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{new Date(c.fecha).toLocaleString()}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                        onClick={() => prepareReply(c)}
                      >
                        Responder
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                        onClick={() => handleStatus(c._id, 'leído')}
                        disabled={c.estado === 'leído' || c.estado === 'respondido'}
                      >
                        Marcar como Leído
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                        onClick={() => handleStatus(c._id, 'respondido')}
                        disabled={c.estado === 'respondido'}
                      >
                        Marcar como Respondido
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
