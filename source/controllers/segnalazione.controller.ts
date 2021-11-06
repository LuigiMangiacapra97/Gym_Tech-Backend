import { Request, Response, NextFunction } from "express";
import { PrismaClient, Segnalazioni } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Segnalazione Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione segnalazione');

    let bodyInfo: Segnalazioni = req.body;

    const segnalazione = prisma.segnalazioni.create({
        data: bodyInfo
    });

    segnalazione.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutte le segnalazioni');

    const segnalazioni = prisma.segnalazioni.findMany();

    segnalazioni.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero la singola segnalazione');

    let segnalazioneId = parseInt(req.params.segnalazioneId);

    let segnalazione = prisma.segnalazioni.findUnique({
        where: {
            IdSegnalazione: segnalazioneId
        }
    });

    segnalazione.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno la segnalazione');

    let segnalazioneId = parseInt(req.params.segnalazioneId);

    let bodyInfo: Segnalazioni = req.body;

    const segnalazione_update = prisma.segnalazioni.update({
        where: {
            IdSegnalazione: segnalazioneId
        },
        data: bodyInfo
    });

    segnalazione_update.then(result => {
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