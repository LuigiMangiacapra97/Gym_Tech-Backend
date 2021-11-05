import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';

import authRoutes, { route } from './routes/auth.route';
import userRoutes from './routes/user.route';
import userDetailRoutes from './routes/user-detail.route';
import exerciseRoutes from './routes/exercise.route';
import categoryExerciseRoute from './routes/category-exercise.route';
import foodRoute from './routes/food.route';
import categoryFoodRoute from './routes/category-food.route';

const NAMESPACE = 'Server';
const router = express();


// Logging the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Parse the request
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Rules of API
router.use((req, res, next) => {
    // TODO: Cambiare * con l'indirizzo del frontend in produzione.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/usersDetails', userDetailRoutes);
router.use('/api/exercises', exerciseRoutes);
router.use('/api/category-exercise', categoryExerciseRoute);
router.use('/api/foods', foodRoute);
router.use('/api/category-food', categoryFoodRoute);


// Error Heandling
router.use((req, res, next) => {
    const error = new Error('API Not Found');

    return res.status(404).json({
        message: error.message
    });
});

// Create the server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

