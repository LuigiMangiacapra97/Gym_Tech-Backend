import { Request, Response, NextFunction } from "express";
import { PrismaClient, Esercizio} from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Esercizio Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione esercizio');

    let bodyInfo: Esercizio = req.body;

    const esercizio = prisma.esercizio.create({
        data: bodyInfo
    });

    esercizio.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero tutti gli esercizi');

    const esercizi = prisma.esercizio.findMany();

    esercizi.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo esercizio');

    let esercizioId = parseInt(req.params.esercizioId);

    const esercizio = prisma.esercizio.findUnique({
        where: {
            IdEsercizio: esercizioId,
        }
    })

    esercizio.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno l\'esercizio');

    let esercizioId = parseInt(req.params.esercizioId);

    let bodyInfo: Esercizio = req.body;


    const esercizio_update = prisma.esercizio.update({
        where: {
            IdEsercizio: esercizioId,
        },
        data: bodyInfo
    })

    esercizio_update.then(result => {
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