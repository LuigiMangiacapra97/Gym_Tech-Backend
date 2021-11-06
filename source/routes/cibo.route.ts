import express from "express";
import ciboController from "../controllers/cibo.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, ciboController.create);

router.put('/:alimentoId', extractJWT, ciboController.update);

router.get('/', extractJWT, ciboController.getAll);

router.get('/:alimentoId', extractJWT, ciboController.getSingle);

export = router;