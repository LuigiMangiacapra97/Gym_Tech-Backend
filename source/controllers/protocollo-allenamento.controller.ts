import { Request, Response, NextFunction } from "express";
import { PrismaClient, ProtocolloAllenamento } from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Protocollo Allenamento Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione protocollo allenamento');

    let bodyInfo: ProtocolloAllenamento = req.body;

    const protocollo_allenamento = prisma.protocolloAllenamento.create({
        data: bodyInfo
    });

    protocollo_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutti i protocolli di allenamento');

    const protocolli_allenamento = prisma.protocolloAllenamento.findMany();

    protocolli_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo protocollo di allenamento');

    let procolloAllenamentoId = parseInt(req.params.procolloAllenamentoId);

    const protocollo_allenamento = prisma.protocolloAllenamento.findUnique({
        where: {
            IdProtocolloAllenamento: procolloAllenamentoId,
        }
    })

    protocollo_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno il protocollo di allenamento');

    let procolloAllenamentoId = parseInt(req.params.procolloAllenamentoId);

    let bodyInfo: ProtocolloAllenamento = req.body;


    const protocollo_allenamento_update = prisma.protocolloAllenamento.update({
        where: {
            IdProtocolloAllenamento: procolloAllenamentoId ,
        },
        data: bodyInfo
    })

    protocollo_allenamento_update.then(result => {
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