import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllTrajectories = async (query: any) => {  //parametro query puede ser de cualquier tipo 
   
    const { longitude, latitude, startDate, endDate, taxi_id } = query;
    console.log('Trajectories Found:',findAllTrajectories)
    
    
    return await prisma.trajectories.findMany({  // buscr multiples trajectories en la base de datos
        where: {                                // define condiciones para filtrar
            
            longitude: longitude ? Number(longitude) : undefined,
            latitude: latitude ? Number(latitude) : undefined,
            taxi_id: taxi_id ? Number(taxi_id) : undefined,

            date: {     // define el rango de fechas
                gte: startDate,     //gte: greater than or equal
                lte: endDate,       //lte: less than or equal
            },
        },
        include: {      //incluye la tabla de taxis ademas de las de trajectories  
            taxi: true,
        },
    });
};