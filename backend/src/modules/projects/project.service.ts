import { prisma } from '../../utils/prisma';
import { createError } from '../../middleware/errorHandler';

export interface CreateProjectInput {
  clientId: string;
  name: string;
  description?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

export const projectService = {
  async getAll() {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  },

  async getById(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        trainings: true,
        formSubmissions: true,
        reportDrafts: true,
      },
    });

    if (!project) {
      throw createError('Project not found', 404);
    }

    return project;
  },

  async getByClientId(clientId: string) {
    const projects = await prisma.project.findMany({
      where: { clientId },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  },

  async create(data: CreateProjectInput) {
    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
    });

    if (!client) {
      throw createError('Client not found', 404);
    }

    const project = await prisma.project.create({
      data: {
        clientId: data.clientId,
        name: data.name,
        description: data.description,
        status: data.status || 'activo',
        startDate: data.startDate,
        endDate: data.endDate,
      },
      include: {
        client: true,
      },
    });

    return project;
  },

  async update(id: string, data: UpdateProjectInput) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw createError('Project not found', 404);
    }

    const updated = await prisma.project.update({
      where: { id },
      data,
      include: {
        client: true,
      },
    });

    return updated;
  },

  async delete(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw createError('Project not found', 404);
    }

    await prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  },
};

