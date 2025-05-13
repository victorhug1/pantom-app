import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState({
    emailSettings: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPass: '',
      fromEmail: '',
      fromName: '',
    },
    notificationSettings: {
      emailNotifications: true,
      browserNotifications: true,
    },
    securitySettings: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({
        type: 'error',
        text: 'Error al cargar la configuración',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: 'Configuración guardada exitosamente',
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({
        type: 'error',
        text: 'Error al guardar la configuración',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando configuración...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Configuración de Email */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración de Email</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                <input
                  type="text"
                  value={settings.emailSettings.smtpHost}
                  onChange={(e) => handleChange('emailSettings', 'smtpHost', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                <input
                  type="text"
                  value={settings.emailSettings.smtpPort}
                  onChange={(e) => handleChange('emailSettings', 'smtpPort', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP User</label>
                <input
                  type="text"
                  value={settings.emailSettings.smtpUser}
                  onChange={(e) => handleChange('emailSettings', 'smtpUser', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                <input
                  type="password"
                  value={settings.emailSettings.smtpPass}
                  onChange={(e) => handleChange('emailSettings', 'smtpPass', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">From Email</label>
                <input
                  type="email"
                  value={settings.emailSettings.fromEmail}
                  onChange={(e) => handleChange('emailSettings', 'fromEmail', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">From Name</label>
                <input
                  type="text"
                  value={settings.emailSettings.fromName}
                  onChange={(e) => handleChange('emailSettings', 'fromName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Configuración de Notificaciones */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración de Notificaciones</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.notificationSettings.emailNotifications}
                  onChange={(e) =>
                    handleChange('notificationSettings', 'emailNotifications', e.target.checked)
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                  Notificaciones por Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="browserNotifications"
                  checked={settings.notificationSettings.browserNotifications}
                  onChange={(e) =>
                    handleChange('notificationSettings', 'browserNotifications', e.target.checked)
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="browserNotifications" className="ml-2 block text-sm text-gray-900">
                  Notificaciones del Navegador
                </label>
              </div>
            </div>
          </div>

          {/* Configuración de Seguridad */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración de Seguridad</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={settings.securitySettings.twoFactorAuth}
                  onChange={(e) =>
                    handleChange('securitySettings', 'twoFactorAuth', e.target.checked)
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-900">
                  Autenticación de Dos Factores
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiempo de Sesión (minutos)
                </label>
                <input
                  type="number"
                  value={settings.securitySettings.sessionTimeout}
                  onChange={(e) =>
                    handleChange('securitySettings', 'sessionTimeout', parseInt(e.target.value))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 