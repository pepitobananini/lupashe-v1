import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockClients, mockProjects, mockTrainings, mockFormSubmissions, mockCertificates } from '../utils/mockData';
import { FiArrowLeft, FiUsers, FiFolder, FiBookOpen, FiFileText, FiAward } from 'react-icons/fi';
import './ClientDetail.css';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumen');
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const foundClient = mockClients.find(c => c.id === id);
    setClient(foundClient || null);
  }, [id]);

  if (!client) {
    return (
      <div className="client-detail">
        <div className="loading-spinner">Cliente no encontrado</div>
      </div>
    );
  }

  const clientProjects = mockProjects.filter(p => p.client?.id === id);
  const clientTrainings = mockTrainings.filter(t => t.client.id === id);
  const clientForms = mockFormSubmissions.filter(f => f.clientId === id);
  const clientCertificates = mockCertificates.filter(c => c.clientId === id);

  return (
    <div className="client-detail">
      <button className="back-btn" onClick={() => navigate('/clients')}>
        <FiArrowLeft />
        <span>Volver a Clientes</span>
      </button>

      <div className="detail-header">
        <div>
          <h1>{client.name}</h1>
          <p className="client-sector">{client.sector || 'Sin sector especificado'}</p>
        </div>
      </div>

      {/* Información general */}
      <div className="info-section">
        <h2>Información General</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>RFC:</label>
            <span>{client.rfc || '-'}</span>
          </div>
          <div className="info-item">
            <label>Contacto:</label>
            <span>{client.contactName || '-'}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{client.contactEmail || '-'}</span>
          </div>
          <div className="info-item">
            <label>Teléfono:</label>
            <span>{client.contactPhone || '-'}</span>
          </div>
          <div className="info-item full-width">
            <label>Dirección:</label>
            <span>{client.address || '-'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveTab('resumen')}
        >
          Resumen
        </button>
        <button 
          className={`tab ${activeTab === 'proyectos' ? 'active' : ''}`}
          onClick={() => setActiveTab('proyectos')}
        >
          Proyectos
        </button>
        <button 
          className={`tab ${activeTab === 'capacitaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('capacitaciones')}
        >
          Capacitaciones
        </button>
        <button 
          className={`tab ${activeTab === 'formularios' ? 'active' : ''}`}
          onClick={() => setActiveTab('formularios')}
        >
          Formularios
        </button>
      </div>

      {/* Contenido de tabs */}
      <div className="tab-content">
        {activeTab === 'resumen' && (
          <div className="summary-cards">
            <div className="summary-card">
              <FiFolder className="card-icon" />
              <div>
                <h3>Proyectos</h3>
                <p className="card-value">{clientProjects.length}</p>
              </div>
            </div>
            <div className="summary-card">
              <FiBookOpen className="card-icon" />
              <div>
                <h3>Capacitaciones</h3>
                <p className="card-value">{clientTrainings.length}</p>
              </div>
            </div>
            <div className="summary-card">
              <FiFileText className="card-icon" />
              <div>
                <h3>Formularios</h3>
                <p className="card-value">{clientForms.length}</p>
              </div>
            </div>
            <div className="summary-card">
              <FiAward className="card-icon" />
              <div>
                <h3>Constancias</h3>
                <p className="card-value">{clientCertificates.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proyectos' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha Inicio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientProjects.map(project => (
                  <tr key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                    <td>{project.name}</td>
                    <td>
                      <span className={`status-badge status-${project.status}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.startDate ? new Date(project.startDate).toLocaleDateString('es-MX') : '-'}</td>
                    <td>
                      <button className="btn-view" onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`); }}>
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'capacitaciones' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Instructor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {clientTrainings.map(training => (
                  <tr key={training.id}>
                    <td>{training.name}</td>
                    <td>{new Date(training.date).toLocaleDateString('es-MX')}</td>
                    <td>{training.instructorName}</td>
                    <td>
                      <span className={`status-badge status-${training.status}`}>
                        {training.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'formularios' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Formulario</th>
                  <th>Proyecto</th>
                  <th>Fecha</th>
                  <th>Origen</th>
                </tr>
              </thead>
              <tbody>
                {clientForms.map(form => (
                  <tr key={form.id}>
                    <td>{form.formDefinitionName}</td>
                    <td>{form.projectName}</td>
                    <td>{new Date(form.submittedDate).toLocaleDateString('es-MX')}</td>
                    <td>{form.source}</td>
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

export default ClientDetail;

