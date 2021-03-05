import React, { useState } from 'react';
import './styles.css';
import { Button, Table, Row, Col, Form, FormControl, InputGroup, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes,  faSync, faPlus, faEraser, faTools, faSave, faPen, faTrash} from '@fortawesome/free-solid-svg-icons';




const Consecutivo = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
            
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
                                        <select class="form-control" id="input-dropdown-search"  searchable="Search here..">
                                            <option value="" disabled selected>Buscar...</option>
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
                                <Button variant="outline-light" className="ml-3 btn-restaurant" onClick={handleShow} ><FontAwesomeIcon icon={faPlus} /></Button>
                                
                            </Col>
                        </Row>
                        
                        <Row>
                        <div className="table-wrapper">
                            <Table className="text-center" striped  >
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Valor </th>
                                        <th>Contiene Prefijo</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                                        <td><Button className="btn-action"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    
                                   
                                   
                                    
                                </tbody>
                            </Table>
                            
                        </div>
                        </Row>
                        
                        
                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header className="mheader" closeButton>
                <Modal.Title>Información de Consecutivos</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mbody">
                    <Form>
                        <Row>
                            <Col md="3"className="text-right pt-1">
                                <Form.Label >Tipo</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Form.Control as="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Descripción</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="text"></FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Valor</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="number"></FormControl>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
             
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Form.Check type="checkbox" label="El consecutivo posee prefijo" />
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Prefijo</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="text"></FormControl>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="mfooter">
                <Button variant="outline-light" onClick={handleClose}>
                    <FontAwesomeIcon icon={faEraser} ></FontAwesomeIcon>
                </Button>
                <Button variant="outline-light" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} ></FontAwesomeIcon>
                </Button>
                <Button variant="outline-light" onClick={handleClose}>
                    <FontAwesomeIcon icon={faSave} ></FontAwesomeIcon>
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Consecutivo;


