import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeCampaigns: 0,
    unreadNotifications: 0,
    emailsSent: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener total de leads
        const leadsRes = await fetch('/api/leads?limit=1');
        const leadsData = await leadsRes.json();
        
        // Obtener campañas activas
        const campaignsRes = await fetch('/api/campaigns?estado=programada');
        const campaignsData = await campaignsRes.json();
        
        // Obtener notificaciones no leídas
        const notificationsRes = await fetch('/api/notifications?read=false');
        const notificationsData = await notificationsRes.json();

        setStats({
          totalLeads: leadsData.pagination?.total || 0,
          activeCampaigns: campaignsData.pagination?.total || 0,
          unreadNotifications: notificationsData.pagination?.total || 0,
          emailsSent: 0 // TODO: Implementar contador de emails enviados
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Leads */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-3xl">👥</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Leads
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalLeads}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-3xl">📧</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Campañas Activas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.activeCampaigns}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Unread Notifications */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-3xl">🔔</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Notificaciones
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.unreadNotifications}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Emails Sent */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-3xl">📨</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Emails Enviados
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.emailsSent}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Actividad Reciente
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500">No hay actividad reciente</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 