import express from 'express';

import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.js'

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;