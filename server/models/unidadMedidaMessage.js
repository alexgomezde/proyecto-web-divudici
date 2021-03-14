import mongoose from 'mongoose';

const unidadMedidaSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    unidad: String,
    escala: String, 
    detalle: String, 
    simbolo: String, 
    simbologia: String
});

const UnidadMedidaMessage = mongoose.model('UnidadMedidaMessage', unidadMedidaSchema);

export default UnidadMedidaMessage;