import { Router, Request, Response } from 'express';
import { Prisma, PrismaClient } from '../../prisma/generated/prisma';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '../../prisma/generated/prisma/runtime/library';

const router = Router();
const prisma = new PrismaClient();

// Get all children
router.get('/', async (req: Request, res: Response) => {
    const children = await prisma.child.findMany();
    res.status(200).send(children);
});

// Create new child
router.post('/', async (req: Request, res: Response) => {

    let { name }: { name: string; } = req.body;

    if (!name) {
        res.status(400).send("Must have Child Name");
        return;
    }

    name = name.toLowerCase();

    try {
        const newChild = await prisma.child.create({
            data: {
                name: name,
            }
        });
        res.status(201).send(newChild);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                console.log('There is a unique constraint violation. This child already exists');
                res.status(422).send('This child already exists');
            }
        }
    }

});

router.put('/:childName', async (req: Request, res: Response) => {
    const { childName } = req.params;

    if (!req.body) {
        res.status(400).send("Must send a name");
    }

    let { name }: { name: string; } = req.body;

    if (!name) {
        res.status(400).send("Must have Child Name");
        return;
    }

    name = name.toLowerCase();


    if (!name) {
        res.status(400).send("Must have Child Name");
        return;
    }

    try {
        await prisma.child.update({
            where: {
                name: childName,
            },
            data: {
                name
            }
        });

        res.sendStatus(200);
    } catch (err) {
        // TODO: Proper error handling
        if (err instanceof PrismaClientKnownRequestError) {
            res.status(404).send(err.meta?.cause);
        }
        console.log(err);
    }

});

export default router;