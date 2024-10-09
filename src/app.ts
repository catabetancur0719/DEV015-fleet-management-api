//aqui se programa la api
import express, { Application, Request, Response } from 'express'; //ayudan a definir tipo de funcion
import { PrismaClient } from '@prisma/client'; //importamos el paquete client que es de prisma 
import taxiRoutes from './routes/taxisRoutes'
import  trajectoryRoutes  from './routes/trajectoriesRoutes';

const app: Application = express();
const prisma = new PrismaClient();                        //inicializa un cliente prisma que permite interactuar con la base de datos
const PORT: number = 5000;                                //Define el puerto en el que se ejecutará el servidor (3001).

// Usar las rutas de taxis y trayectorias
app.use('/taxis', taxiRoutes);
app.use('/trajectories', trajectoryRoutes);

/*app.get('/', async(req: Request, res: Response): Promise<void> => {             //<void> retorna una promesa sin ningun valor
    const taxis = await prisma.taxis.findMany()                                 // findmany metodo de prisma que se usa para tener los regristos de la tabla de datos taxis 
    res.json(taxis);
});
app.get('/taxis', async (req: Request, res: Response): Promise<void> => {                      //<void> retorna una promesa sin ningun valor
    try {
        const page = parseInt(req.query.page as string) || 1;                                 // el cliente da un valor de numero pero en string y el parseInt lo convierte a number
        const limit = parseInt(req.query.limit as string) || 10;                              // si el cliente no me da el valor por defecto se usa 10 y me sale 10 en la tabla
        const plate = req.query.plate as string;                                              // Obtiene plate

        const taxis = await prisma.taxis.findMany({                                          // obtiene info de la base de datos
            skip: (page - 1) * limit,
            take: limit,
            where: plate ? {
                plate:{
                    startsWith: plate,   
                    mode: 'insensitive',
                },
            }:undefined,
            select:{
                id: true,
                plate:true,
            },
        });
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});*/

app.listen(PORT, (): void => { // inicia el servidor
    console.log('SERVER IS UP ON PORT:', PORT);
});