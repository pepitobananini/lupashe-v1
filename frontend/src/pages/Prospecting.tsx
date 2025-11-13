import { useState } from 'react';
import { mockLeads } from '../utils/mockData';
import { FiUsers, FiMail, FiPlus } from 'react-icons/fi';
import './Prospecting.css';

const Prospecting = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads] = useState(mockLeads);

  return (
    <div className="prospecting-page">
      <div className="page-header">
        <h1>Prospección (Door Knocker)</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <FiUsers className="tab-icon" />
          Leads
        </button>
        <button 
          className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          <FiMail className="tab-icon" />
          Campañas
        </button>
      </div>

      {activeTab === 'leads' && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Leads</h2>
            <button className="btn-primary">
              <FiPlus className="btn-icon" />
              <span>Nuevo Lead</span>
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Contacto</th>
                  <th>Email</th>
                  <th>Sector</th>
                  <th>Ciudad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id}>
                    <td>{lead.companyName}</td>
                    <td>{lead.contactName}</td>
                    <td>{lead.email}</td>
                    <td>{lead.sector}</td>
                    <td>{lead.city}</td>
                    <td>
                      <span className={`status-badge status-${lead.status}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Campañas de Correo</h2>
            <button className="btn-primary">
              <FiPlus className="btn-icon" />
              <span>Nueva Campaña</span>
            </button>
          </div>
          <div className="empty-state">
            <p>No hay campañas creadas aún</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prospecting;

