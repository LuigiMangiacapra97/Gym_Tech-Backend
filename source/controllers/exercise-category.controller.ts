import { Request, Response, NextFunction } from "express";
import { PrismaClient, CategoriaEsercizio } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Exercise Categories Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating exercise category');

    let bodyInfo: CategoriaEsercizio = req.body;

    const exercise_category = prisma.categoriaEsercizio.create({
        data: bodyInfo
    });

    exercise_category.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    });
};

const exercise_categories = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all exercise categories');

    const exercise_categories = prisma.categoriaEsercizio.findMany();

    exercise_categories.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const exercise_category = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get exercise category');

    let exerciseCategoryId = parseInt(req.params.exerciseCategoryId);

    const exercise_category = prisma.categoriaEsercizio.findUnique({
        where: {
            IdCategoriaEsercizio: exerciseCategoryId,
        }
    })

    exercise_category.then(result => {
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
    logging.debug(NAMESPACE, 'Update exercise category');

    let exerciseCategoryId = parseInt(req.params.exerciseCategoryId);

    let bodyInfo: CategoriaEsercizio = req.body;


    const exercise_category_update = prisma.categoriaEsercizio.update({
        where: {
            IdCategoriaEsercizio: exerciseCategoryId,
        },
        data: bodyInfo
    })

    exercise_category_update.then(result => {
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
    exercise_categories,
    exercise_category,
    update
};