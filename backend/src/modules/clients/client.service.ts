import { prisma } from '../../utils/prisma';
import { createError } from '../../middleware/errorHandler';

export interface CreateClientInput {
  name: string;
  rfc?: string;
  sector?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface UpdateClientInput {
  name?: string;
  rfc?: string;
  sector?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export const clientService = {
  async getAll() {
    const clients = await prisma.client.findMany({
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return clients;
  },

  async getById(id: string) {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });

    if (!client) {
      throw createError('Client not found', 404);
    }

    return client;
  },

  async create(data: CreateClientInput) {
    const client = await prisma.client.create({
      data,
      include: {
        projects: true,
      },
    });

    return client;
  },

  async update(id: string, data: UpdateClientInput) {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw createError('Client not found', 404);
    }

    const updated = await prisma.client.update({
      where: { id },
      data,
      include: {
        projects: true,
      },
    });

    return updated;
  },

  async delete(id: string) {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });

    if (!client) {
      throw createError('Client not found', 404);
    }

    if (client.projects.length > 0) {
      throw createError('Cannot delete client with associated projects', 400);
    }

    await prisma.client.delete({
      where: { id },
    });

    return { message: 'Client deleted successfully' };
  },
};

