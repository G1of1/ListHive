import express from 'express';

import { register, login, logout, getMe } from '../controller/auth.js';
import { middleWare } from '../middleware/middleware.js';

const router = express.Router();

router.use(express.json());
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', middleWare, getMe);

export default router;