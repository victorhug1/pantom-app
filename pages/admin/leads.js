import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useState, useEffect } from 'react';

function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d)) return '-';
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// Función auxiliar para buscar el valor correcto entre variantes de nombre
function getField(lead, variants) {
  for (const v of variants) {
    if (lead[v] !== undefined && lead[v] !== null && lead[v] !== '') return lead[v];
  }
  return '-';
}

// Columnas principales para la tabla (con variantes)
const columnasPrincipales = [
  { label: 'Representante Legal', variants: ['RepresentanteLegal', 'representante_legal', 'representante legal', 'representante', 'Nombre', 'nombre'] },
  { label: 'Tipo de organización', variants: ['TipoOrganizacion', 'tipo_de_organizacion', 'tipo de organización', 'tipo_organizacion'] },
  { label: 'Correo Comercial', variants: ['CorreoElectronicoComercial', 'correo_electronico_comercial', 'correo comercial', 'Email', 'email'] },
  { label: 'Teléfono 1', variants: ['Telefono1', 'telefono1', 'teléfono_1', 'teléfono1', 'Telefono_1'] },
  { label: 'Teléfono 2', variants: ['Telefono2', 'telefono2', 'teléfono_2', 'teléfono2', 'Telefono_2'] },
];

function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;
  // Ocultar los campos principales en el modal
  const omitKeys = [
    ...columnasPrincipales.flatMap(col => col.variants),
    '_id'
  ];
  const detalles = Object.entries(lead).filter(([key]) => !omitKeys.includes(key));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Detalles del Lead</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="col-span-2 mb-4">
            {columnasPrincipales.map(col => (
              <div key={col.label}>
                <span className="font-semibold text-gray-800">{col.label}:</span> <span className="text-gray-900 font-medium">{getField(lead, col.variants)}</span>
              </div>
            ))}
          </div>
          {detalles.map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold text-gray-800 capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
              {typeof value === 'string' && value.startsWith('http') ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all font-medium">{value}</a>
              ) : Array.isArray(value) ? (
                <span className="text-gray-900 font-medium">{value.join(', ')}</span>
              ) : (
                <span className="text-gray-900 font-medium">{value?.toString() || '-'}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ segmento: '', search: '' });
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line
  }, [page, filters]);

  async function fetchLeads() {
    setLoading(true);
    let url = `/api/leads?page=${page}&limit=10`;
    if (filters.segmento) url += `&segmento=${filters.segmento}`;
    if (filters.search) url += `&email=${filters.search}`;
    const res = await fetch(url);
    const data = await res.json();
    setLeads(data.leads || []);
    setTotalPages(data.pagination?.pages || 1);
    setLoading(false);
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Leads</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Nuevo Lead</button>
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre, email, empresa..."
            className="border px-3 py-2 rounded w-1/3"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Segmento"
            className="border px-3 py-2 rounded w-1/4"
            value={filters.segmento}
            onChange={e => setFilters(f => ({ ...f, segmento: e.target.value }))}
          />
        </div>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                {columnasPrincipales.map(col => (
                  <th key={col.label} className="px-3 py-2">{col.label}</th>
                ))}
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={columnasPrincipales.length + 1} className="text-center py-6">Cargando...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={columnasPrincipales.length + 1} className="text-center py-6">No hay leads</td></tr>
              ) : leads.map(lead => (
                <tr key={lead._id} className="border-b hover:bg-gray-50">
                  {columnasPrincipales.map(col => (
                    <td key={col.label} className="px-3 py-2 text-gray-900 font-medium">
                      {getField(lead, col.variants)}
                    </td>
                  ))}
                  <td className="px-3 py-2 flex gap-2">
                    <button className="text-indigo-700 hover:underline font-semibold" onClick={() => setSelectedLead(lead)}>Ver detalles</button>
                    <button className="text-red-700 hover:underline font-semibold">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Mostrando página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded border bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >Anterior</button>
            <button
              className="px-3 py-1 rounded border bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >Siguiente</button>
          </div>
        </div>
        <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      </div>
    </AdminLayout>
  );
} 