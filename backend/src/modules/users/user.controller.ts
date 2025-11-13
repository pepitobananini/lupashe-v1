import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userService } from './user.service';
import { createError } from '../../middleware/errorHandler';

const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email().optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'CONSULTOR', 'CAPACITADOR', 'ADMINISTRATIVO']),
});

const updateUserSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'CONSULTOR', 'CAPACITADOR', 'ADMINISTRATIVO']).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createUserSchema.parse(req.body);
      const user = await userService.create(validated);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(createError(error.errors[0].message, 400));
      }
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validated = updateUserSchema.parse(req.body);
      const user = await userService.update(id, validated);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(createError(error.errors[0].message, 400));
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await userService.delete(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

