import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { projectService } from './project.service';
import { createError } from '../../middleware/errorHandler';

const createProjectSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().datetime().optional().or(z.literal('')),
  endDate: z.string().datetime().optional().or(z.literal('')),
});

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().datetime().optional().or(z.literal('')),
  endDate: z.string().datetime().optional().or(z.literal('')),
});

export const projectController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getAll();
      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectService.getById(id);
      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  async getByClientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId } = req.params;
      const projects = await projectService.getByClientId(clientId);
      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createProjectSchema.parse(req.body);
      const project = await projectService.create({
        ...validated,
        startDate: validated.startDate ? new Date(validated.startDate) : undefined,
        endDate: validated.endDate ? new Date(validated.endDate) : undefined,
      });
      res.status(201).json({
        success: true,
        data: project,
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
      const validated = updateProjectSchema.parse(req.body);
      const project = await projectService.update(id, {
        ...validated,
        startDate: validated.startDate ? new Date(validated.startDate) : undefined,
        endDate: validated.endDate ? new Date(validated.endDate) : undefined,
      });
      res.json({
        success: true,
        data: project,
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
      const result = await projectService.delete(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

