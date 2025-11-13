// Datos mock para demostración sin backend

export const mockClients = [
  {
    id: '1',
    name: 'Empresa Constructora ABC',
    rfc: 'ECA123456789',
    sector: 'Construcción',
    contactName: 'Juan Pérez',
    contactEmail: 'juan.perez@abc.com',
    contactPhone: '555-1234',
    address: 'Av. Reforma 123, CDMX',
    projects: [{ id: '1', name: 'Proyecto Seguridad Industrial' }],
  },
  {
    id: '2',
    name: 'Manufacturas del Norte S.A.',
    rfc: 'MNS987654321',
    sector: 'Manufactura',
    contactName: 'María González',
    contactEmail: 'maria.gonzalez@mns.com',
    contactPhone: '555-5678',
    address: 'Blvd. Industrial 456, Monterrey',
    projects: [{ id: '2', name: 'Capacitación SST' }],
  },
  {
    id: '3',
    name: 'Servicios Logísticos XYZ',
    rfc: 'SLX456789123',
    sector: 'Logística',
    contactName: 'Carlos Ramírez',
    contactEmail: 'carlos.ramirez@xyz.com',
    contactPhone: '555-9012',
    address: 'Calle Comercial 789, Guadalajara',
    projects: [],
  },
];

export const mockProjects = [
  {
    id: '1',
    name: 'Proyecto Seguridad Industrial',
    description: 'Implementación de protocolos de seguridad para planta industrial',
    status: 'activo',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-06-30T00:00:00Z',
    progress: 65,
    client: {
      id: '1',
      name: 'Empresa Constructora ABC',
    },
  },
  {
    id: '2',
    name: 'Capacitación SST',
    description: 'Programa de capacitación en Seguridad y Salud en el Trabajo',
    status: 'activo',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-12-31T00:00:00Z',
    progress: 45,
    client: {
      id: '2',
      name: 'Manufacturas del Norte S.A.',
    },
  },
  {
    id: '3',
    name: 'Auditoría de Riesgos',
    description: 'Evaluación de riesgos laborales en almacén',
    status: 'pausado',
    startDate: '2024-03-10T00:00:00Z',
    endDate: null,
    progress: 30,
    client: {
      id: '3',
      name: 'Servicios Logísticos XYZ',
    },
  },
];

export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@lupashe.com',
    role: 'ADMIN',
  },
  {
    id: '2',
    username: 'consultor1',
    email: 'consultor1@lupashe.com',
    role: 'CONSULTOR',
  },
  {
    id: '3',
    username: 'capacitador1',
    email: 'capacitador1@lupashe.com',
    role: 'CAPACITADOR',
  },
];

export const mockTrainings = [
  {
    id: '1',
    name: 'Capacitación en Seguridad Industrial',
    projectId: '1',
    project: { id: '1', name: 'Proyecto Seguridad Industrial' },
    client: { id: '1', name: 'Empresa Constructora ABC' },
    date: '2024-12-20T00:00:00Z',
    instructorName: 'Ing. Roberto Martínez',
    status: 'programado',
    type: 'Presencial',
    location: 'Planta Industrial',
  },
  {
    id: '2',
    name: 'Manejo de Sustancias Químicas',
    projectId: '2',
    project: { id: '2', name: 'Capacitación SST' },
    client: { id: '2', name: 'Manufacturas del Norte S.A.' },
    date: '2024-12-18T00:00:00Z',
    instructorName: 'Dra. Ana López',
    status: 'activo',
    type: 'Virtual',
    location: 'Online',
  },
  {
    id: '3',
    name: 'Prevención de Accidentes',
    projectId: '1',
    project: { id: '1', name: 'Proyecto Seguridad Industrial' },
    client: { id: '1', name: 'Empresa Constructora ABC' },
    date: '2024-12-15T00:00:00Z',
    instructorName: 'Ing. Carlos Sánchez',
    status: 'completado',
    type: 'Presencial',
    location: 'Oficinas Centrales',
  },
];

export const mockCertificates = [
  {
    id: '1',
    participantId: '1',
    participantName: 'Juan Pérez',
    trainingId: '1',
    trainingName: 'Capacitación en Seguridad Industrial',
    projectId: '1',
    clientId: '1',
    issuedDate: '2024-12-15T00:00:00Z',
    sentToClient: true,
    sentToInstructor: true,
  },
  {
    id: '2',
    participantId: '2',
    participantName: 'María González',
    trainingId: '2',
    trainingName: 'Manejo de Sustancias Químicas',
    projectId: '2',
    clientId: '2',
    issuedDate: '2024-12-10T00:00:00Z',
    sentToClient: true,
    sentToInstructor: false,
  },
];

export const mockFormSubmissions = [
  {
    id: '1',
    formDefinitionId: '1',
    formDefinitionName: 'Formulario de Inspección',
    projectId: '1',
    projectName: 'Proyecto Seguridad Industrial',
    clientId: '1',
    source: 'OCR',
    submittedDate: '2024-12-14T00:00:00Z',
    status: 'completado',
  },
  {
    id: '2',
    formDefinitionId: '2',
    formDefinitionName: 'Evaluación de Riesgos',
    projectId: '2',
    projectName: 'Capacitación SST',
    clientId: '2',
    source: 'Manual',
    submittedDate: '2024-12-12T00:00:00Z',
    status: 'pendiente',
  },
];

export const mockReports = [
  {
    id: '1',
    projectId: '1',
    projectName: 'Proyecto Seguridad Industrial',
    clientId: '1',
    clientName: 'Empresa Constructora ABC',
    title: 'Informe de Evaluación de Riesgos',
    status: 'borrador',
    createdAt: '2024-12-13T00:00:00Z',
  },
  {
    id: '2',
    projectId: '2',
    projectName: 'Capacitación SST',
    clientId: '2',
    clientName: 'Manufacturas del Norte S.A.',
    title: 'Informe de Capacitación',
    status: 'final',
    createdAt: '2024-12-10T00:00:00Z',
  },
];

export const mockLeads = [
  {
    id: '1',
    companyName: 'Industrias del Sur',
    contactName: 'Pedro Fernández',
    email: 'pedro@industriasdelsur.com',
    phone: '555-1111',
    sector: 'Manufactura',
    city: 'Puebla',
    status: 'nuevo',
    source: 'Web',
  },
  {
    id: '2',
    companyName: 'Construcciones Modernas',
    contactName: 'Laura Torres',
    email: 'laura@construccionesmodernas.com',
    phone: '555-2222',
    sector: 'Construcción',
    city: 'Querétaro',
    status: 'contactado',
    source: 'Referido',
  },
];

export const mockStats = {
  clients: mockClients.length,
  projects: mockProjects.length,
  activeProjects: mockProjects.filter(p => p.status === 'activo').length,
  trainings: mockTrainings.length,
  certificates: mockCertificates.length,
  formSubmissions: mockFormSubmissions.length,
};

