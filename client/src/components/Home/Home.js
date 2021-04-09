import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Navbar, Nav, NavDropdown, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUtensils, faUserTag, faTruckMoving, faTools, faFile } from '@fortawesome/free-solid-svg-icons';

import './styles.css';


const Home = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const user = null;

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
            <h2 className="text-center text-white mt-4 ">Administración Central de los Restaurantes</h2>
            </Col>
            
            <Col md="4" className="text-center pt-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faUserShield} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Seguridad</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>
            <Col md="4" className="text-center pt-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faUtensils} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Restaurantes</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>
            <Col md="4" className="text-center pt-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faUserTag} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Clientes</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>
            <Col md="4" className="text-center p-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faTruckMoving} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Proveedores</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>
            <Col md="4" className="text-center p-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faTools} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Administración</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>
            <Col md="4" className="text-center p-5">
                <button component={Link} to="">
                    <FontAwesomeIcon icon={faFile} size="9x" className="text-white"/>
                    <p className="mt-2 text-white h4">Reportes</p>
                </button>
                {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
            </Col>

        </Row>
    )
};

export default Home;