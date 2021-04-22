import express from 'express';

import { getFacturas, createFactura } from '../controllers/facturas.js'

const router = express.Router();

router.get('/', getFacturas);
router.post('/', createFactura);

export default router;