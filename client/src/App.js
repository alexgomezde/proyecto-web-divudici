import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Consecutivo from './components/Consecutivo/Consecutivo';
import Restaurante from './components/Restaurante/Restaurante';
import UnidadMedida from './components/UnidadMedida/UnidadMedida';
import Pais from './components/Pais/Pais';
import Marca from './components/Marca/Marca';
import Buffet from './components/Buffet/Buffet';
import Evento from './components/Evento/Evento';
import BebidaCaliente from './components/BebidaCaliente/BebidaCaliente';
import BebidaHelada from './components/BebidaHelada/BebidaHelada';
import BebidaGaseosa from './components/BebidaGaseosa/BebidaGaseosa';
import BebidaLicor from './components/BebidaLicor/BebidaLicor';
import BebidaVino from './components/BebidaVino/BebidaVino';
import Especialidad from './components/Especialidad/Especialidad';
import Mesa from './components/Mesa/Mesa';
import Puesto from './components/Puesto/Puesto';
import Empleado from './components/Empleado/Empleado';
import Usuario from './components/Usuario/Usuario';
import ProductoComestible from './components/ProductoComestible/ProductoComestible';
import ProductoDesechable from './components/ProductoDesechable/ProductoDesechable';
import ProductoLimpieza from './components/ProductoLimpieza/ProductoLimpieza';


const App = () => {
    

    return (
        <div>
            <Container>
                {/* <Consecutivo/>
                <Restaurante/>
                <UnidadMedida />
                <Pais />
                <Marca />
                <Buffet />
                <Evento />
                <BebidaCaliente />
                <BebidaHelada/>
                <BebidaGaseosa/>
                <BebidaLicor/>
                <BebidaVino/>
                <Especialidad/>
                <Mesa/>
                <Puesto/>
                <Empleado/>
                <Usuario/>
                <ProductoComestible/>
                <ProductoDesechable/> */}
                <ProductoLimpieza/>
            </Container>
            
        </div>
    )
}

export default App;