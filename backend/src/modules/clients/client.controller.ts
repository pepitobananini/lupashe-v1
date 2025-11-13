import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { clientService } from './client.service';
import { createError } from '../../middleware/errorHandler';

const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rfc: z.string().optional(),
  sector: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
});

const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  rfc: z.string().optional(),
  sector: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
});

export const clientController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await clientService.getAll();
      res.json({
        success: true,
        data: clients,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const client = await clientService.getById(id);
      res.json({
        success: true,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createClientSchema.parse(req.body);
      const client = await clientService.create(validated);
      res.status(201).json({
        success: true,
        data: client,
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
      const validated = updateClientSchema.parse(req.body);
      const client = await clientService.update(id, validated);
      res.json({
        success: true,
        data: client,
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
      const result = await clientService.delete(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

