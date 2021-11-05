import express from "express";
import foodController from "../controllers/food.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, foodController.create);

router.put('/:foodId', extractJWT, foodController.update);

router.get('/', extractJWT, foodController.foods);

router.get('/:foodId', extractJWT, foodController.food);

export = router;