import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';

import autenticazioneRoute, { route } from './routes/autenticazione.route';
import utenteRoute from './routes/utente.route';
import dettaglioUtenteRoute from './routes/dettaglio-utente.route';
import esercizioRoute from './routes/esercizio.route';
import categoriaEsercizioRoute from './routes/categoria-esercizio.route';
import alimentoRoute from './routes/cibo.route';
import categoriaAlimentoRoute from './routes/categoria-cibo.route';

import protocolloAllenamentoRoute from './routes/protocollo-allenamento.route';
import protocolloAlimentareRoute from './routes/protocollo-alimentare.route';
import diarioAllenamentoRoute from './routes/diario-allenamento.route';

import segnalazioneRoute from './routes/segnalazione.route';

const NAMESPACE = 'Server';
const router = express();


// Logging the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Parse the request
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Rules of API
router.use((req, res, next) => {
    // TODO: Cambiare * con l'indirizzo del frontend in produzione.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes
router.use('/api/autenticazione', autenticazioneRoute);
router.use('/api/utente', utenteRoute);
router.use('/api/dettaglo-utente', dettaglioUtenteRoute);

router.use('/api/esercizio', esercizioRoute);
router.use('/api/alimento', alimentoRoute);

router.use('/api/protocollo-alimentare', protocolloAlimentareRoute);
router.use('/api/protocollo-allenamento', protocolloAllenamentoRoute);
router.use('/api/diario-allenamento', diarioAllenamentoRoute);

router.use('api/segnalazione', segnalazioneRoute);

// Error Heandling
router.use((req, res, next) => {
    const error = new Error('API Not Found');

    return res.status(404).json({
        message: error.message
    });
});

// Create the server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

