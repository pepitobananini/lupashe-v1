import { useState } from 'react';
import { mockReports } from '../utils/mockData';
import { FiFileText, FiEdit2 } from 'react-icons/fi';
import './Reports.css';

const Reports = () => {
  const [reports] = useState(mockReports);

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Informes</h1>
        <button className="btn-primary">
          <FiFileText className="btn-icon" />
          <span>Generar Informe</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Cliente</th>
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.clientName}</td>
                <td>{report.projectName}</td>
                <td>{new Date(report.createdAt).toLocaleDateString('es-MX')}</td>
                <td>
                  <span className={`status-badge status-${report.status}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" title="Editar">
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

