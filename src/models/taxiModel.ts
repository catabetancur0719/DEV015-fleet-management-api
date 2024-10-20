import { PrismaClient } from '@prisma/client';          //permite interacruar con la base de datos

const prisma = new PrismaClient();

export const findTaxis = async (page: number, limit: number, plate?: string) => {               //funcion asincrona  que busca taxis en la base de datos
    return await prisma.taxis.findMany({                    //se utuliza para buscar multiples registeros 
                                                            //(findMany: metodo de busqueda en la base de datos)(await: operacion asincrona  toma tiempo porque interacutua  con la abse de datos)
        
        skip: (page - 1) * limit,           //skip  define cuantos datos omitir
        take: limit,                        //especifica numero maximo de datos a obtener
        where: plate ? {                    // where especifica resultados de una consulta 

            plate: {                          //busca un plate  que empiece con el string dado por el cliente
                startsWith: plate,
                mode: 'insensitive',        //da el resultado asi la busqueda sea con mayus o minusculas             
            },    

        } : undefined,      //si no hay un valor retorna toda la lista de taxis

        select: {     // define los campos para el resultado
            id: true,
            plate: true,
        },
    });
};
