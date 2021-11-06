import { Request, Response, NextFunction } from "express";
import { PrismaClient, Utente } from ".prisma/client";

import logging from "../config/logging";
import bycriptjs from 'bcryptjs';

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Utente Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione utente');

    let bodyInfo: Utente = req.body;
    bodyInfo.Password = bodyInfo.Nome + bodyInfo.Cognome + bodyInfo.DataNascita;

    bycriptjs.hash(bodyInfo.Password, 10, (hasError, hash) => {
        if(hasError) {
            return res.status(400).json({
                message: hasError.message,
                error: hasError
            });
        }

        bodyInfo.Password = hash;

        const utente = prisma.utente.create({
            data: bodyInfo
        });

        utente.then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(400).json({
                message: error.message,
                error
            });
        });
    });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero tutti gli utenti');

    const utenti = prisma.utente.findMany();

    utenti.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo utente');

    let utenteId = parseInt(req.params.utenteId);

    const utente = prisma.utente.findUnique({
        where: {
            IdUtente: utenteId,
        }
    })

    utente.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
}

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Aggionro l\'utente');

    let utenteId = parseInt(req.params.utenteId);

    let bodyInfo: Utente = req.body;

    if(bodyInfo.Password) {
        bycriptjs.hash(bodyInfo.Password, 10, (hasError, hash) => {
            if(hasError) {
                return res.status(400).json({
                    message: hasError.message,
                    error: hasError
                });
            }

            bodyInfo.Password = hash;

            const utente_update = prisma.utente.update({
                where: {
                    IdUtente: utenteId
                },
                data: bodyInfo
            });

            utente_update.then(result => {
                return res.status(200).json(result);
            }).catch(error => {
                logging.error(NAMESPACE, error.message, error);

                return res.status(400).json({
                    message: error.message,
                    error
                });
            });
        });
    } else {
        const utente_update = prisma.utente.update({
            where: {
                IdUtente: utenteId
            },
            data: bodyInfo
        });

        utente_update.then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(400).json({
                message: error.message,
                error
            });
        });
    }
}

const getAllDetailsOfUser = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Recupero tutti i dettagli di un utente specifico');

    let utenteId = parseInt(req.params.utenteId);

    const dettagli_utente = prisma.utente.findUnique({
        where: {
            IdUtente: utenteId,
        },
        select: {
            DettaglioUtente: true
        }
    });

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

export default {
    create,
    getAll,
    getSingle,
    update,
    getAllDetailsOfUser
};