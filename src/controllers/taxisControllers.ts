import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTaxis = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const plate = req.query.plate as string;                                                                 // Obtiene plate

        //manejo de error
        if (isNaN(page) || page < 1) {
            res.status(400).json({ error: 'pagina o limite invalido' });
            return; 
        }

        if (isNaN(limit) || limit < 1) {
            res.status(400).json({ error: 'pagina o limite invalido' });
            return;
        }

        const taxis = await prisma.taxis.findMany({                         //obtiene los registros de la base de datos
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

        if (taxis.length === 0) {
            res.status(400).json({ error: 'Página no encontrada' });
            return;//sale de la fx sin retornar valor
        }
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros de taxis' });
    }
};