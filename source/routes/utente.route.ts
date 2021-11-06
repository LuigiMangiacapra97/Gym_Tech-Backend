import express from "express";
import utenteController from "../controllers/utente.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, utenteController.create);

router.put('/:utenteId', extractJWT, utenteController.update);

router.get('/', extractJWT, utenteController.getAll);

router.get('/:utenteId', extractJWT, utenteController.getSingle);

router.get('/:utenteId/dettaglio', extractJWT, utenteController.getAllDetailsOfUser);

export = router;