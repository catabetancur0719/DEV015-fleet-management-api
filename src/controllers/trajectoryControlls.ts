import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {findAllTrajectories} from '../models/trajectoryModel';

const prisma = new PrismaClient();

export const getAllTrajectories = async (req: Request, res: Response): Promise<void> => {  //accion reaccion de la funcion
    try {
        const { longitude, latitude, date, taxi_id } = req.query;  // se llama a cada uno de los parametros para utilizar la info que cada uno tiene

        //manejo de error de taxi_id
         if (taxi_id && isNaN(Number(taxi_id))) {  //verifica que taxi_id exista que sea Number instead of string
            res.status(400).json({ error: 'El taxi_id debe ser un número.' });
            return;     // evitar que se siga ejecutando el codigo.
        }
        //manejo formato fecha
        if (typeof date !== 'string' || !/^\d{2}-\d{2}-\d{4}$/.test(date)) {  // verifica que date no es un string o no coincide con el formato DDMMYYY
            res.status(400).json({ error: 'El parámetro date debe estar en formato DD-MM-YYYY' });
            return;
        }
        const [day, month, year] = date.split('-');      // Divide la fecha "18"-"10"-"2000"
        const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`); // Inicio del día
        const endDate = new Date(`${year}-${month}-${day}T23:59:59Z`);  // fin del dia
        //const dates = date;

        //verifica si la fecha es valida
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            res.status(400).json({ error: 'Error Fechas no validas' });
            return;
        }
   
        const trajectories = await findAllTrajectories({        //llama a la funcion para pasar los parametros de abajo
            longitude,
            latitude,
            startDate,
            endDate,
            taxi_id
        });
        res.json(trajectories.map(({ id, date, taxi_id, longitude, latitude, taxi }) => ({      //respuesta json, map genera un objeto para cada taxi y añade las propiedades de abajo
            id,
            plate:taxi.plate,
            date, //`${day}-${month}-${year}`,
            taxiId:taxi_id,
            longitude,
            latitude,
        })));
    } catch (error) {
        console.error(error);
        if (!res.headersSent){ //verifica q se enviaron los headers al cliente
        res.status(400).json({ error: 'Error al obtener los registros de trayectorias' });
      }
    }
};