//aqui se programa la api
import express, { Application, Request, Response } from 'express';                   //ayudan a definir tipo de funcion
import { PrismaClient } from '@prisma/client';                                       //importamos el paquete client que es de prisma 
import taxiRoutes from './routes/taxisRoutes'                                        // importamos los archivos para las rutas
import  trajectoryRoutes  from './routes/trajectoriesRoutes';
//import usersRoutes from './routes/usersRoutes' 

const app: Application = express();
const prisma = new PrismaClient();                        //inicializa un cliente prisma que permite interactuar con la base de datos
const PORT: number = 5000;                                //Define el puerto en el que se ejecutará el servidor (3001).

// crear las rutas
app.use('/taxis', taxiRoutes);          //app.use es un middleware
app.use('/trajectories', trajectoryRoutes);
//app.use('/users', usersRoutes);

app.listen(PORT, (): void => {      // app.listen: Este método inicia el servidor 
    console.log('SERVER IS UP ON PORT:', PORT);
});