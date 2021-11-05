import express from "express";
import userController from "../controllers/user.controller";
import extractJWT from "../middleware/extract-jwt.middleware";

const router = express.Router();

router.post('/create', extractJWT, userController.create);

router.put('/:userId', extractJWT, userController.update);

router.get('/', extractJWT, userController.users);

router.get('/:userId', extractJWT, userController.user);

router.get('/:userId/details', extractJWT, userController.userDetails);



export = router;