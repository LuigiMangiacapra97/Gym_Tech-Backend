import { Request, Response, NextFunction } from "express";
import { Alimento, PrismaClient } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Foods Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating food');

    let bodyInfo: Alimento = req.body;

    const food = prisma.alimento.create({
        data: bodyInfo
    });

    food.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    });
};

const foods = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all foods');

    const foods = prisma.alimento.findMany();

    foods.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const food = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get food');

    let foodId = parseInt(req.params.foodId);

    let food = prisma.alimento.findUnique({
        where: {
            IdAlimento: foodId
        }
    });

    food.then(result => {
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
    logging.debug(NAMESPACE, 'Update food');

    let foodId = parseInt(req.params.foodId);

    let bodyInfo: Alimento = req.body;

    const food_update = prisma.alimento.update({
        where: {
            IdAlimento: foodId
        },
        data: bodyInfo
    });

    food_update.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    });
};

export default {
    create,
    foods,
    food,
    update,
};