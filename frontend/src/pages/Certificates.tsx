import { useState } from 'react';
import { mockCertificates, mockClients, mockProjects } from '../utils/mockData';
import { FiMail, FiFileText } from 'react-icons/fi';
import './Certificates.css';

const Certificates = () => {
  const [certificates] = useState(mockCertificates);
  const [clientFilter, setClientFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

  const filteredCertificates = certificates.filter(cert => {
    if (clientFilter && cert.clientId !== clientFilter) return false;
    if (projectFilter && cert.projectId !== projectFilter) return false;
    return true;
  });

  return (
    <div className="certificates-page">
      <div className="page-header">
        <h1>Constancias</h1>
        <button className="btn-primary" onClick={() => setShowGenerator(!showGenerator)}>
          <FiFileText className="btn-icon" />
          <span>{showGenerator ? 'Ocultar Generador' : 'Generar Constancias'}</span>
        </button>
      </div>

      {showGenerator && (
        <div className="generator-container">
          <div className="generator-header">
            <h2>Generador de Constancias DC-3</h2>
            <button className="close-btn" onClick={() => setShowGenerator(false)}>×</button>
          </div>
          <iframe
            src="https://lupashe-generadordeconstancias.vercel.app"
            title="Generador de Constancias LUPASHE"
            className="generator-iframe"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      )}

      <div className="filters-bar">
        <div className="filter-group">
          <label>Cliente:</label>
          <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
            <option value="">Todos</option>
            {mockClients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Proyecto:</label>
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="">Todos</option>
            {mockProjects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Capacitación</th>
              <th>Proyecto</th>
              <th>Fecha Emisión</th>
              <th>Estado Envío</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map(cert => (
              <tr key={cert.id}>
                <td>{cert.participantName}</td>
                <td>{cert.trainingName}</td>
                <td>{mockProjects.find(p => p.id === cert.projectId)?.name || '-'}</td>
                <td>{new Date(cert.issuedDate).toLocaleDateString('es-MX')}</td>
                <td>
                  <div className="send-status">
                    {cert.sentToClient ? <FiMail className="sent" title="Enviado a cliente" /> : <FiMail className="pending" title="Pendiente" />}
                    {cert.sentToInstructor ? <FiMail className="sent" title="Enviado a instructor" /> : <FiMail className="pending" title="Pendiente" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;

