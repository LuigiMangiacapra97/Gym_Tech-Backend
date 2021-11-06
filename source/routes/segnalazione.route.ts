import express from "express";
import segnalazioneController from "../controllers/segnalazione.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, segnalazioneController.create);

router.put('/:segnalazioneId', extractJWT, segnalazioneController.update);

router.get('/', extractJWT, segnalazioneController.getAll);

router.get('/:segnalazioneId', extractJWT, segnalazioneController.getSingle);

export = router;