import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectApi, clientApi } from '../utils/api';
import { mockProjects, mockClients } from '../utils/mockData';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye } from 'react-icons/fi';
import './Projects.css';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string | null;
  progress?: number;
  client?: {
    id: string;
    name: string;
  };
}

interface Client {
  id: string;
  name: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [formData, setFormData] = useState({
    clientId: '',
    name: '',
    description: '',
    status: 'activo',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        projectApi.getAll(),
        clientApi.getAll(),
      ]);
      const projectsData = projectsRes.data.data;
      setAllProjects(projectsData);
      setProjects(projectsData);
      setClients(clientsRes.data.data);
    } catch (error) {
      // Si falla, usar mocks directamente
      setAllProjects(mockProjects);
      setProjects(mockProjects);
      setClients(mockClients);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar proyectos
  useEffect(() => {
    let filtered = [...allProjects];

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (clientFilter) {
      filtered = filtered.filter(project => project.client?.id === clientFilter);
    }

    setProjects(filtered);
  }, [searchTerm, statusFilter, clientFilter, allProjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
      };
      if (editingProject) {
        await projectApi.update(editingProject.id, submitData);
      } else {
        await projectApi.create(submitData);
      }
      setShowModal(false);
      setEditingProject(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al guardar proyecto');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      clientId: project.client?.id || '',
      name: project.name || '',
      description: project.description || '',
      status: project.status || 'activo',
      startDate: project.startDate ? project.startDate.split('T')[0] : '',
      endDate: project.endDate ? project.endDate.split('T')[0] : '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
    try {
      await projectApi.delete(id);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Error al eliminar proyecto');
    }
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      name: '',
      description: '',
      status: 'activo',
      startDate: '',
      endDate: '',
    });
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="loading-spinner">Cargando proyectos...</div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Proyectos</h1>
        <button className="btn-primary" onClick={() => { setEditingProject(null); resetForm(); setShowModal(true); }}>
          <FiPlus className="btn-icon" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="filters-bar">
        <div className="search-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre de proyecto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label>Estado:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="pausado">Pausado</option>
            <option value="completado">Completado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Cliente:</label>
          <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
            <option value="">Todos</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Avance</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.client?.name || '-'}</td>
                <td>
                  <span className={`status-badge status-${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(project as any).progress || 0}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{(project as any).progress || 0}%</span>
                  </div>
                </td>
                <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}</td>
                <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-view" onClick={() => navigate(`/projects/${project.id}`)} title="Ver detalles">
                      <FiEye />
                    </button>
                    <button className="btn-edit" onClick={() => handleEdit(project)} title="Editar">
                      <FiEdit2 />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(project.id)} title="Eliminar">
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
        <div className="modal-overlay" onClick={() => { setShowModal(false); setEditingProject(null); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cliente *</label>
                <select
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  required
                  disabled={!!editingProject}
                >
                  <option value="">Seleccionar cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
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
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="activo">Activo</option>
                  <option value="pausado">Pausado</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Fecha de Fin</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); setEditingProject(null); resetForm(); }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingProject ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

