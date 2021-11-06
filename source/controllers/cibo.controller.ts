import { Request, Response, NextFunction } from "express";
import { PrismaClient, Alimento } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Cibo Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione alimento');

    let bodyInfo: Alimento = req.body;

    const alimento = prisma.alimento.create({
        data: bodyInfo
    });

    alimento.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutti gli alimenti');

    const alimenti = prisma.alimento.findMany();

    alimenti.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo alimento');

    let alimentoId = parseInt(req.params.alimentoId);

    let alimento = prisma.alimento.findUnique({
        where: {
            IdAlimento: alimentoId
        }
    });

    alimento.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno l\'alimento');

    let alimentoId = parseInt(req.params.alimentoId);

    let bodyInfo: Alimento = req.body;

    const alimento_update = prisma.alimento.update({
        where: {
            IdAlimento: alimentoId
        },
        data: bodyInfo
    });

    alimento_update.then(result => {
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