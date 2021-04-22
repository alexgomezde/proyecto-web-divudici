import mongoose from 'mongoose';

const cajaSchema = mongoose.Schema({
    codigo: String,
    fecha: String,
    descripcion: String,
    EntradaDinero: String,
    AperturaCaja: Number,
    CierreCaja: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    }
});

const CajaMessage = mongoose.model('CajaMessage', cajaSchema);

export default CajaMessage;