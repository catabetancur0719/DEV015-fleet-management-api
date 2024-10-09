import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTaxis = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const plate = req.query.plate as string; // Obtiene plate

        const taxis = await prisma.taxis.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: plate ? {
                plate: {
                    startsWith: plate,   
                    mode: 'insensitive',
                },
            } : undefined,
            select: {
                id: true,
                plate: true,
            },
        });
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros de taxis' });
    }
};