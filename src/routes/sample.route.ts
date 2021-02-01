import express, { Router } from 'express';
import controller from '../controllers/sample.controller';

const router: Router = express.Router();

router.get('/ping', controller.sampleHealthCheck);

export = router;
