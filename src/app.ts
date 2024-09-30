//aqui se programa la api
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3001;

app.use('/', async(req: Request, res: Response): Promise<void> => {
    const taxis = await prisma.taxis.findMany()
    res.json(taxis);
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});