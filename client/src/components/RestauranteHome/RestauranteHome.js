import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantes } from '../../actions/restaurantes';
import { createCaja } from '../../actions/cajas';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const RestauranteHome = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();

    const [bitacoraData, setBitacoraData] = useState({
        codigo: '',
        usuario: user.result._id, 
        fecha: new Date().toLocaleDateString(),
        descripción: '',
        id_restaurante: ''
    });

    const [cajaData, setCajaData] = useState({
        fecha: moment().format('L'),
        descripcion: `Apertura de caja realizada por ${user.result.codigo}`,
        entradaDinero: '',
        aperturaCaja: '',
        cierreCaja: 0,
        id_restaurante: user.result.id_restaurante,
        entradaDineroError: '',
    })


    useEffect(() => {
        dispatch(getRestaurantes());
    }, [ dispatch ]);

    const restaurantes = useSelector((state) => state.restaurantes);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){

            dispatch(createCaja(cajaData));
            
            history.push('/salon');
        }

    }

    const validate = () => {

        let entradaDineroError = '';

        if(!cajaData.entradaDinero){
            entradaDineroError = 'Debe ingresar el monto de apertura';
        }else if(cajaData.entradaDinero < 1){
            entradaDineroError = 'El monto de apertura debe mayor a 0';
        }
        
        if(entradaDineroError){
            setCajaData({ ...cajaData, entradaDineroError});
            return false;
        }        
        return true;
    }



    const clearForm = () => {

        setCajaData({
            entradaDinero: '', 
            entradaDineroError: '', 
        });
    }


    return(
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">Apertura de Cajas</h2>
            </Col>

            {(user.result.privilegio === "restaurante") && 

            
                <Col md="6" className="text-center pt-5 offset-md-3">
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Form.Label className="text-white">Restaurante</Form.Label>
                        <FormGroup>
                            <Form.Control as="select" name="id_restaurante"  value={user.result.id_restaurante} disabled >
                                {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                            </Form.Control>
                        </FormGroup>

                  
                        <Form.Label className="text-white">Monto de Apertura</Form.Label>
                            
                        <FormGroup>
                            <Form.Control className={ (cajaData.entradaDineroError) ? 'is-invalid' : ''} type="number" name="entradaDinero" value={ cajaData.entradaDinero } onChange={(e) => setCajaData({ ...cajaData, entradaDinero: e.target.value, aperturaCaja: e.target.value})}></Form.Control>
                            <small className="form-text text-danger">{cajaData.entradaDineroError}</small>
                        </FormGroup>

            
                            <Col md="12 mb-5">
                                <Button className="mr-2 btn-restaurant " variant="outline-light" onClick={ clearForm } >
                                    <FontAwesomeIcon icon={faEraser} size="2x"></FontAwesomeIcon>
                                </Button>
                                <Button className="mr-3 btn-restaurant" variant="outline-light" type="submit">
                                    <FontAwesomeIcon icon={faSignInAlt} size="2x"></FontAwesomeIcon>
                                </Button>
                                
                            </Col>
 
                            

                    </Form>
                </Col>
            }

        </Row>
    )
};

export default RestauranteHome;