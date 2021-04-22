import express from 'express';

import { getCajas, createCaja } from '../controllers/cajas.js'

const router = express.Router();

router.get('/', getCajas);
router.post('/', createCaja);

export default router;