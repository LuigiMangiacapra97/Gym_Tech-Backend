import express from "express";
import diarioAllenamentoController from "../controllers/diario-allenamento.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, diarioAllenamentoController.create);

router.put('/:diarioAllenamentoId', extractJWT, diarioAllenamentoController.update);

router.get('/', extractJWT, diarioAllenamentoController.getAll);

router.get('/:diarioAllenamentoId', extractJWT, diarioAllenamentoController.getSingle);

export = router;