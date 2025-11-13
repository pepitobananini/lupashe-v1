import { useState } from 'react';
import { mockTrainings } from '../utils/mockData';
import { FiPlus } from 'react-icons/fi';
import './Trainings.css';

const Trainings = () => {
  const [trainings] = useState(mockTrainings);

  return (
    <div className="trainings-page">
      <div className="page-header">
        <h1>Capacitaciones</h1>
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
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Instructor</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map(training => (
              <tr key={training.id}>
                <td>{training.name}</td>
                <td>{training.client.name}</td>
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
  );
};

export default Trainings;

