import { Request, Response, NextFunction } from "express";
import { PrismaClient, DettaglioUtente} from '@prisma/client';

import logging from "../config/logging";

import IJwtToken from "../interfaces/jwt-token.interface";

const NAMESPACE = 'Users Details Controller';
const prisma = new PrismaClient();

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Creating user detail');

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

const usersDetails = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get all user details');

    const userDetails = prisma.dettaglioUtente.findMany();

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

const userDetail = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Get single user detail');

    let userDetailId = parseInt(req.params.userDetailId);

    const userDetail = prisma.dettaglioUtente.findUnique({
        where: {
            IdDettaglioUtente: userDetailId
        }
    });

    userDetail.then(result => {
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
    logging.debug(NAMESPACE, 'Update user detail');

    let userDetailId = parseInt(req.params.userDetailId);

    let bodyInfo: DettaglioUtente = req.body;

    const userDetailUpdate = prisma.dettaglioUtente.update({
        where: {
            IdDettaglioUtente: userDetailId
        },
        data: bodyInfo
    });

    userDetailUpdate.then(result => {
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
    usersDetails,
    userDetail,
    update
};