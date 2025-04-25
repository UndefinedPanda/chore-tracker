import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../prisma/generated/prisma';
import { PrismaClientKnownRequestError } from '../../prisma/generated/prisma/runtime/library';

const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const children = await prisma.child.findMany();
    res.status(200).send(children);
});

router.post('/', async (req: Request, res: Response) => {

    const { name, description, day_of_week, childId } = req.body;

    // TODO: Implement some middleware validation instead of this..
    if (!name || !description || !day_of_week) {
        res.status(400).send('You are missing some required fields');
        return;
    }

    try {

        await prisma.chore.create({
            data: {
                name, description, day_of_week, childId,
            }
        });

    } catch (err) {
        // TODO: Proper error handling
        if (err instanceof PrismaClientKnownRequestError) {
            res.status(404).send(err.meta?.cause);
        }
        console.log(err);
    }


});

export default router;