import { Request, Response, NextFunction } from "express";
import { PrismaClient, DiarioAllenamento} from ".prisma/client";

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Diario Allenamento Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creazione diario allenamento');

    let bodyInfo: DiarioAllenamento = req.body;

    const diario_allenamento = prisma.diarioAllenamento.create({
        data: bodyInfo
    });

    diario_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero tutti i diari allenamento');

    const diari_allenamento = prisma.diarioAllenamento.findMany();

    diari_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Recupero il singolo diario di allenamento');

    let diarioAllenamentoId = parseInt(req.params.diarioAllenamentoId);

    const diario_allenamento = prisma.diarioAllenamento.findUnique({
        where: {
            IdDiarioAllenamento: diarioAllenamentoId,
        }
    })

    diario_allenamento.then(result => {
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
    logging.debug(NAMESPACE, 'Aggiorno il diario di allenamento');

    let diarioAllenamentoId = parseInt(req.params.diarioAllenamentoId);

    let bodyInfo: DiarioAllenamento = req.body;


    const diatio_allenamento_update = prisma.diarioAllenamento.update({
        where: {
            IdDiarioAllenamento: diarioAllenamentoId ,
        },
        data: bodyInfo
    })

    diatio_allenamento_update.then(result => {
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