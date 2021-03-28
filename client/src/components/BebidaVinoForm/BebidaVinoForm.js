import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';
import { createBebida, getBebidas, updateBebida } from '../../actions/bebidas';
import FileBase from 'react-file-base64';



const BebidaVinoForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const nacionalidades = useSelector((state) => state.paises);

    const bebida = useSelector((state) => currentId ? state.bebidas.find((b) => b._id === currentId) : null);
    // const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "EVE-") : null);
    console.table(selectedConsecutivo);

    const [bebidaVino, setBebidaVino] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        id_marca: '',
        id_nacionalidad: '',
        precioUnitario: '',
        precioBotella: '',
        id_restaurante: '',
        annoCosecha: '',
        cantidad: '', 
        descripcion: '',
        foto: '',
        nombreError: '', 
        id_marcaError: '',
        id_nacionalidadError: '',
        precioUnitarioError: '',
        precioBotellaError: '',
        id_restauranteError: '', 
        cantidadError: '', 
        annoCosechaError: '', 
        descripcionError: '',
        fotoError: ''

    });


    const validate = () => {

        let nombreError = '';
        let id_marcaError = '';
        let id_nacionalidadError = '';
        let precioUnitarioError = '';
        let precioBotellaError = '';
        let id_restauranteError = '';
        let cantidadError = '';
        let annoCosechaError = '';
        let descripcionError = '';
        let fotoError = '';

        if(!bebidaVino.nombre){
            nombreError = 'Debe ingresar el nombre del vino';
        }

        if(!bebidaVino.id_marca){
            id_marcaError = 'Debe ingresar la marca del vino';
        }

        if(!bebidaVino.id_nacionalidad){
            id_nacionalidadError = 'Debe ingresar la nacionalidad del vino';
        }

        if( !bebidaVino.precioUnitario){
            precioUnitarioError = 'Debe ingresar el precio del vino';
        }else if(bebidaVino.precioUnitario < 1){
            precioUnitarioError = 'Números deben ser mayor a 0';
        }

        if(!bebidaVino.precioBotella){
            precioBotellaError = 'Debe ingresar el precio de la botella de vino';
        }else if(bebidaVino.precioBotella < 1){
            precioBotellaError = 'Números deben ser mayor a 0';
        }

        if(!bebidaVino.annoCosecha){
            annoCosechaError = 'Debe ingresar el año de cosecha del vino';
        }else if((bebidaVino.annoCosecha < new Date().getFullYear()  - 50) || (bebidaVino.annoCosecha > new Date().getFullYear())){
            annoCosechaError = 'Debe ingresar un año de cosecha válido';
        }

        if(!bebidaVino.cantidad){
            cantidadError = 'Debe ingresar la cantidad de unidades de vino';
        }else if(bebidaVino.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!bebidaVino.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del vino';
        }

        if(!bebidaVino.descripcion){
            descripcionError = 'Debe ingresar la descripción del vino';
        }

        if(!bebidaVino.foto){
            fotoError = 'Debe subir una foto del vino';
        }

    
        if(nombreError || descripcionError || id_marcaError || id_nacionalidadError || precioUnitarioError || precioBotellaError || annoCosechaError || id_restauranteError || cantidadError || fotoError){
            setBebidaVino({ ...bebidaVino, nombreError, descripcionError, id_marcaError, id_nacionalidadError, precioUnitarioError, precioBotellaError, annoCosechaError, id_restauranteError, cantidadError, fotoError});
            return false;
        }
        
        return true;
    }


    useEffect(() => { if(selectedConsecutivo){setBebidaVino({ ...bebidaVino, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor})} }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(bebida){setBebidaVino(bebida)} }, [bebida]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateBebida(currentId, bebidaVino));
                setCurrenteId(null);
                dispatch(getBebidas());
                clearForm();
                setshow(false);
            }else{

                console.table(bebidaVino);
                dispatch(createBebida(bebidaVino));
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
        setBebidaVino({
            nombre: '', 
            id_marca: '',
            id_nacionalidad: '',
            precioUnitario: '',
            precioBotella: '',
            id_restaurante: '',
            annoCosecha: '',
            cantidad: '', 
            descripcion: '',
            foto: '',
            nombreError: '', 
            id_marcaError: '',
            id_nacionalidadError: '',
            precioUnitarioError: '',
            precioBotellaError: '',
            id_restauranteError: '', 
            cantidadError: '', 
            annoCosechaError: '', 
            descripcionError: '',
            fotoError: ''      
        });
    }
    
    
    return(

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Vino' : 'Crear Vino'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody modal-lg">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={bebidaVino.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaVino.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={bebidaVino.nombre} onChange={(e) => setBebidaVino({ ...bebidaVino, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_marca"  className={ (bebidaVino.id_marcaError) ? 'is-invalid' : ''} value={bebidaVino.id_marca} onChange={(e) => setBebidaVino({ ...bebidaVino, id_marca: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaVino.id_marcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nacionalidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_nacionalidad"  className={ (bebidaVino.id_nacionalidadError) ? 'is-invalid' : ''} value={bebidaVino.id_nacionalidad} onChange={(e) => setBebidaVino({ ...bebidaVino, id_nacionalidad: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {nacionalidades.map((nacionalidad) => <option key={nacionalidad._id} value={nacionalidad._id}>{nacionalidad.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaVino.id_nacionalidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio Unitario</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaVino.precioUnitarioError) ? 'is-invalid' : ''} type="number" name="precioUnitario" value={bebidaVino.precioUnitario} onChange={(e) => setBebidaVino({ ...bebidaVino, precioUnitario: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.precioUnitarioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio Botella</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaVino.precioBotellaError) ? 'is-invalid' : ''} type="number" name="precioBotella" value={bebidaVino.precioBotella} onChange={(e) => setBebidaVino({ ...bebidaVino, precioBotella: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.precioBotellaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Año Cosecha</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaVino.annoCosechaError) ? 'is-invalid' : ''} type="number" name="annoCosecha" value={bebidaVino.annoCosecha} onChange={(e) => setBebidaVino({ ...bebidaVino, annoCosecha: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.annoCosechaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>


                        <Col md="6">
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (bebidaVino.id_restauranteError) ? 'is-invalid' : ''} value={bebidaVino.id_restaurante} onChange={(e) => setBebidaVino({ ...bebidaVino, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaVino.id_restauranteError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Cantidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaVino.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={bebidaVino.cantidad} onChange={(e) => setBebidaVino({ ...bebidaVino, cantidad: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.cantidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaVino.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaVino.descripcion} onChange={(e) => setBebidaVino({ ...bebidaVino, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaVino.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (bebidaVino.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={bebidaVino.foto} onDone={({base64}) => setBebidaVino({ ...bebidaVino, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{bebidaVino.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={bebidaVino.foto}/>
                                    </FormGroup>
                                </Col>
                            </Row>
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

export default BebidaVinoForm;