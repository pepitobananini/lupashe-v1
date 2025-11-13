import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientApi, projectApi, statsApi } from '../utils/api';
import { mockTrainings, mockProjects, mockCertificates, mockFormSubmissions, mockClients } from '../utils/mockData';
import { FiUsers, FiFolder, FiBookOpen, FiAward, FiFileText, FiCalendar, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    activeProjects: 0,
    trainings: 0,
    certificates: 0,
    formSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30days');
  const [selectedClient, setSelectedClient] = useState('');
  const [clients, setClients] = useState<any[]>([]);
  const [upcomingTrainings, setUpcomingTrainings] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, projectsRes, statsRes] = await Promise.all([
          clientApi.getAll(),
          projectApi.getAll(),
          statsApi.getStats(),
        ]);

        const clientsData = clientsRes.data.data;
        const projectsData = projectsRes.data.data;
        const additionalStats = statsRes.data.data;

        setClients(clientsData);
        setStats({
          clients: clientsData.length,
          projects: projectsData.length,
          activeProjects: projectsData.filter((p: any) => p.status === 'activo').length,
          trainings: additionalStats.trainings || 0,
          certificates: additionalStats.certificates || 0,
          formSubmissions: additionalStats.formSubmissions || 0,
        });

        // Filtrar capacitaciones próximas
        const now = new Date();
        const upcoming = mockTrainings
          .filter(t => new Date(t.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5);
        setUpcomingTrainings(upcoming);

        // Proyectos recientes
        const recent = [...projectsData]
          .sort((a: any, b: any) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime())
          .slice(0, 5);
        setRecentProjects(recent);
      } catch (error) {
        // Si falla, usar mocks directamente
        const clientsData = mockClients;
        const projectsData = mockProjects;
        setClients(clientsData);
        setStats({
          clients: clientsData.length,
          projects: projectsData.length,
          activeProjects: projectsData.filter((p: any) => p.status === 'activo').length,
          trainings: mockTrainings.length,
          certificates: mockCertificates.length,
          formSubmissions: mockFormSubmissions.length,
        });

        // Filtrar capacitaciones próximas
        const now = new Date();
        const upcoming = mockTrainings
          .filter(t => new Date(t.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5);
        setUpcomingTrainings(upcoming);

        // Proyectos recientes
        const recent = [...projectsData]
          .sort((a: any, b: any) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime())
          .slice(0, 5);
        setRecentProjects(recent);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calcular indicadores de cumplimiento
  const activeProjectsCount = mockProjects.filter(p => p.status === 'activo').length;
  const totalProjects = mockProjects.length;
  const activePercentage = totalProjects > 0 ? Math.round((activeProjectsCount / totalProjects) * 100) : 0;

  // Certificados y formularios del periodo
  const periodCertificates = mockCertificates.length;
  const periodForms = mockFormSubmissions.length;

  // Resumen rápido
  const activeProjectsWithClient = selectedClient 
    ? mockProjects.filter(p => p.client.id === selectedClient)
    : mockProjects.filter(p => p.status === 'activo');
  
  const weeklyCertificates = mockCertificates.filter(c => {
    const certDate = new Date(c.issuedDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return certDate >= weekAgo;
  }).length;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Centro de control - Resumen general de la plataforma</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="dashboard-filters">
        <div className="filter-group">
          <label>Rango de fechas:</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="30days">Últimos 30 días</option>
            <option value="month">Este mes</option>
            <option value="year">Año actual</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Cliente:</label>
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
            <option value="">Todos los clientes</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>Clientes</h3>
            <p className="stat-number">{stats.clients}</p>
            <span className="stat-label">Total registrados</span>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">
            <FiFolder />
          </div>
          <div className="stat-content">
            <h3>Proyectos</h3>
            <p className="stat-number">{stats.projects}</p>
            <span className="stat-label">{stats.activeProjects} activos</span>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">
            <FiBookOpen />
          </div>
          <div className="stat-content">
            <h3>Capacitaciones</h3>
            <p className="stat-number">{stats.trainings}</p>
            <span className="stat-label">Programas realizados</span>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>Constancias</h3>
            <p className="stat-number">{stats.certificates}</p>
            <span className="stat-label">Emitidas</span>
          </div>
        </div>

        <div className="stat-card stat-secondary">
          <div className="stat-icon">
            <FiFileText />
          </div>
          <div className="stat-content">
            <h3>Formularios</h3>
            <p className="stat-number">{stats.formSubmissions}</p>
            <span className="stat-label">Levantados</span>
          </div>
        </div>
      </div>

      {/* Secciones en 2 columnas */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Próximas Capacitaciones</h2>
            <button className="btn-link" onClick={() => navigate('/capacitaciones')}>
              Ver todas →
            </button>
          </div>
          <div className="section-content">
            {upcomingTrainings.length > 0 ? (
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Capacitación</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTrainings.map(training => (
                    <tr key={training.id}>
                      <td>{training.name}</td>
                      <td>{training.client.name}</td>
                      <td>{new Date(training.date).toLocaleDateString('es-MX')}</td>
                      <td>
                        <span className={`status-badge status-${training.status}`}>
                          {training.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-state">No hay capacitaciones programadas</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Proyectos Recientes</h2>
            <button className="btn-link" onClick={() => navigate('/projects')}>
              Ver todos →
            </button>
          </div>
          <div className="section-content">
            {recentProjects.length > 0 ? (
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Inicio</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project: any) => (
                    <tr key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                      <td>{project.name}</td>
                      <td>{project.client?.name || '-'}</td>
                      <td>
                        <span className={`status-badge status-${project.status}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>{project.startDate ? new Date(project.startDate).toLocaleDateString('es-MX') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-state">No hay proyectos recientes</p>
            )}
          </div>
        </div>
      </div>

      {/* Indicadores de cumplimiento */}
      <div className="compliance-section">
        <h2>Indicadores de Cumplimiento</h2>
        <div className="compliance-grid">
          <div className="compliance-card">
            <div className="compliance-icon">
              <FiTrendingUp />
            </div>
            <div className="compliance-content">
              <h3>Proyectos Activos</h3>
              <p className="compliance-value">{activePercentage}%</p>
              <p className="compliance-detail">{activeProjectsCount} de {totalProjects} proyectos</p>
            </div>
          </div>
          <div className="compliance-card">
            <div className="compliance-icon">
              <FiAward />
            </div>
            <div className="compliance-content">
              <h3>Constancias Emitidas</h3>
              <p className="compliance-value">{periodCertificates}</p>
              <p className="compliance-detail">En el periodo seleccionado</p>
            </div>
          </div>
          <div className="compliance-card">
            <div className="compliance-icon">
              <FiFileText />
            </div>
            <div className="compliance-content">
              <h3>Formularios Levantados</h3>
              <p className="compliance-value">{periodForms}</p>
              <p className="compliance-detail">En el periodo seleccionado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="quick-summary">
        <h2>Resumen Rápido</h2>
        <div className="summary-content">
          <div className="summary-item">
            <FiCheckCircle className="summary-icon" />
            <p>Tienes <strong>{activeProjectsWithClient.length}</strong> proyectos activos{selectedClient ? ` con este cliente` : ''}.</p>
          </div>
          <div className="summary-item">
            <FiAward className="summary-icon" />
            <p>Se emitieron <strong>{weeklyCertificates}</strong> constancias esta semana.</p>
          </div>
          <div className="summary-item">
            <FiCalendar className="summary-icon" />
            <p>Hay <strong>{upcomingTrainings.length}</strong> capacitaciones programadas próximamente.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
