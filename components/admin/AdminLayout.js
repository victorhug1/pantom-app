import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // if (status === 'loading') {
  //   return <div>Cargando...</div>;
  // }

  // if (status === 'unauthenticated') {
  //   router.push('/admin/login');
  //   return null;
  // }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/leads', label: 'Leads', icon: '👥' },
    { href: '/admin/campaigns', label: 'Campañas', icon: '📧' },
    { href: '/admin/notifications', label: 'Notificaciones', icon: '🔔' },
    { href: '/admin/settings', label: 'Configuración', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#181818] shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold text-white tracking-tight">Pantom Admin</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
            ✕
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-white hover:bg-[#ea5a19] ${
                typeof window !== 'undefined' && window.location.pathname === item.href ? 'bg-[#ea5a19]' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300 ease-in-out`}>
        {/* Top bar */}
        <div className="h-16 bg-[#181818] shadow-sm border-b border-gray-800">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white"
            >
              ☰
            </button>
            <div className="flex items-center">
              {/* <span className="mr-4">{session.user.email}</span> */}
              {/* <button
                onClick={() => router.push('/api/auth/signout')}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button> */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 text-white">
          {children}
        </main>
      </div>
    </div>
  );
} 