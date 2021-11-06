import { Request, Response, NextFunction } from "express";
import { PrismaClient, CategoriaAlimento } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Categoria Cibo Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione categoria alimento');

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

const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero tutte le categorie alimenti');

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

const getSingle = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero la singola categoria alimento');

    let categoriaAlimentoId = parseInt(req.params.categoriaAlimentoId);

    let food_category = prisma.categoriaAlimento.findUnique({
        where: {
            IdCategoriaAlimento: categoriaAlimentoId
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
    logging.debug(NAMESPACE, 'Aggiorno la categoria alimento');

    let categoriaAlimentoId = parseInt(req.params.categoriaAlimentoId);

    let bodyInfo: CategoriaAlimento = req.body;

    const food_category_update = prisma.categoriaAlimento.update({
        where: {
            IdCategoriaAlimento: categoriaAlimentoId
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
    getAll,
    getSingle,
    update,
};