import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../prisma/generated/prisma';
import { PrismaClientKnownRequestError, RawQueryArgs } from '../../prisma/generated/prisma/runtime/library';

const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req: Request, res: Response) => {

});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const chore = await prisma.chore.findFirst({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!chore) {
            res.status(404).send('No chore found');
            return;
        }

        res.status(200).json(chore);

    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/:childId', async (req: Request, res: Response) => {
    try {
        const chores = await prisma.chore.findMany({
            where: {
                id: Number(req.params.childId)
            }
        });

        if (!chores) {
            res.status(404).send('No chore found');
            return;
        }

        res.status(200).json(chores);

    } catch (err) {
        res.sendStatus(500);
    }
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

router.put('/:id', async (req: Request, res: Response) => {
    const { finished } = req.body;

    if (!finished) {
        res.status(400).send('Must have a finished field');
        return;
    }

    try {
        await prisma.chore.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                finished
            }
        });

    } catch (err) {
        res.status(500).send('Something went wrong');
    }


});

export default router;