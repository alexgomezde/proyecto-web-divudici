import express from 'express';

import { getConsecutivos, createConsecutivo } from '../controllers/consecutivos.js'

const router = express.Router();

router.get('/', getConsecutivos);
router.post('/', createConsecutivo);

export default router;