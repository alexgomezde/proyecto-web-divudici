import mongoose from 'mongoose';

const eventoSchema = mongoose.Schema({
    id_consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsecutivoMessage'
    },
    codigo: String,
    nombre: String, 
    descripcion: String
});

const EventoMessage = mongoose.model('EventoMessage', eventoSchema);

export default EventoMessage;