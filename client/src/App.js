import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import Consecutivo from './components/Consecutivo/Consecutivo';
import Restaurante from './components/Restaurante/Restaurante';
import UnidadMedida from './components/UnidadMedida/UnidadMedida';
import Pais from './components/Pais/Pais';
import Marca from './components/Marca/Marca';


const App = () => {
    

    return (
        <div>
            <Container>
                {/* <Consecutivo/>
                <Restaurante/>
                <UnidadMedida />
                <Pais /> */}
                <Marca />
            </Container>
            
        </div>
    )
}

export default App;