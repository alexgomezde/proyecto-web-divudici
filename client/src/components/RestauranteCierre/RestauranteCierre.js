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
import { faEraser, faSignInAlt, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const RestauranteCierre = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();

    const [cajaData, setCajaData] = useState({
        fecha: moment().format('L'),
        descripcion: `Cierre de caja realizada por ${user.result.codigo}`,
        entradaDinero: '',
        aperturaCaja: 0,
        cierreCaja: '',
        id_restaurante: user.result.id_restaurante,
        cierreCajaError: '',
    })

    const [bitacoraData, setBitacoraData] = useState({
        codigo: '',
        usuario: user.result._id, 
        fecha: new Date().toLocaleDateString(),
        descripción: '',
        id_restaurante: '',
        montoApertura: '',
        montoAperturaError: ''
    });


    useEffect(() => {
        dispatch(getRestaurantes());
    }, [ dispatch ]);

    const restaurantes = useSelector((state) => state.restaurantes);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            dispatch(createCaja(cajaData));
            history.push('/home');
        }

    }

    const validate = () => {

        let cierreCajaError = '';

        if(!cajaData.cierreCaja){
            cierreCajaError = 'Debe ingresar el monto de cierre';
        }else if(cajaData.cierreCaja < 1){
            cierreCajaError = 'El monto de cierre debe mayor a 0';
        }
        
        if(cierreCajaError){
            setCajaData({ ...cajaData, cierreCajaError});
            return false;
        }        
        return true;
    }

    const clearForm = () => {

        setBitacoraData({
            montoApertura: '', 
            montoAperturaError: '', 
        });
    }


    return(
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">
                <button className="float-left ">
                    <Link to={location => ({ ...location, pathname: "/salon" })} >
                        <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" className="text-white"/>
                    </Link> 
                </button>
                Cierre de Caja</h2>
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

                  
                        <Form.Label className="text-white">Monto de Cierre</Form.Label>
                            
                        <FormGroup>
                            <Form.Control className={ (cajaData.cierreCajaError) ? 'is-invalid' : ''} type="number" name="nombre" value={cajaData.cierreCaja} onChange={(e) => setCajaData({ ...cajaData, cierreCaja: e.target.value, entradaDinero: e.target.value})}></Form.Control>
                            <small className="form-text text-danger">{cajaData.cierreCajaError}</small>
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

export default RestauranteCierre;