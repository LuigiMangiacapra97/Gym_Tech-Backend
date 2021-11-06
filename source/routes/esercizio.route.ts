import express from "express";
import esercizioController from "../controllers/esercizio.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, esercizioController.create);

router.put('/:esercizioId', extractJWT, esercizioController.update);

router.get('/', extractJWT, esercizioController.getAll);

router.get('/:esercizioId', extractJWT, esercizioController.getSingle);

export = router;