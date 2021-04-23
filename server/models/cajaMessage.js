import mongoose from 'mongoose';

const cajaSchema = mongoose.Schema({
    fecha: String,
    descripcion: String,
    entradaDinero: Number,
    aperturaCaja: Number,
    cierreCaja: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    }
});

const CajaMessage = mongoose.model('CajaMessage', cajaSchema);

export default CajaMessage;