import CajaMessage from '../models/cajaMessage.js';
import mongoose from 'mongoose';


export const getCajas = async (req, res) => {

    try {
        const cajaMessages = await CajaMessage.find();
        res.status(200).json(cajaMessages); // returns an array with all cajas

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createCaja = async (req, res) => {

    const caja = req.body;
    const newCaja = new CajaMessage(caja);

    try {

        await newCaja.save();
        res.status(201).json(newCaja);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}
