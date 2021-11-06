import express from 'express';
import dettaglioUtenteController from "../controllers/dettaglio-utente.controller";
import extractJWT from '../middleware/extract-jwt.middleware';

const router = express.Router();

router.post('/create', extractJWT, dettaglioUtenteController.create);

router.put('/:dettaglioUtenteId', extractJWT, dettaglioUtenteController.update);

router.get('/', extractJWT, dettaglioUtenteController.getAll);

router.get('/:dettaglioUtenteId', extractJWT, dettaglioUtenteController.getSingle);

export = router;