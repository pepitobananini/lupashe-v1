import bcrypt from 'bcryptjs';
import { prisma } from '../../utils/prisma';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { createError } from '../../middleware/errorHandler';

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

export const authService = {
  async login({ username, password }: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    const tokenPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  },

  async register({ username, password, email, role }: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw createError('Username already exists', 409);
    }

    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw createError('Email already exists', 409);
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: role as any || 'CONSULTOR',
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  },
};

