import express, { Router } from 'express';
import controller from '../controllers/user.controller';
import extractJWT from '../middleware/extract-jwt.middleware';

const router: Router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/register', controller.registerRoute);
router.post('/login', controller.loginRoute);
router.get('/get/all', controller.getAllUsers);

export = router;
