import { Request, Response } from 'express';
import { findTaxis } from '../models/taxiModel';

export const getAllTaxis = async (req: Request, res: Response): Promise<void> => {          // <void> retorna una promesa sin valor
    try {
        const page = parseInt(req.query.page as string) || 1;       //parseint covierte de string a numero, el cliente da valor en string
        const limit = parseInt(req.query.limit as string) || 10;    // si el cliente no da un valor para limite o page, se usa 10 por defecto
        const plate = req.query.plate as string;                    //obtiene plate

        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {         // sino es un numero seria true y retorna el error  400
            res.status(400).json({ error: 'pagina o limite invalido' });
            return;
        }
           
        const taxis = await findTaxis(page, limit, plate);          //findtaxis metodo que se usa para la info de la base de datos

        if (taxis.length === 0) {                        //se verifica la longitud de taxis y si es igual a 0 se retorna el error de abajp
            res.status(400).json({ error: 'Página no encontrada' });
            return;
        }

        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros de taxis' });
    }
};
// el código valida los parámetros page, limite y plate de la solicitud, realiza una búsqueda paginada, y si encuentra datos válidos, los devuelve como JSON.