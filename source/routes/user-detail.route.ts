import express from 'express';
import userDetailController from "../controllers/user-detail.controller";
import extractJWT from '../middleware/extract-jwt.middleware';

const router = express.Router();

router.post('/create', extractJWT, userDetailController.create);

router.get('/', extractJWT, userDetailController.usersDetails);

router.get('/:userDetailId', extractJWT, userDetailController.userDetail);

router.put('/:userDetailId', extractJWT, userDetailController.update);

export = router;