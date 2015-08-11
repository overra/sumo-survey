'use strict';

import {Router} from 'express';
import authentication from '../controllers/authentication';

var router = Router();

router.post('/', authentication.authenticate);

export default router;
