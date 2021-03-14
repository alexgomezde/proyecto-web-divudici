import mongoose from 'mongoose';

const paisSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    nombre: String, 
    bandera: String
});

const PaisMessage = mongoose.model('PaisMessage', paisSchema);

export default PaisMessage;