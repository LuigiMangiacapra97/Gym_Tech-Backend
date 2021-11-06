import express from "express";
import protocolloAlimentareController from "../controllers/protocollo-alimentare.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, protocolloAlimentareController.create);

router.put('/:procolloAlimentareId', extractJWT, protocolloAlimentareController.update);

router.get('/', extractJWT), protocolloAlimentareController.getAll;

router.get('/:procolloAlimentareId', extractJWT, protocolloAlimentareController.getSingle);

export = router;