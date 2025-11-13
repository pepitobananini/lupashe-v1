// API Mock para funcionar sin backend
import { mockClients, mockProjects, mockUsers, mockStats } from './mockData';

// Simular delay de red (mínimo para mejor performance)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthApi = {
  login: async (data: { username: string; password: string }) => {
    await delay(150);
    
    // Permitir login con cualquier usuario/password en modo demo
    if (data.username && data.password) {
      return {
        data: {
          success: true,
          data: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            user: {
              id: '1',
              username: data.username,
              email: `${data.username}@lupashe.com`,
              role: data.username === 'admin' ? 'ADMIN' : 'CONSULTOR',
            },
          },
        },
      };
    }
    throw new Error('Credenciales inválidas');
  },
  
  register: async (data: any) => {
    await delay(200);
    return {
      data: {
        success: true,
        data: {
          id: String(mockUsers.length + 1),
          ...data,
        },
      },
    };
  },
  
  refresh: async (_data: { refreshToken: string }) => {
    await delay(100);
    return {
      data: {
        success: true,
        data: {
          accessToken: 'new-mock-access-token',
        },
      },
    };
  },
};

export const mockClientApi = {
  getAll: async () => {
    await delay(50);
    return {
      data: {
        success: true,
        data: mockClients,
      },
    };
  },
  
  getById: async (id: string) => {
    await delay(100);
    const client = mockClients.find(c => c.id === id);
    if (!client) throw new Error('Cliente no encontrado');
    return {
      data: {
        success: true,
        data: client,
      },
    };
  },
  
  create: async (data: any) => {
    await delay(150);
    const newClient = {
      id: String(mockClients.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockClients.push(newClient);
    return {
      data: {
        success: true,
        data: newClient,
      },
    };
  },
  
  update: async (id: string, data: any) => {
    await delay(150);
    const index = mockClients.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Cliente no encontrado');
    mockClients[index] = { ...mockClients[index], ...data };
    return {
      data: {
        success: true,
        data: mockClients[index],
      },
    };
  },
  
  delete: async (id: string) => {
    await delay(100);
    const index = mockClients.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Cliente no encontrado');
    mockClients.splice(index, 1);
    return {
      data: {
        success: true,
        data: { message: 'Cliente eliminado' },
      },
    };
  },
};

export const mockProjectApi = {
  getAll: async () => {
    await delay(50);
    return {
      data: {
        success: true,
        data: mockProjects,
      },
    };
  },
  
  getById: async (id: string) => {
    await delay(100);
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error('Proyecto no encontrado');
    return {
      data: {
        success: true,
        data: project,
      },
    };
  },
  
  getByClientId: async (clientId: string) => {
    await delay(100);
    const projects = mockProjects.filter(p => p.client.id === clientId);
    return {
      data: {
        success: true,
        data: projects,
      },
    };
  },
  
  create: async (data: any) => {
    await delay(150);
    const client = mockClients.find(c => c.id === data.clientId);
    const newProject = {
      id: String(mockProjects.length + 1),
      ...data,
      client: client ? { id: client.id, name: client.name } : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProjects.push(newProject);
    return {
      data: {
        success: true,
        data: newProject,
      },
    };
  },
  
  update: async (id: string, data: any) => {
    await delay(150);
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Proyecto no encontrado');
    mockProjects[index] = { ...mockProjects[index], ...data };
    return {
      data: {
        success: true,
        data: mockProjects[index],
      },
    };
  },
  
  delete: async (id: string) => {
    await delay(100);
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Proyecto no encontrado');
    mockProjects.splice(index, 1);
    return {
      data: {
        success: true,
        data: { message: 'Proyecto eliminado' },
      },
    };
  },
};

export const mockUserApi = {
  getAll: async () => {
    await delay(50);
    return {
      data: {
        success: true,
        data: mockUsers,
      },
    };
  },
  
  getById: async (id: string) => {
    await delay(100);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Usuario no encontrado');
    return {
      data: {
        success: true,
        data: user,
      },
    };
  },
  
  create: async (data: any) => {
    await delay(150);
    const newUser = {
      id: String(mockUsers.length + 1),
      ...data,
    };
    mockUsers.push(newUser);
    return {
      data: {
        success: true,
        data: newUser,
      },
    };
  },
  
  update: async (id: string, data: any) => {
    await delay(150);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuario no encontrado');
    mockUsers[index] = { ...mockUsers[index], ...data };
    return {
      data: {
        success: true,
        data: mockUsers[index],
      },
    };
  },
  
  delete: async (id: string) => {
    await delay(100);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuario no encontrado');
    mockUsers.splice(index, 1);
    return {
      data: {
        success: true,
        data: { message: 'Usuario eliminado' },
      },
    };
  },
};

export const mockStatsApi = {
  getStats: async () => {
    await delay(30);
    return {
      data: {
        success: true,
        data: mockStats,
      },
    };
  },
};

