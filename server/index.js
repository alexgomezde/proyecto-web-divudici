import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import consecutivoRoutes from './routes/consecutivos.js';
import restauranteRoutes from './routes/restaurantes.js';
import unidadesMedidaRoutes from './routes/unidadesMedida.js';


const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})); //send the request
app.use(cors());

app.use('/consecutivos', consecutivoRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/unidadesMedida', unidadesMedidaRoutes);


//database connection

const CONNECTION_URL = 'mongodb+srv://divudici:divudici2021@cluster0.u4a1e.mongodb.net/dbdivudici';
const PORT = process.env.PORT || 5000; //to connect to Heroku

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); // Avoid warnings in the console



