import express from "express";
import schedaController from "../controllers/scheda.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, schedaController.create);

router.put('/:schedaId', extractJWT, schedaController.update);

router.get('/', extractJWT, schedaController.getAll);

router.get('/:schedaId', extractJWT, schedaController.getSingle);

export = router;