import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientApi } from '../utils/api';
import { mockClients } from '../utils/mockData';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye } from 'react-icons/fi';
import './Clients.css';

interface Client {
  id: string;
  name: string;
  rfc?: string;
  sector?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  projects?: any[];
}

const Clients = () => {
  const navigate = useNavigate();
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    rfc: '',
    sector: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientApi.getAll();
      const clientsData = response.data.data;
      setAllClients(clientsData);
      setClients(clientsData);
    } catch (error) {
      // Si falla, usar mocks directamente
      setAllClients(mockClients);
      setClients(mockClients);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar clientes
  useEffect(() => {
    let filtered = [...allClients];

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.rfc && client.rfc.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sectorFilter) {
      filtered = filtered.filter(client => client.sector === sectorFilter);
    }

    setClients(filtered);
  }, [searchTerm, sectorFilter, allClients]);

  const sectors = Array.from(new Set(allClients.map(c => c.sector).filter(Boolean)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await clientApi.update(editingClient.id, formData);
      } else {
        await clientApi.create(formData);
      }
      setShowModal(false);
      setEditingClient(null);
      resetForm();
      fetchClients();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al guardar cliente');
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      rfc: client.rfc || '',
      sector: client.sector || '',
      contactName: client.contactName || '',
      contactEmail: client.contactEmail || '',
      contactPhone: client.contactPhone || '',
      address: client.address || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;
    try {
      await clientApi.delete(id);
      fetchClients();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al eliminar cliente');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rfc: '',
      sector: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
    });
  };

  if (loading) {
    return (
      <div className="clients-page">
        <div className="loading-spinner">Cargando clientes...</div>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>Clientes</h1>
        <button className="btn-primary" onClick={() => { setEditingClient(null); resetForm(); setShowModal(true); }}>
          <FiPlus className="btn-icon" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="filters-bar">
        <div className="search-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o RFC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label>Filtrar por sector:</label>
          <select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
            <option value="">Todos los sectores</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RFC</th>
              <th>Sector</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.rfc || '-'}</td>
                <td>{client.sector || '-'}</td>
                <td>{client.contactName || '-'}</td>
                <td>{client.contactEmail || '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-view" onClick={() => navigate(`/clients/${client.id}`)} title="Ver detalles">
                      <FiEye />
                    </button>
                    <button className="btn-edit" onClick={() => handleEdit(client)} title="Editar">
                      <FiEdit2 />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(client.id)} title="Eliminar">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setEditingClient(null); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>RFC</label>
                <input
                  type="text"
                  value={formData.rfc}
                  onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Sector</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Nombre de Contacto</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email de Contacto</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Teléfono de Contacto</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); setEditingClient(null); resetForm(); }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingClient ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;

