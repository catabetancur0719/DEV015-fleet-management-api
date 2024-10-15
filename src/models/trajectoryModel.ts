import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllTrajectories = async (query: any) => {
    const { longitude, latitude, startDate, endDate, taxi_id } = query;
    console.log('Trajectories Found:',findAllTrajectories)
    return await prisma.trajectories.findMany({
        where: {
            longitude: longitude ? Number(longitude) : undefined,
            latitude: latitude ? Number(latitude) : undefined,
            taxi_id: taxi_id ? Number(taxi_id) : undefined,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            taxi: true,
        },
    });
};