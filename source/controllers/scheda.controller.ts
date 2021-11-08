import { Request, Response, NextFunction } from "express";
import { PrismaClient, Schede, Segnalazioni } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Scheda Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione scheda');

    let bodyInfo: Schede = req.body;

    const scheda = prisma.schede.create({
        data: bodyInfo
    });

    scheda.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutte le schede');

    const schede = prisma.schede.findMany();

    schede.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero la singola schede');

    let schedaId = parseInt(req.params.schedaId);

    let scheda = prisma.schede.findUnique({
        where: {
            IdScheda: schedaId
        }
    });

    scheda.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno la scheda');

    let schedaId = parseInt(req.params.schedaId);

    let bodyInfo: Schede = req.body;

    const scheda_update = prisma.schede.update({
        where: {
            IdScheda: schedaId
        },
        data: bodyInfo
    });

    scheda_update.then(result => {
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