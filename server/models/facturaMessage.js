import mongoose from 'mongoose';

const facturaSchema = mongoose.Schema({
    codigo: String,
    fecha: String,
    descripcion: String,
    entradaDinero: String,
    aperturaCaja: Number,
    cierreCaja: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    }
});

const FacturaMessage = mongoose.model('FacturaMessage', facturaSchema);

export default FacturaMessage;