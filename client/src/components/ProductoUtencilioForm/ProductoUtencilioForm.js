import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';
import { createProducto, getProductos, updateProducto } from '../../actions/productos';

const ProductoUtencilioForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);


    const utencilio = useSelector((state) => currentId ? state.productos.find((b) => b._id === currentId) : null);
    // const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "EVE-") : null);
    console.table(selectedConsecutivo);

    const [utencilioData, setUtencilioData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        cantidad: '',
        id_restaurante: '',
        id_marca: '',
        descripcion: '', 
        nombreError: '', 
        cantidadError: '',
        id_restauranteError: '',
        id_marcaError: '',
        descripcionError: ''
    });


    const validate = () => {

        let nombreError = '';
        let cantidadError = '';
        let id_restauranteError = '';
        let id_marcaError = '';
        let descripcionError = '';

        if(!utencilioData.nombre){
            nombreError = 'Debe ingresar el nombre del utencilio';
        }

        if(!utencilioData.cantidad){
            cantidadError = 'Debe ingresar la cantidad del utencilio';
        }else if(utencilioData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!utencilioData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del utencilio';
        }

        if(!utencilioData.id_marca){
            id_marcaError = 'Debe seleccionar la marca del utencilio';
        }

        if(!utencilioData.descripcion){
            descripcionError = 'Debe ingresar la descripción del utencilio';
        }
    
        if(nombreError || cantidadError || id_restauranteError || id_marcaError || descripcionError  ){
            setUtencilioData({ ...utencilioData, nombreError, cantidadError, id_restauranteError, id_marcaError, descripcionError});
            return false;
        }
        
        return true;
    }


    useEffect(() => { if(selectedConsecutivo){setUtencilioData({ ...utencilioData, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor})} }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(utencilio){setUtencilioData(utencilio)} }, [utencilio]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProducto(currentId, utencilioData));
                setCurrenteId(null);
                dispatch(getProductos());
                clearForm();
                setshow(false);
            }else{

                dispatch(createProducto(utencilioData));
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
        setUtencilioData({
            nombre: '', 
            cantidad: '',
            id_restaurante: '',
            id_marca: '',
            descripcion: '', 
            nombreError: '', 
            cantidadError: '',
            id_restauranteError: '',
            id_marcaError: '',
            descripcionError: ''       
        });
    }
    
    
    return(

        <Modal size="m" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Utencilio' : 'Crear Utencilio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={utencilioData.codigo}></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Restaurante</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_restaurante"  className={ (utencilioData.id_restauranteError) ? 'is-invalid' : ''} value={utencilioData.id_restaurante} onChange={(e) => setUtencilioData({ ...utencilioData, id_restaurante: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{utencilioData.id_restauranteError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (utencilioData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={utencilioData.nombre} onChange={(e) => setUtencilioData({ ...utencilioData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Marca</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_marca"  className={ (utencilioData.id_marcaError) ? 'is-invalid' : ''} value={utencilioData.id_marca} onChange={(e) => setUtencilioData({ ...utencilioData, id_marca: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{utencilioData.id_marcaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Cantidad</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (utencilioData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={utencilioData.cantidad} onChange={(e) => setUtencilioData({ ...utencilioData, cantidad: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.cantidadError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Descripción</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl as="textarea" className={ (utencilioData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={utencilioData.descripcion} onChange={(e) => setUtencilioData({ ...utencilioData, descripcion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.descripcionError}</small>
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

export default ProductoUtencilioForm;