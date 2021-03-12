import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import Consecutivo from './components/Consecutivo/Consecutivo';
import Restaurante from './components/Restaurante/Restaurante';


const App = () => {
    

    return (
        <div>
            <Container>
                {/* <Consecutivo/> */}
                <Restaurante/>
            </Container>
            
        </div>
    )
}

export default App;