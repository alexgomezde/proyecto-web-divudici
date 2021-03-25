import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';
import { createEvento, getEventos, updateEvento } from '../../actions/eventos';




const EventoForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();

    const evento = useSelector((state) => currentId ? state.eventos.find((e) => e._id === currentId) : null);
    // const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "EVE-") : null);
    console.table(selectedConsecutivo);

    const [eventoData, setEventoData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        descripcion: '',
        nombreError: '', 
        descripcionError: '',

    });


    const validate = () => {

        let nombreError = '';
        let descripcionError = '';
       
        if(!eventoData.nombre){
            nombreError = 'Debe ingresar el nombre del evento';
        }

        if(!eventoData.descripcion){
            descripcionError = 'Debe ingresar la descripción del evento';
        }


        if(nombreError || descripcionError ){
            setEventoData({ ...eventoData, nombreError, descripcionError});
            return false;
        }
        
        return true;
    }


    useEffect(() => { if(selectedConsecutivo){setEventoData({ ...eventoData, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor})} }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(evento){setEventoData(evento)} }, [evento]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateEvento(currentId, eventoData));
                setCurrenteId(null);
                dispatch(getEventos());
                clearForm();
                setshow(false);
            }else{
                dispatch(createEvento(eventoData));
                selectedConsecutivo.valor++;
                dispatch(updateConsecutivo(selectedConsecutivo._id, selectedConsecutivo));
                dispatch(getConsecutivos());
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setEventoData({
            nombre: '', 
            descripcion: '',
            nombreError: '', 
            descripcionError: ''       
        });
    }
    
    
    return(

        <Modal show={isOpen} onHide={setshow} onExit={clearForm} className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Evento' : 'Crear Evento'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={eventoData.codigo}></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (eventoData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={eventoData.nombre} onChange={(e) => setEventoData({ ...eventoData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{eventoData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Descripción</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (eventoData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={eventoData.descripcion} onChange={(e) => setEventoData({ ...eventoData, descripcion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{eventoData.descripcionError}</small>
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
    );
};

export default EventoForm;