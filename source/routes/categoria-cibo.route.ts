import express from "express";
import categoriaCiboController from "../controllers/categoria-cibo.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, categoriaCiboController.create);

router.put('/:categoriaAlimentoId', extractJWT, categoriaCiboController.update);

router.get('/', extractJWT, categoriaCiboController.getAll);

router.get('/:categoriaAlimentoId', extractJWT, categoriaCiboController.getSingle);

export = router;