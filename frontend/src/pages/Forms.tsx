import { useState } from 'react';
import { mockFormSubmissions } from '../utils/mockData';
import { FiUpload } from 'react-icons/fi';
import './Forms.css';

const Forms = () => {
  const [forms] = useState(mockFormSubmissions);

  return (
    <div className="forms-page">
      <div className="page-header">
        <h1>Formularios</h1>
        <button className="btn-primary">
          <FiUpload className="btn-icon" />
          <span>Cargar Formulario</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Formulario</th>
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Origen</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form.id}>
                <td>{form.formDefinitionName}</td>
                <td>{form.projectName}</td>
                <td>{new Date(form.submittedDate).toLocaleDateString('es-MX')}</td>
                <td>
                  <span className="source-badge source-{form.source.toLowerCase()}">
                    {form.source}
                  </span>
                </td>
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
  );
};

export default Forms;

