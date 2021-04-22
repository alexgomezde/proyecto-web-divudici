import FacturaMessage from '../models/facturaMessage.js';
import mongoose from 'mongoose';


export const getFacturas = async (req, res) => {

    try {
        const facturasMessages = await FacturaMessage.find();
        res.status(200).json(facturasMessages); // returns an array with all facturas

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createFactura = async (req, res) => {

    const factura = req.body;
    const newFactura = new FacturaMessage(factura);

    try {

        await newFactura.save();
        res.status(201).json(newFactura);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}
