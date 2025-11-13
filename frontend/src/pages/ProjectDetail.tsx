import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects, mockTrainings, mockFormSubmissions, mockCertificates, mockReports } from '../utils/mockData';
import { FiArrowLeft, FiBookOpen, FiFileText, FiAward, FiFile, FiPlus, FiUsers } from 'react-icons/fi';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumen');
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const foundProject = mockProjects.find(p => p.id === id);
    setProject(foundProject || null);
  }, [id]);

  if (!project) {
    return (
      <div className="project-detail">
        <div className="loading-spinner">Proyecto no encontrado</div>
      </div>
    );
  }

  const projectTrainings = mockTrainings.filter(t => t.projectId === id);
  const projectForms = mockFormSubmissions.filter(f => f.projectId === id);
  const projectCertificates = mockCertificates.filter(c => c.projectId === id);
  const projectReports = mockReports.filter(r => r.projectId === id);

  return (
    <div className="project-detail">
      <button className="back-btn" onClick={() => navigate('/projects')}>
        <FiArrowLeft />
        <span>Volver a Proyectos</span>
      </button>

      <div className="detail-header">
        <div>
          <h1>{project.name}</h1>
          <div className="header-info">
            <span className="client-name">{project.client?.name}</span>
            <span className={`status-badge status-${project.status}`}>
              {project.status}
            </span>
          </div>
          <div className="header-dates">
            {project.startDate && (
              <span>Inicio: {new Date(project.startDate).toLocaleDateString('es-MX')}</span>
            )}
            {project.endDate && (
              <span>Fin: {new Date(project.endDate).toLocaleDateString('es-MX')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="summary-cards">
        <div className="summary-card">
          <FiBookOpen className="card-icon" />
          <div>
            <h3>Capacitaciones</h3>
            <p className="card-value">{projectTrainings.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <FiUsers className="card-icon" />
          <div>
            <h3>Participantes</h3>
            <p className="card-value">{projectCertificates.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <FiAward className="card-icon" />
          <div>
            <h3>Constancias</h3>
            <p className="card-value">{projectCertificates.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <FiFileText className="card-icon" />
          <div>
            <h3>Formularios</h3>
            <p className="card-value">{projectForms.length}</p>
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
        <button 
          className={`tab ${activeTab === 'constancias' ? 'active' : ''}`}
          onClick={() => setActiveTab('constancias')}
        >
          Constancias
        </button>
        <button 
          className={`tab ${activeTab === 'informes' ? 'active' : ''}`}
          onClick={() => setActiveTab('informes')}
        >
          Informes
        </button>
      </div>

      {/* Contenido de tabs */}
      <div className="tab-content">
        {activeTab === 'resumen' && (
          <div className="resumen-content">
            <div className="info-section">
              <h3>Descripción</h3>
              <p>{project.description || 'Sin descripción'}</p>
            </div>
            <div className="info-section">
              <h3>Avance del Proyecto</h3>
              <div className="progress-section">
                <div className="progress-bar-large">
                  <div 
                    className="progress-fill-large" 
                    style={{ width: `${(project as any).progress || 0}%` }}
                  ></div>
                </div>
                <span className="progress-value">{(project as any).progress || 0}%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'capacitaciones' && (
          <div>
            <div className="section-header">
              <h2>Capacitaciones</h2>
              <button className="btn-primary">
                <FiPlus className="btn-icon" />
                <span>Nueva Capacitación</span>
              </button>
            </div>
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
                  {projectTrainings.map(training => (
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
          </div>
        )}

        {activeTab === 'formularios' && (
          <div>
            <div className="section-header">
              <h2>Formularios</h2>
              <button className="btn-primary">
                <FiPlus className="btn-icon" />
                <span>Nuevo Formulario / Cargar OCR</span>
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Formulario</th>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {projectForms.map(form => (
                    <tr key={form.id}>
                      <td>{form.formDefinitionName}</td>
                      <td>{new Date(form.submittedDate).toLocaleDateString('es-MX')}</td>
                      <td>{form.source}</td>
                      <td>
                        <span className={`status-badge status-${form.status}`}>
                          {form.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'constancias' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Participante</th>
                  <th>Capacitación</th>
                  <th>Fecha Emisión</th>
                  <th>Estado Envío</th>
                </tr>
              </thead>
              <tbody>
                {projectCertificates.map(cert => (
                  <tr key={cert.id}>
                    <td>{cert.participantName}</td>
                    <td>{cert.trainingName}</td>
                    <td>{new Date(cert.issuedDate).toLocaleDateString('es-MX')}</td>
                    <td>
                      {cert.sentToClient ? 'Enviado' : 'Pendiente'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'informes' && (
          <div>
            <div className="section-header">
              <h2>Informes</h2>
              <button className="btn-primary">
                <FiFile className="btn-icon" />
                <span>Generar Informe</span>
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projectReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{new Date(report.createdAt).toLocaleDateString('es-MX')}</td>
                      <td>
                        <span className={`status-badge status-${report.status}`}>
                          {report.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit">Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

