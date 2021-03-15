import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MarcaFormStyles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateConsecutivo } from '../../actions/consecutivos';
import { createMarca, updateMarca } from '../../actions/marcas';
import FileBase from 'react-file-base64';


const MarcaForm = ({currentId, setCurrenteId, isOpen, setshow, onExit, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const paises = useSelector((state) => state.paises);
    const marca = useSelector((state) => currentId ? state.marcas.find((r) => r._id === currentId) : null);
    const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "M-") : null);
    const [marcaData, setMarcaData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        id_nacionalidad: '',
        descripcion: '', 
        fotoMarca: '', 
        cedulaJuridica: '',
        nombreEmpresa: '', 
        detalleEmpresa: '', 
        telefono: '', 
        fotoEmpresa: '',
        nombreError: '', 
        id_nacionalidadError: '',
        descripcionError: '', 
        fotoMarcaError: '', 
        cedulaJuridicaError: '',
        nombreEmpresaError: '', 
        detalleEmpresaError: '', 
        telefonoError: '', 
        fotoEmpresaError: ''
    });

    const validate = () => {

        let nombreError = '';
        let id_nacionalidadError = '';
        let descripcionError = '';
        let fotoMarcaError = '';
        let cedulaJuridicaError = '';
        let nombreEmpresaError = '';
        let detalleEmpresaError = '';
        let telefonoError = '';
        let fotoEmpresaError = '';


        if(!marcaData.nombre){
            nombreError = 'Debe ingresar el nombre de la marca';
        }

        if(!marcaData.id_nacionalidad){
            id_nacionalidadError = 'Debe seleccionar la nacionalidad de la marca';
        }

        if(!marcaData.descripcion){
            descripcionError = 'Debe ingresar la descripción de la marca';
        }

        if(!marcaData.fotoMarca){
            fotoMarcaError = 'Debe subir una foto para la marca';
        }

        if(!marcaData.cedulaJuridica){
            cedulaJuridicaError = 'Debe ingresar la cédula júridca de la empresa';
        }else if(marcaData.cedulaJuridica < 1){
            cedulaJuridicaError = 'Números deben ser mayor a 0';
        }

        if(!marcaData.nombreEmpresa){
            nombreEmpresaError = 'Debe ingresar el nombre de la empresa';
        }

        if(!marcaData.detalleEmpresa){
            detalleEmpresaError = 'Debe ingresar el detalle de la empresa';
        }

        if(!marcaData.telefono){
            telefonoError = 'Debe ingresar el teléfono de la empresa';
        }else if(marcaData.telefono < 1){
            telefonoError = 'Números deben ser mayor a 0';
        }

        if(!marcaData.fotoEmpresa){
            fotoEmpresaError = 'Debe subir una foto para la empresa';
        }

        if(nombreError || id_nacionalidadError || descripcionError || fotoMarcaError || cedulaJuridicaError || nombreEmpresaError || detalleEmpresaError || telefonoError || fotoEmpresaError){
            setMarcaData({ ...marcaData, nombreError, id_nacionalidadError, descripcionError, fotoMarcaError, cedulaJuridicaError, nombreEmpresaError, detalleEmpresaError, telefonoError, fotoEmpresaError});
            return false;
        }

        
        return true;

    }

    //populate data on edit
    useEffect(() => { if(selectedConsecutivo){

            setMarcaData({ ...marcaData, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor});
        } 
    }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(marca){setMarcaData(marca)} 
    }, [marca]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateMarca(currentId, marcaData));
                clearForm();
                setshow(false);
            }else{

                dispatch(createMarca(marcaData));
                selectedConsecutivo.valor++;
                dispatch(updateConsecutivo(selectedConsecutivo._id, selectedConsecutivo));
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setMarcaData({nombre: '', bandera: ''});
    }

    console.table(marcaData)
    
    
    return(

        <Modal show={isOpen} onHide={setshow}  className="modal" onExit={onExit}>
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Marca' : 'Crear Marca'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="6 vertical-line">
                            <h6 className="mt-2 mb-4">Información de la Marca </h6>
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={marcaData.codigo} ></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (marcaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={marcaData.nombre} onChange={(e) => setMarcaData({ ...marcaData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nacionalidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_nacionalidad" className={ (marcaData.id_nacionalidadError) ? 'is-invalid' : ''} value={marcaData.id_nacionalidad} onChange={(e) => setMarcaData({ ...marcaData, id_nacionalidad: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {paises.map((pais) => <option key={pais._id} value={pais._id}>{pais.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{marcaData.id_nacionalidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (marcaData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={marcaData.descripcion} onChange={(e) => setMarcaData({ ...marcaData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto de la Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FileBase className={ (marcaData.fotoMarcaError) ? 'is-invalid' : ''} type="file" multiple={false} name="fotoMarca" value={marcaData.fotoMarca} onDone={({base64}) => setMarcaData({ ...marcaData, fotoMarca: base64})}></FileBase>
                                        <small className="form-text text-danger">{marcaData.fotoMarcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={marcaData.fotoMarca}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6">
                            <h6 className="mt-2 mb-4">Información de la Empresa </h6>
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Cédula Jurídcia</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                    <FormControl className={ (marcaData.cedulaJuridicaError) ? 'is-invalid' : ''} type="number" name="cedulaJuridica" value={marcaData.cedulaJuridica} onChange={(e) => setMarcaData({ ...marcaData, cedulaJuridica: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.cedulaJuridicaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (marcaData.nombreEmpresaError) ? 'is-invalid' : ''} type="text" name="nombreEmpresa" value={marcaData.nombreEmpresa} onChange={(e) => setMarcaData({ ...marcaData, nombreEmpresa: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.nombreEmpresaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Detalle</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (marcaData.detalleEmpresaError) ? 'is-invalid' : ''} type="text" name="detalleEmpres" value={marcaData.detalleEmpresa} onChange={(e) => setMarcaData({ ...marcaData, detalleEmpresa: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.detalleEmpresaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Teléfono</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (marcaData.telefonoError) ? 'is-invalid' : ''} type="number" name="telefono" value={marcaData.telefono} onChange={(e) => setMarcaData({ ...marcaData, telefono: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{marcaData.telefonoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto de la Empresa</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FileBase className={ (marcaData.fotoEmpresaError) ? 'is-invalid' : ''} type="file" multiple={false} name="fotoEmpresa" value={marcaData.fotoEmpresa} onDone={({base64}) => setMarcaData({ ...marcaData, fotoEmpresa: base64})}></FileBase>
                                        <small className="form-text text-danger">{marcaData.fotoEmpresaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={marcaData.fotoEmpresa}/>
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

export default MarcaForm;