import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiSettings } from 'react-icons/fi';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Administración</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers className="tab-icon" />
          Usuarios
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FiSettings className="tab-icon" />
          Configuración
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="tab-content">
          <button className="btn-link" onClick={() => navigate('/users')}>
            Ir a Gestión de Usuarios →
          </button>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="tab-content">
          <div className="settings-placeholder">
            <p>Configuración de la plataforma</p>
            <p className="placeholder-note">Esta sección estará disponible próximamente</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

