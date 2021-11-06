import { Request, Response, NextFunction } from "express";
import { PrismaClient, Utente } from ".prisma/client";

import signJWT from "../functions/sign-jwt.function";
import logging from "../config/logging";

import bycriptjs from 'bcryptjs';

const NAMESPACE = 'Autenticazione Controller';
const prisma = new PrismaClient();

const login = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Login');
    
    let bodyInfo: Utente = req.body;

    const user = prisma.utente.findUnique({
        where: {
            Email: bodyInfo.Email
        },
    });

    user.then(u => {
        if(u) {
            if(u.Password && bodyInfo.Password) {
                bycriptjs.compare(bodyInfo.Password, u.Password, (error, result) => {
                    if(error) {
                        logging.error(NAMESPACE, error.message, error);
    
                        return res.status(400).json({
                            message: error.message,
                            error
                        });
                    } else if(result) {
                        signJWT(u, (_error, token) => {
                            if(_error) {
                                return res.status(401).json({
                                    message: _error.message,
                                    error: _error
                                });
                            } else if(token) {
                                return res.status(200).json({
                                    message: 'Auth Successful',
                                    token,
                                    user: u
                                });
                            }
                        });
                    }
                })
            } else {
                logging.error(NAMESPACE, 'The password field is not present');
    
                return res.status(400).json({
                    message: 'The password field is not present'
                });
            }
        } else {
            return res.status(400).json(null);
        }
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(400).json({
            message: error.message,
            error
        });
    })
};

const register = (req: Request, res: Response, next: NextFunction) => {
    logging.debug(NAMESPACE, 'Register');

    let bodyInfo: Utente = req.body;

    if(bodyInfo.Password) {
        bycriptjs.hash(bodyInfo.Password, 10, (hasError, hash) => {
            if(hasError) {
                logging.error(NAMESPACE, hasError.message, hasError);
                
                return res.status(400).json({
                    message: hasError.message,
                    error: hasError
                });
            }

            const userRegister = prisma.utente.create({
                data: bodyInfo
            });

            userRegister.then(result => {
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
        logging.error(NAMESPACE, 'The password field is not present');

        return res.status(400).json({
            message: 'The password field is not present'
        });
    }
};


const validate = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validate, user authorized.');

    console.log(res.locals.jwt);

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

export default {
    login,
    register,
    validate
};