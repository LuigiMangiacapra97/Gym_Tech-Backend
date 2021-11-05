import express from "express";
import exerciseController from "../controllers/exercise.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, exerciseController.create);

router.put('/:exerciseId', extractJWT, exerciseController.update);

router.get('/', extractJWT, exerciseController.exercises);

router.get('/:exerciseId', extractJWT, exerciseController.exercise);

export = router;