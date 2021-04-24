import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getBitacoras } from '../../actions/bitacoras';
import { getMesas } from '../../actions/mesas';
import { getRestaurantes } from '../../actions/restaurantes';
import { getEspecialidades} from '../../actions/especialidades';
import { getConsecutivos} from '../../actions/consecutivos';
import { getClientes } from '../../actions/clientes';
import { Link } from 'react-router-dom';
import ClienteForm from '../ClienteForm/ClienteForm';

import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes,  faSync, faCalendarAlt, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import TableLogo from '../../images/table.svg';
import BuffetLogo from '../../images/buffet.svg';
import './styles.css';



const RestauranteSalon = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [show, setShow] = useState(false);
    const [currentMesaId, setCurrenteMesaId] = useState(null);
    const [currentClienteId, setClienteCurrenteId] = useState(null);
    const [currentRestauranteId, setCurrentRestauranteId] = useState(user.result.id_restaurante);
    const dispatch = useDispatch();
   
    const reload=()=>{window.location.reload()};

    
    useEffect(() => {
        dispatch(getBitacoras());
        dispatch(getMesas());
        dispatch(getRestaurantes());
        dispatch(getEspecialidades());
        dispatch(getConsecutivos());
        dispatch(getClientes());
    }, [ currentMesaId, dispatch ]);

    const mesas = useSelector((state) => state.mesas);
    const restaurantes = useSelector((state) => state.restaurantes);
    const bebidas = useSelector((state) => state.bebidas);
    const clientes = useSelector((state) => state.clientes);


    return (
        <>
            <Row>
                <Col md="12">
                    <div className="heading mt-4 mb-4">
                         {restaurantes.map( restaurante => {

                            if(restaurante._id === user.result.id_restaurante){

                                return (
                                    <h2 className="d-inline mt-4"> {restaurante.nombre} </h2>
                                )
                            }

                        })}
                        <button className="float-right">
                            <Link to={location => ({ ...location, pathname: "/cierreCaja" })} >
                                <FontAwesomeIcon icon={faTimes} size="2x" className="text-white"/>
                            </Link> 
                        </button>
                        <button className="float-right" onClick={reload}>
                            <FontAwesomeIcon icon={faSync} size="2x" className="text-white"/>
                        </button>
                    </div>
                    

                </Col>  
                <Col md="3">
                    <div className="sidebar text-center">
                    <Col md="12">
                        <Button variant="outline-light" className="mt-3 menu-item">
                            <img src={TableLogo} alt="Mesa logo" width="80px"></img>
                        </Button>
                    </Col>
                    <Col md="12">
                        <Button variant="outline-light" className="mt-3 menu-item">
                            <FontAwesomeIcon icon={faCalendarAlt} size="4x" className="text-white"/>
                        </Button>
                    </Col>
                    <Col md="12">
                        <Button variant="outline-light" className="mt-3 menu-item">
                            <FontAwesomeIcon icon={faPeopleArrows} size="3x" className="text-white"/>
                        </Button>
                    </Col>
                    <Col md="12">
                        <Button variant="outline-light" className="mt-3 menu-item">
                            <img src={BuffetLogo} alt="Especialidad logo" width="80px"></img>
                        </Button>
                    </Col>
     
                    
                    </div>
                </Col>
                <Col md="9 mb-5">
                    <div className="content">

                        <Row>
                        
                        {mesas.map( mesa => {

                            if(mesa.id_restaurante === user.result.id_restaurante){

                                return (
                                    <Col md="3 text-center">
                                        <Button variant="secondary" className={(mesa.estado === "disponible") ? 'btn btn-success mt-2' : 'btn btn-danger mt-2'} onClick={() => { setCurrenteMesaId(mesa._id); setClienteCurrenteId(mesa.codigoCliente); setShow(true);}}>
                                            <img src={TableLogo} alt="Mesa logo" width="50px"></img>
                                            <p>{mesa.nombre}</p>
                                            <p>Número mesa: {mesa.numero}</p>
                                            <p>Cantidad Sillas: {mesa.cantidadSillas}</p>
                                        </Button>
                                    </Col>
                                )
                            }

                        })}

                        </Row>
                        
                    </div>
                </Col>
            </Row>

            <ClienteForm  isOpen={show} setshow={setShow} currentMesaId={currentMesaId} setCurrenteMesaId={setCurrenteMesaId} currentRestauranteId={currentRestauranteId} currentClienteId={currentClienteId} setClienteCurrenteId={setClienteCurrenteId}/>

        </>
    );
}

export default RestauranteSalon;