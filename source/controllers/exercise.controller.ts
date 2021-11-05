import { Request, Response, NextFunction } from "express";
import { PrismaClient, Esercizio} from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Exercise Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating exercise');

    let bodyInfo: Esercizio = req.body;

    const exercise = prisma.esercizio.create({
        data: bodyInfo
    });

    exercise.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const exercises = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all exercises');

    const exercises = prisma.esercizio.findMany();

    exercises.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const exercise = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get exercise');

    let exerciseId = parseInt(req.params.exerciseId);

    const exercise = prisma.categoriaEsercizio.findUnique({
        where: {
            IdCategoriaEsercizio: exerciseId,
        }
    })

    exercise.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Update exercise');

    let exerciseId = parseInt(req.params.exerciseId);

    let bodyInfo: Esercizio = req.body;


    const exercise_update = prisma.esercizio.update({
        where: {
            IdEsercizio: exerciseId,
        },
        data: bodyInfo
    })

    exercise_update.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

export default {
    create,
    exercises,
    exercise,
    update
};