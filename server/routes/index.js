'use strict';

import {Router} from 'express';
import questions from './questions';
import authentication from './authentication';

var router = Router();

router.use('/questions', questions);
router.use('/authenticate', authentication);

export default router;
