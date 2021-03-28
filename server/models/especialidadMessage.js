import mongoose from 'mongoose';

const especialidadSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    nombre: String, 
    ingredientes: Array,
    precio: Number,
    detalle: String,
    foto: String,
});

const EspecialidadMessage = mongoose.model('EspecialidadMessage', especialidadSchema);

export default EspecialidadMessage;