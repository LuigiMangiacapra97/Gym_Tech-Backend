import { Request, Response, NextFunction } from "express";
import { PrismaClient, Utente } from ".prisma/client";

import logging from "../config/logging";
import bycriptjs from 'bcryptjs';

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Users Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating user');

    let bodyInfo: Utente = req.body;
    bodyInfo.Eliminato = 0;
    bodyInfo.Password = bodyInfo.Nome + bodyInfo.Cognome + bodyInfo.DataNascita;

    bycriptjs.hash(bodyInfo.Password, 10, (hasError, hash) => {
        if(hasError) {
            return res.status(400).json({
                message: hasError.message,
                error: hasError
            });
        }

        bodyInfo.Password = hash;

        const user = prisma.utente.create({
            data: bodyInfo
        });

        user.then(result => {
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

const users = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all users');

    const users = prisma.utente.findMany();

    users.then(result => {
        return res.status(200).json(result);
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

/*

*/
const user = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get single user');

    let userId = parseInt(req.params.userId);

    const user = prisma.utente.findUnique({
        where: {
            IdUtente: userId,
        }
    })

    user.then(result => {
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
    logging.debug(NAMESPACE, 'Update user');

    let userId = parseInt(req.params.userId);

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

            const userUpdate = prisma.utente.update({
                where: {
                    IdUtente: userId
                },
                data: bodyInfo
            });

            userUpdate.then(result => {
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
        const userUpdate = prisma.utente.update({
            where: {
                IdUtente: userId
            },
            data: bodyInfo
        });

        userUpdate.then(result => {
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

const userDetails = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all details of single user');

    let userId = parseInt(req.params.userId);

    const userDetails = prisma.utente.findUnique({
        where: {
            IdUtente: userId,
        },
        select: {
            DettaglioUtente: true
        }
    });

    userDetails.then(result => {
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
    users,
    user,
    update,
    userDetails
};