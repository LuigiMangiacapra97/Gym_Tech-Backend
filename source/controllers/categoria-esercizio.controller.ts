import { Request, Response, NextFunction } from "express";
import { PrismaClient, CategoriaEsercizio } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Categoria Esercizio Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione categoria esercizio');

    let bodyInfo: CategoriaEsercizio = req.body;

    const categoria_esercizio = prisma.categoriaEsercizio.create({
        data: bodyInfo
    });

    categoria_esercizio.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutte le categorie esercizi');

    const categorie_esercizi = prisma.categoriaEsercizio.findMany();

    categorie_esercizi.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero la singola categoria esercizio');

    let categoriaEsercizioId = parseInt(req.params.categoriaEsercizioId);

    const categoria_esercizio = prisma.categoriaEsercizio.findUnique({
        where: {
            IdCategoriaEsercizio: categoriaEsercizioId,
        }
    })

    categoria_esercizio.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno la categoria esercizio');

    let categoriaEsercizioId = parseInt(req.params.categoriaEsercizioId);

    let bodyInfo: CategoriaEsercizio = req.body;


    const categoria_esercizio_update = prisma.categoriaEsercizio.update({
        where: {
            IdCategoriaEsercizio: categoriaEsercizioId,
        },
        data: bodyInfo
    })

    categoria_esercizio_update.then(result => {
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
    getAll,
    getSingle,
    update
};