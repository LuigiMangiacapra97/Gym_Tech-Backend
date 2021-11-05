import express from "express";
import foodCategoryController from "../controllers/food-category.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, foodCategoryController.create);

router.put('/:foodCategoryId', extractJWT, foodCategoryController.update);

router.get('/', extractJWT, foodCategoryController.food_categories);

router.get('/:foodCategoryId', extractJWT, foodCategoryController.food_category);

export = router;