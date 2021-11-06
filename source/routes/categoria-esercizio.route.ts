import express from "express";
import categoriaEsercizioController from '../controllers/categoria-esercizio.controller'
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, categoriaEsercizioController.create);

router.put('/:categoriaEsercizioId', extractJWT, categoriaEsercizioController.update);

router.get('/', extractJWT, categoriaEsercizioController.getAll);

router.get('/:categoriaEsercizioId', extractJWT, categoriaEsercizioController.getSingle);

export = router;