'use strict';

import {Router} from 'express';
import jwt from 'express-jwt';
import {jwtSecret as secret} from '../../config';
import questions from '../controllers/questions';

var router = Router();

var ignoreAuth = [
  '/api/questions/random'
];

router.use(jwt({secret}).unless({path: ignoreAuth}));

router.get('/', questions.get);
router.post('/', questions.create);
router.get('/random', questions.random);
router.post('/answer', questions.answer);

export default router;
