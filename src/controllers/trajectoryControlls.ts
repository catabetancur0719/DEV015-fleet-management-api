

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const getAllTrajectories = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { longitude, latitude, date,taxi_id } = req.query;

        //manejo de taxi_id
        if (taxi_id && isNaN(Number(taxi_id))) {
          res.status(400).json({error: 'El taxi_id debe ser un numero.'});
          return;
           }
           if (!date || isNaN(new Date ().getTime())){
            res.status(400).json({error: 'El parametro debe tener una fecha valida.'});
           }

        const startDate = date ? new Date(`${date}T00:00:00Z`) : undefined;
        const endDate = date ? new Date(`${date}T23:59:59Z`):undefined;
        
        
        const trajectories = await prisma.trajectories.findMany({
            where: {
                // Condiciones de búsqueda
                longitude: longitude ? Number(longitude) : undefined,
                latitude: latitude ? Number(latitude) : undefined,
                taxi_id: taxi_id ? Number(taxi_id) : undefined,

                
                date:{
                  gte: startDate,
                  lte:endDate,
              },

            },
              include: {
                taxi: true,
              }            
            
        });

      res.json(trajectories.map(({ id, date, taxi_id, longitude, taxi}) => ({
        id,
        plate:taxi_id,
        date,
        taxiId:taxi_id,
        longitude,
        latitude,

      })));
    } catch (error) {
        if (!res.headersSent){
          if (!res.headersSent){
        res.status(400).json({ error: 'Error al obtener los registros de trayectorias' });
          }
        }
    }
  };