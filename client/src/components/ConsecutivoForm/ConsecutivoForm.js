import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { createConsecutivo, updateConsecutivo } from '../../actions/consecutivos';


const ConsecutivoForm = ({currenteId, setCurrenteId, show, onHide, setShow}) => {

    const consecutivo = useSelector((state) => currenteId ? state.consecutivos.find((c) => c._id === currenteId) : null);

    const [checked, setChecked] = useState(false);
    const [consecutivoData, setConsecutivoData] = useState({tipo: '', descripcion: '', valor: '', tienePrefijo: checked , prefijo: ''});

    useEffect(() => {
        if(consecutivo) setConsecutivoData(consecutivo)
    }, [consecutivo]);
    

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currenteId) {
            dispatch(updateConsecutivo(currenteId, consecutivoData));

        }else{
            dispatch(createConsecutivo(consecutivoData));
        }

        clearForm();
        setShow(false);
    }

    const clearForm = () => {
        setCurrenteId(null);
        setConsecutivoData({tipo: '', descripcion: '', valor: '', tienePrefijo: '', prefijo: ''});
    }
    
    return(

        <>
            <Modal show={show} onHide={onHide} className="modal">
                <Modal.Header className="mheader" closeButton>
                <Modal.Title>{ currenteId ? 'Editar Consecutivo' : 'Información de Consecutivos'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mbody">
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                        <Row>
                            <Col md="3"className="text-right pt-1">
                                <Form.Label >Tipo</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Form.Control as="select" name="tipo" value={consecutivoData.tipo} onChange={(e) => setConsecutivoData({ ...consecutivoData, tipo: e.target.value})}>
                                        <option value="">--Seleccione--</option>
                                        <option value="Clientes">Clientes</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Proveedores">Proveedores</option>
                                        <option value="Puestos">Puestos</option>
                                        <option value="Eventos o Roles">Eventos o Roles</option>
                                        <option value="Usuarios">Usuarios</option>
                                        <option value="Proveedores">Proveedores</option>
                                        <option value="Unidades de Medida">Unidades de Medida</option>
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
                                    <FormControl type="text" name="descripcion" value={consecutivoData.descripcion} onChange={(e) => setConsecutivoData({ ...consecutivoData, descripcion: e.target.value})}></FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Valor</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="number" name="valor" value={consecutivoData.valor} onChange={(e) => setConsecutivoData({ ...consecutivoData, valor: e.target.value})}></FormControl>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
             
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Form.Check type="checkbox" label="El consecutivo posee prefijo" name="tienePrefijo" defaultChecked={checked} onChange={(e) => {setConsecutivoData({ ...consecutivoData, tienePrefijo: e.target.checked});  setChecked(!checked); }}/>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Prefijo</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="text" id="prefijoTxt" name="prefijo" disabled={!checked} value={consecutivoData.prefijo} onChange={(e) => setConsecutivoData({ ...consecutivoData, prefijo: e.target.value})}></FormControl>
                                </FormGroup>
                                
                            </Col>
                        </Row>
                        <Row className="float-right">
                            <Col>
                                <Button className="mr-2 btn-restaurant" variant="outline-light" onClick={ clearForm } >
                                    <FontAwesomeIcon icon={faEraser} size="2x"></FontAwesomeIcon>
                                </Button>
                                <Button className="mr-3 btn-restaurant" variant="outline-light" type="submit">
                                    <FontAwesomeIcon icon={faSave} size="2x"></FontAwesomeIcon>
                                </Button>
                            </Col>
                            
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="mfooter"> </Modal.Footer>

            </Modal>
        </>

        
    );
};

export default ConsecutivoForm;