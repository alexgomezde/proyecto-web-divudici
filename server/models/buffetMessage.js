import mongoose from 'mongoose';

const buffetSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    nombre: String, 
    precio: Number, 
    tipo: String, 
    id_unidadMedida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnidadMedidaMessage'
    },
    foto: String
});

const BuffetMessage = mongoose.model('BuffetMessage', buffetSchema);

export default BuffetMessage;