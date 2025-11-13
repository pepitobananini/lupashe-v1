import bcrypt from 'bcryptjs';
import { prisma } from '../../utils/prisma';
import { createError } from '../../middleware/errorHandler';

export interface CreateUserInput {
  username: string;
  password: string;
  email?: string;
  role: string;
}

export interface UpdateUserInput {
  email?: string;
  role?: string;
  password?: string;
}

export const userService = {
  async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    return user;
  },

  async create(data: CreateUserInput) {
    const existingUser = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw createError('Username already exists', 409);
    }

    if (data.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingEmail) {
        throw createError('Email already exists', 409);
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
        role: data.role as any,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  },

  async update(id: string, data: UpdateUserInput) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    const updateData: any = {};

    if (data.email !== undefined) {
      if (data.email && data.email !== user.email) {
        const existingEmail = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (existingEmail) {
          throw createError('Email already exists', 409);
        }
      }
      updateData.email = data.email || null;
    }

    if (data.role !== undefined) {
      updateData.role = data.role as any;
    }

    if (data.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updated;
  },

  async delete(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    await prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  },
};

