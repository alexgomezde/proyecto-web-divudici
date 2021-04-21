import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faFileInvoiceDollar, faFileAlt, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';



const ReportesHome = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const dispatch = useDispatch();
    const [usuarioData, setUsuarioData] = useState({
        login: '', 
        password: '', 
        loginError: '', 
        passwordError: '', 
    
    });

    const validate = () => {

        let loginError = '';
        let passwordError = ''; 

        if(!usuarioData.login){
            loginError = 'Debe Ingresar el usuario';
        }

        if(!usuarioData.password){
            passwordError = 'Debe ingresar la contraseña';
        }

        
        if(loginError || passwordError){
            setUsuarioData({ ...usuarioData, loginError, passwordError});
            return false;
        }        
        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            
        }

    }
        

    const clearForm = () => {

        setUsuarioData({
            login: '', 
            password: '', 
            loginError: '', 
            passwordError: ''
        });
    }
    
    return(
        
        <Row className="home mt-5">


            <Col md="12" >
            
                <h2 className="text-center text-white mt-4 ">
                    <button className="float-left ">
                                <Link to={location => ({ ...location, pathname: "/Home" })} >
                                    <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" className="text-white"/>
                                </Link> 
                    </button>
                    Reportes
                </h2>
            </Col>

            {(user.result.privilegio === "seguridad") && 

                <Col md="4" className="text-center pt-5 mb-5">
                    <Link to={location => ({ ...location, pathname: "/bitacoras" })} >
                        <button>
                            <FontAwesomeIcon icon={faFileAlt} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Bitácoras</p>
                        </button>
                    </Link>
                </Col>
                
            }

            {(user.result.privilegio === "seguridad") && 

            <Col md="4" className="text-center pt-5 mb-5">
                <Link to={location => ({ ...location, pathname: "/clientes" })} >
                    <button>
                        <FontAwesomeIcon icon={faUserLock} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Clientes</p>
                    </button>
                </Link>
            </Col>

            }

            {(user.result.privilegio === "seguridad") && 

            <Col md="4" className="text-center pt-5 mb-5">
                <Link to={location => ({ ...location, pathname: "/clientes" })} >
                    <button>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Facturación</p>
                    </button>
                </Link>
            </Col>

            }
            
            

        </Row>
    )
};

export default ReportesHome;