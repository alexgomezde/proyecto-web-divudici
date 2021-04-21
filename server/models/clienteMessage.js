import mongoose from 'mongoose';

const clienteSchema = mongoose.Schema({
    codigo: String,
    nombre: String,
    id_mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MesaMessage'
    },
    montoPagado: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    },
    horaEntrada: Date,
    horaSalida: Date,
    duracionMesa: Date,
    reservacion: Boolean,
    fechaLlegada: Date, 
    fechaReservacion: String, 
    pedidos: Array,
    estadoCuenta: Boolean
});

const ClienteMessage = mongoose.model('ClienteMessage', clienteSchema);

export default ClienteMessage;