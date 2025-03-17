import express from 'express';
import { middleWare } from '../middleware/middleware.js';
import { getProfile, updateProfile } from '../controller/user.js';

const router = express.Router();


router.use(express.json());
router.get('/:username', middleWare, getProfile);
router.post('/', middleWare, updateProfile);


export default router;
