import { Request, Response, NextFunction } from "express";
import { PrismaClient, DettaglioUtente} from '@prisma/client';

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Dettaglio Utente Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione dettaglio utente');

    let bodyInfo: DettaglioUtente = req.body;

    const dettaglioUente = prisma.dettaglioUtente.create({
        data: bodyInfo
    });

    dettaglioUente.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutti i dettagli utente');

    const dettagli_utente = prisma.dettaglioUtente.findMany();

    dettagli_utente.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    });
};

const getSingle = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero il singolo dettaglio utente');

    let dettaglioUtenteId = parseInt(req.params.dettaglioUtenteId);

    const dettaglio_utente = prisma.dettaglioUtente.findUnique({
        where: {
            IdDettaglioUtente: dettaglioUtenteId
        }
    });

    dettaglio_utente.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Aggiorno il dettaglio utente');

    let dettaglioUtenteId = parseInt(req.params.dettaglioUtenteId);

    let bodyInfo: DettaglioUtente = req.body;

    const dettaglio_utente_update = prisma.dettaglioUtente.update({
        where: {
            IdDettaglioUtente: dettaglioUtenteId
        },
        data: bodyInfo
    });

    dettaglio_utente_update.then(result => {
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
    update
};