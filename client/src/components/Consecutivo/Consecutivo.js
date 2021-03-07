import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getConsecutivos } from '../../actions/consecutivos';
import ConsecutivoData from '../ConsecutivoData/ConsecutivoData';
import ConsecutivoForm from '../ConsecutivoForm/ConsecutivoForm';

import './styles.css';
import { Button, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes,  faSync, faPlus, faEraser, faTools } from '@fortawesome/free-solid-svg-icons';

const Consecutivo = () => {

    const [currenteId, setCurrenteId] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getConsecutivos());
    }, [currenteId, dispatch]);
       
    return (
        <>
            <Row>
                <Col md="12">
                    <div className="heading mt-4 mb-4">
                        <h2 className="d-inline mt-4" >Consecutivos</h2>
                        <button className="float-right" >
                            <FontAwesomeIcon icon={faTimes} size="2x" className="text-white"/>
                        </button>
                        <button className="float-right">
                            <FontAwesomeIcon icon={faSync} size="2x" className="text-white"/>
                        </button>
                    </div>
                    

                </Col>  
                <Col md="3">
                    <div className="sidebar text-center">
                    <FontAwesomeIcon icon={faTools} size="9x" className="text-white mt-5"/>
                    </div>
                </Col>
                <Col md="9">
                    <div className="content">
                        <Row className="mb-4 mt-4">
                            <Col md="8" className="pl-0" >

                                <InputGroup >
                                    <InputGroup.Prepend>
                                        <select className="form-control" id="input-dropdown-search"  searchable="Search here..">
                                            <option value="" disabled >Buscar...</option>
                                            <option value="codigo">Código</option>
                                            <option value="descripcion">Descripción</option>
                                        </select>
                                    </InputGroup.Prepend>
                                    
                                    <FormControl  aria-describedby="basic-addon1" id="inputSearch" />
                                    <InputGroup.Append>
                                        <Button variant="outline-light" id="searchButton"><FontAwesomeIcon icon={faSearch} /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col md="4">
                                <Button variant="outline-light" className="btn-restaurant" ><FontAwesomeIcon icon={faEraser} /></Button>
                                <Button variant="outline-light" className="ml-3 btn-restaurant" onClick={() => setShow(true)} ><FontAwesomeIcon icon={faPlus} /></Button>
                                
                            </Col>
                        </Row>
                        
                        <Row>
                        <div className="table-wrapper">
                            
                            <ConsecutivoData  setShow={setShow} setCurrenteId={setCurrenteId}  />
                            
                        </div>
                        </Row>
                        
                        
                    </div>
                </Col>
            </Row>

            <ConsecutivoForm currenteId={currenteId} setCurrenteId={setCurrenteId} show={show} onHide={() => setShow(false)} setShow={setShow}/>
        </>
    );
}

export default Consecutivo;


