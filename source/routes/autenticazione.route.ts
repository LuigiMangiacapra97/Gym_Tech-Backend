import express from 'express';
import autenticazioneController from '../controllers/autenticazione.controller';
import extractJWT from '../middleware/extract-jwt.middleware';

const router = express.Router();

router.post('/login', autenticazioneController.login);

router.post('/register', autenticazioneController.register);

router.get('/validate', extractJWT, autenticazioneController.validate);

export = router;
