import { Request, Response, NextFunction } from "express";
import { Alimento, CategoriaAlimento, PrismaClient } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Food Categories Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating food category');

    let bodyInfo: CategoriaAlimento = req.body;

    const food = prisma.categoriaAlimento.create({
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

const food_categories = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all foods categories');

    const food_categories = prisma.categoriaAlimento.findMany();

    food_categories.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const food_category = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get food category');

    let foodCategoryId = parseInt(req.params.foodCategoryId);

    let food_category = prisma.categoriaAlimento.findUnique({
        where: {
            IdCategoriaAlimento: foodCategoryId
        }
    });

    food_category.then(result => {
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
    logging.debug(NAMESPACE, 'Update food category');

    let foodCategoryId = parseInt(req.params.foodCategoryId);

    let bodyInfo: CategoriaAlimento = req.body;

    const food_category_update = prisma.categoriaAlimento.update({
        where: {
            IdCategoriaAlimento: foodCategoryId
        },
        data: bodyInfo
    });

    food_category_update.then(result => {
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
    food_categories,
    food_category,
    update,
};