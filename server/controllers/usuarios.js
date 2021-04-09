import UsuarioMessage from '../models/usuarioMessage.js';
import mongoose from 'mongoose';


export const getUsuarios = async (req, res) => {

    try {
        const usuariosMessages = await UsuarioMessage.find();
        res.status(200).json(usuariosMessages); // returns an array with all users

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createUsuario = async (req, res) => {

    const usuario = req.body;
    const newUsuario = new UsuarioMessage(usuario);

    try {

        await newUsuario.save();
        res.status(201).json(newUsuario);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateUsuario = async (req, res) => {
    const { id: _id } = req.params;
    const usuario = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un usuario con ese id');

    const updatedUsuario = await UsuarioMessage.findByIdAndUpdate(_id, { ... usuario, _id}, { new: true} ); // new: true receive the updated usuario

    res.json(updatedUsuario);
}


export const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un usuario con ese id');

    await UsuarioMessage.findByIdAndRemove(id);

    res.json({message: 'Usuario eliminado correctamente'});
}

export const login = async (req, res) => {

    const { login, password} = req.body;
    try {

        const existingUser =  await UsuarioMessage.findOne({ login });

        if(!existingUser) return res.status(404).json({message: "Usuario no existe"});

        let isPasswordCorrect = false;

        if(password === existingUser.password){

            isPasswordCorrect = true;
        }


        if(!isPasswordCorrect) return res.status(404).json({message: "Credenciales inválidas"});

        //const successUser = { login: existingUser.login, id: existingUser._id, privilegio: existingUser.privilegio};

        res.status(200).json({ result: existingUser});

    } catch (error) {
        
        res.status(500).json({ message: 'Something went wrong' });
    }
    
}