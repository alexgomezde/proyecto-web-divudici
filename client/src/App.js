import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getConsecutivos } from './actions/consecutivos'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import Consecutivo from './components/Consecutivo/Consecutivo';


const App = () => {
    

    return (
        <div>
            <Container>
                <Consecutivo/>
            </Container>
            
        </div>
    )
}

export default App;