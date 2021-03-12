import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo, updateConsecutivo } from '../../actions/consecutivos';
import { createRestaurante, updateRestaurante } from '../../actions/restaurantes';


const RestauranteForm = ({currentId, setCurrenteId, isOpen, setshow, onExit, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurante = useSelector((state) => currentId ? state.restaurantes.find((r) => r._id === currentId) : null);
    const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.tipo === "Restaurantes") : null);

    const [checked, setChecked] = useState(true);    
    const [restauranteData, setRestauranteData] = useState({
        id_consecutivo: '',
        codigo: '', 
        nombre: '', 
        especialidad: '', 
        direccion: '', 
        telefono: '', 
        activo: checked, 
        nombreError: '', 
        especialidadError: '', 
        direccionError: '', 
        telefonoError: ''
    
    });


    const validate = () => {

        let nombreError ='';
        let especialidadError = '';
        let direccionError = '';
        let telefonoError = '';


        if(!restauranteData.nombre){
            nombreError = 'Debe ingresar un nombre para el restaurante';
        }

        if(!restauranteData.especialidad){
            especialidadError = 'Debe ingresar una especialidad';
        }

        if(!restauranteData.direccion){
            direccionError = 'Debe ingresar la dirección del restaurante';
        }

        if(!restauranteData.telefono){
            telefonoError = 'Debe ingresar el teléfono del restaurante';
        }

        if(restauranteData.telefono < 0){
            telefonoError = 'No se permiten números negativos';
        }

        if(nombreError || especialidadError ||  direccionError || telefonoError){
            setRestauranteData({ ...restauranteData, nombreError, especialidadError , direccionError, telefonoError });
            return false;
        }

        
        return true;

    }

    //populate data on edit
    useEffect(() => { if(selectedConsecutivo){

            setRestauranteData({ ...restauranteData, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor});
        } 
    }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(restaurante){setRestauranteData(restaurante)} 
    }, [restaurante]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateRestaurante(currentId, restauranteData));
                clearForm();
                setshow(false);
           
    
            }else{

                dispatch(createRestaurante(restauranteData));
                selectedConsecutivo.valor++;
                dispatch(updateConsecutivo(selectedConsecutivo._id, selectedConsecutivo));
                clearForm();
                setshow(false);

                
            }
        }

    }
        

    const clearForm = () => {
        setRestauranteData({nombre: '', especialidad: '', direccion: '', telefono: ''});
    }

    
    
    return(

        <Modal show={isOpen} onHide={setshow}  className="modal" onExit={onExit}>
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Restaurante' : 'Crear Restaurante'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={restauranteData.codigo} ></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (restauranteData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={restauranteData.nombre} onChange={(e) => setRestauranteData({ ...restauranteData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{restauranteData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Especialidad</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (restauranteData.especialidadError) ? 'is-invalid' : ''} type="text" name="especialidad" value={restauranteData.especialidad} onChange={(e) => setRestauranteData({ ...restauranteData, especialidad : e.target.value})}></FormControl>
                                <small className="form-text text-danger">{restauranteData.especialidadError}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Dirección</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (restauranteData.direccionError) ? 'is-invalid' : ''} type="text" name="direccion" value={restauranteData.direccion} onChange={(e) => setRestauranteData({ ...restauranteData, direccion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{restauranteData.direccionError}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Teléfono</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (restauranteData.telefonoError) ? 'is-invalid' : ''} type="number" name="valor" value={restauranteData.telefono} onChange={(e) => setRestauranteData({ ...restauranteData, telefono: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{restauranteData.telefonoError}</small>
                            </FormGroup>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
            
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Check type="checkbox" label="Activo" name="activo" defaultChecked={checked} onChange={(e) => {setRestauranteData({ ...restauranteData, activo: e.target.checked});  setChecked(!checked); }}/>
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

export default RestauranteForm;