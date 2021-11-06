import { Request, Response, NextFunction } from "express";
import { PrismaClient, ProtocolloAlimentare } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Protocollo Alimentare Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione protocollo alimentare');

    let bodyInfo: ProtocolloAlimentare = req.body;

    const protocollo_alimentare = prisma.protocolloAlimentare.create({
        data: bodyInfo
    });

    protocollo_alimentare.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutti i protocolli alimentari');

    const protocolli_alimentari = prisma.protocolloAlimentare.findMany();

    protocolli_alimentari.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo protocollo alimentare');

    let procolloAlimentareId = parseInt(req.params.procolloAlimentareId);

    const protocollo_alimentare = prisma.protocolloAlimentare.findUnique({
        where: {
            IdProtocolloAlimentare: procolloAlimentareId,
        }
    })

    protocollo_alimentare.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno il protocollo alimentare');

    let procolloAlimentareId = parseInt(req.params.procolloAlimentareId);

    let bodyInfo: ProtocolloAlimentare = req.body;


    const protocollo_alimentare_update = prisma.protocolloAlimentare.update({
        where: {
            IdProtocolloAlimentare: procolloAlimentareId ,
        },
        data: bodyInfo
    })

    protocollo_alimentare_update.then(result => {
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