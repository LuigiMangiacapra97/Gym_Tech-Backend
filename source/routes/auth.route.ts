import express from 'express';
import authController from '../controllers/auth.controller';
import extractJWT from '../middleware/extract-jwt.middleware';

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/validate', extractJWT, authController.validate);

export = router;
