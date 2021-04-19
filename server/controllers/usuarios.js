import UsuarioMessage from '../models/usuarioMessage.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from './crypto.js'

export const getUsuarios = async (req, res) => {

    try {
        const usuariosMessages = await UsuarioMessage.find();

        const usuariosDesencriptados = usuariosMessages.map(usuario => {

            var decryptedCode = decrypt(JSON.parse(usuario.codigo));
            var decryptedNombre = decrypt(JSON.parse(usuario.nombre));
            var decryptedPrimerApellido = decrypt(JSON.parse(usuario.primerApellido));
            var decryptedSecundoApellido = decrypt(JSON.parse(usuario.segundoApellido));
            var decryptedTelFijo = decrypt(JSON.parse(usuario.telefonoFijo));
            var decryptedTelCelular = decrypt(JSON.parse(usuario.telefonoCelular));
            var decryptedPrivilegio = decrypt(JSON.parse(usuario.privilegio));
            
            usuario.codigo = decryptedCode;
            usuario.nombre = decryptedNombre,
            usuario.primerApellido = decryptedPrimerApellido,
            usuario.segundoApellido = decryptedSecundoApellido;
            usuario.telefonoFijo = decryptedTelFijo;
            usuario.telefonoCelular = decryptedTelCelular;
            usuario.privilegio = decryptedPrivilegio;


            return usuario;
        });

        res.status(200).json(usuariosDesencriptados); // returns an array with all users

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createUsuario = async (req, res) => {

    const { codigo, nombre, primerApellido, segundoApellido, telefonoFijo, telefonoCelular, privilegio, id_restaurante, login, password, password2} = req.body;
    const usuarioData = req.body; 
    
    const hashedPassword = await bcrypt.hash(password, 12);

    var encryptedCode = JSON.stringify(encrypt(codigo));
    var encryptedNombre = JSON.stringify(encrypt(nombre));
    var encryptedPrimerApellido = JSON.stringify(encrypt(primerApellido));
    var encryptedSecundoApellido = JSON.stringify(encrypt(segundoApellido));
    var encryptedTelFijo = JSON.stringify(encrypt(telefonoFijo));
    var encryptedTelCelular = JSON.stringify(encrypt(telefonoCelular));
    var encryptedPrivilegio = JSON.stringify(encrypt(privilegio));

    const newUsuario = new UsuarioMessage({ 
        codigo: encryptedCode , 
        nombre: encryptedNombre, 
        primerApellido: encryptedPrimerApellido, 
        segundoApellido: encryptedSecundoApellido, 
        telefonoFijo: encryptedTelFijo, 
        telefonoCelular: encryptedTelCelular, 
        privilegio: encryptedPrivilegio, 
        id_restaurante, 
        login, 
        password:hashedPassword , 
        password2:hashedPassword});
    
    try {

        await newUsuario.save();
        res.status(201).json(usuarioData);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateUsuario = async (req, res) => {
    const { id: _id } = req.params;
    const { id, codigo, nombre, primerApellido, segundoApellido, telefonoFijo, telefonoCelular, privilegio, id_restaurante, login, password, password2, updatePassword} = req.body;
    const usuarioActualizado = req.body;
    if(updatePassword){
        console.log("Editando contraseña")

        const hashedPassword = await bcrypt.hash(password, 12);

        var encryptedCode = JSON.stringify(encrypt(codigo));
        var encryptedNombre = JSON.stringify(encrypt(nombre));
        var encryptedPrimerApellido = JSON.stringify(encrypt(primerApellido));
        var encryptedSecundoApellido = JSON.stringify(encrypt(segundoApellido));
        var encryptedTelFijo = JSON.stringify(encrypt(telefonoFijo));
        var encryptedTelCelular = JSON.stringify(encrypt(telefonoCelular));
        var encryptedPrivilegio = JSON.stringify(encrypt(privilegio));

        const usuario = new UsuarioMessage({ 
            _id, 
            codigo: encryptedCode, 
            nombre: encryptedNombre, 
            primerApellido: encryptedPrimerApellido, 
            segundoApellido: encryptedSecundoApellido, 
            telefonoFijo: encryptedTelFijo, 
            telefonoCelular: encryptedTelCelular, 
            privilegio: encryptedPrivilegio, 
            id_restaurante, 
            login, 
            password:hashedPassword, 
            password2:hashedPassword
        });


        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un usuario con ese id');
        const updatedUsuario = await UsuarioMessage.findByIdAndUpdate(_id, { ... usuario, _id}, { new: true} ); // new: true receive the updated usuario
        res.json(usuarioActualizado);
    }else{

        var encryptedCode = JSON.stringify(encrypt(codigo));
        var encryptedNombre = JSON.stringify(encrypt(nombre));
        var encryptedPrimerApellido = JSON.stringify(encrypt(primerApellido));
        var encryptedSecundoApellido = JSON.stringify(encrypt(segundoApellido));
        var encryptedTelFijo = JSON.stringify(encrypt(telefonoFijo));
        var encryptedTelCelular = JSON.stringify(encrypt(telefonoCelular));
        var encryptedPrivilegio = JSON.stringify(encrypt(privilegio));


        const usuario = new UsuarioMessage({ 
            _id, 
            codigo: encryptedCode, 
            nombre: encryptedNombre, 
            primerApellido: encryptedPrimerApellido, 
            segundoApellido: encryptedSecundoApellido, 
            telefonoFijo: encryptedTelFijo, 
            telefonoCelular: encryptedTelCelular, 
            privilegio: encryptedPrivilegio, 
            id_restaurante, 
            login
        });
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un usuario con ese id');
        const updatedUsuario = await UsuarioMessage.findByIdAndUpdate(_id, { ... usuario, _id}, { new: true} ); // new: true receive the updated usuario
        res.json(usuarioActualizado);
    }
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

        if(!existingUser) return res.status(404).json({message: "Credenciales inválidas"});

        var decryptedCode = decrypt(JSON.parse(existingUser.codigo));
        var decryptedNombre = decrypt(JSON.parse(existingUser.nombre));
        var decryptedPrimerApellido = decrypt(JSON.parse(existingUser.primerApellido));
        var decryptedSecundoApellido = decrypt(JSON.parse(existingUser.segundoApellido));
        var decryptedTelFijo = decrypt(JSON.parse(existingUser.telefonoFijo));
        var decryptedTelCelular = decrypt(JSON.parse(existingUser.telefonoCelular));
        var decryptedPrivilegio = decrypt(JSON.parse(existingUser.privilegio));

        existingUser.codigo = decryptedCode;
        existingUser.nombre = decryptedNombre,
        existingUser.primerApellido = decryptedPrimerApellido,
        existingUser.segundoApellido = decryptedSecundoApellido;
        existingUser.telefonoFijo = decryptedTelFijo;
        existingUser.telefonoCelular = decryptedTelCelular;
        existingUser.privilegio = decryptedPrivilegio;

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message: "Credenciales inválidas"});

        res.status(200).json({ result: existingUser});

    } catch (error) {
        
        res.status(500).json({ message: 'Something went wrong' });
    }
    
}

