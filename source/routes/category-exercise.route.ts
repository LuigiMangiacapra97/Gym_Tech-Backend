import express from "express";
import exerciseCategoryController from '../controllers/exercise-category.controller'
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, exerciseCategoryController.create);

router.put('/:exerciseCategoryId', extractJWT, exerciseCategoryController.update);

router.get('/', extractJWT, exerciseCategoryController.exercise_categories);

router.get('/:exerciseCategoryId', extractJWT, exerciseCategoryController.exercise_category);

export = router;