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
    horaEntrada: String,
    horaSalida: String,
    duracionMesa: String,
    reservacion: Boolean,
    fechaLlegada: String, 
    fechaReservacion: String, 
    pedidos: [{
        id : Number,
        id_especialidad : String,
        precio: Number,
        buffet: Boolean
         }],
    estadoCuenta: Boolean
});

const ClienteMessage = mongoose.model('ClienteMessage', clienteSchema);

export default ClienteMessage;