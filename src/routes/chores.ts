import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../prisma/generated/prisma';

const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const children = await prisma.child.findMany();
    res.status(200).send(children);
});

export default router;