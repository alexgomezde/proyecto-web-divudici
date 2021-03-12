import mongoose from 'mongoose';

const restauranteSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    nombre: String, 
    especialidad: String,
    direccion: String,
    telefono: Number,
    activo: Boolean
});

const RestauranteMessage = mongoose.model('RestauranteMessage', restauranteSchema);

export default RestauranteMessage;