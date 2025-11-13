import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authService } from './auth.service';
import { verifyRefreshToken, generateAccessToken } from '../../utils/jwt';
import { createError } from '../../middleware/errorHandler';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email().optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'CONSULTOR', 'CAPACITADOR', 'ADMINISTRATIVO']).optional(),
});

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await authService.login(validated);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(createError(error.errors[0].message, 400));
      }
      next(error);
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await authService.register(validated);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(createError(error.errors[0].message, 400));
      }
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw createError('Refresh token is required', 400);
      }

      const payload = verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken({
        userId: payload.userId,
        role: payload.role,
      });

      res.json({
        success: true,
        data: { accessToken },
      });
    } catch (error) {
      next(createError('Invalid refresh token', 401));
    }
  },
};

