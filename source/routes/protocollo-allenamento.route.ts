import express from "express";
import protocolloAllenamentoController from "../controllers/protocollo-allenamento.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, protocolloAllenamentoController.create);

router.put('/:procolloAllenamentoId', extractJWT, protocolloAllenamentoController.update);

router.get('/', extractJWT, protocolloAllenamentoController.getAll);

router.get('/:procolloAllenamentoId', extractJWT, protocolloAllenamentoController.getSingle);

export = router;