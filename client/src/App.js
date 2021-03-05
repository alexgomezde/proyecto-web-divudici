import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import Consecutivos from './components/Consecutivos/Consecutivos'


const App = () => {
    return (
        <div>
            <Container>
                <Consecutivos></Consecutivos>
               
            </Container>
            
            
        </div>
    )
}

export default App;