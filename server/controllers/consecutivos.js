import ConsecutivoMessage from '../models/consecutivoMessage.js';

export const getConsecutivos = async (req, res) => {

    try {

        const consecutivoMessages = await ConsecutivoMessage.find();
        res.status(200).json(consecutivoMessages); // returns an array with all consecutivos

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createConsecutivo = async (req, res) => {

    const consecutivo = req.body;

    const newConsecutivo = new ConsecutivoMessage(consecutivo);

    try {

        await newConsecutivo.save();
        res.status(201).json(newConsecutivo);

    } catch (error) {
        
        res.status(409).json({ message: error.message });
    }
    
}