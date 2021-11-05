import { Utente } from ".prisma/client";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import IUser from "../interfaces/user.interface";

const NAMESPACE = 'Auth Function';

const signJWT = (user: Utente, callback: (error: Error | null, token: string | null) => void): void => {
    logging.info(NAMESPACE, `Attempting to sign token for ${user.Email}`);

    let timeSinchEpoch = new Date().getTime();
    let expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        jwt.sign(
            {
                _id: user.IdUtente,
                email: user.Email,
                ruolo: user.Ruolo
            },
            config.server.token.secret,
            { issuer: config.server.token.issuer, algorithm: 'HS256', expiresIn: expirationTimeInSeconds },
            (error, token) => {
                if(error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;