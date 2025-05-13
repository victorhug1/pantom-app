import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useState, useEffect } from 'react';

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState('');
  const [read, setRead] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, [page, type, read]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: 10,
        ...(type && { type }),
        ...(read && { read })
      });

      const response = await fetch(`/api/notifications?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email_sent':
        return 'bg-green-100 text-green-800';
      case 'email_opened':
        return 'bg-blue-100 text-blue-800';
      case 'email_clicked':
        return 'bg-purple-100 text-purple-800';
      case 'email_bounced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email_sent':
        return '📨';
      case 'email_opened':
        return '👁️';
      case 'email_clicked':
        return '🖱️';
      case 'email_bounced':
        return '❌';
      default:
        return '📌';
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notifications?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
          <button 
            onClick={() => {
              setRead('');
              setType('');
              setPage(1);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Limpiar filtros
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Todos</option>
                <option value="email_sent">Email Enviado</option>
                <option value="email_opened">Email Abierto</option>
                <option value="email_clicked">Email Click</option>
                <option value="email_bounced">Email Rebotado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={read}
                onChange={(e) => setRead(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Todos</option>
                <option value="false">No leídos</option>
                <option value="true">Leídos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Notificaciones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Cargando...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No se encontraron notificaciones
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                            {notification.type.replace('_', ' ')}
                          </span>
                          {!notification.read && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Nuevo
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-900">
                          {notification.details}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Marcar como leído
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Paginación */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando página <span className="font-medium">{page}</span> de{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 