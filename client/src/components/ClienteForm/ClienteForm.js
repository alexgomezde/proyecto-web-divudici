import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { createConsecutivo, getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';
import { createProveedor, updateProveedor } from '../../actions/proveedores';
import FileBase from 'react-file-base64';
import { getProveedores } from '../../actions/proveedores';
import Board from '../Board/Board';


const ClienteForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos);
    const consecutivos = useSelector((state) => state.consecutivos);
    const proveedor = useSelector((state) => currentId ? state.proveedores.find((r) => r._id === currentId) : null);
    const [currentProductRestId, setCurrentProductRestId] = useState(null);
    const [currentProductProvId, setCurrentProductProvId] = useState(null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");
    let date = new Date();
    date.setDate(date.getDate()); 
    const actualDate = date.toISOString(); 

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Proveedores', 
        descripcion: 'Proveedor creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });
    
    const [proveedorData, setProveedorData] = useState({
        id_consecutivo: '',
        codigo: '',
        cedula: '',
        fechaIngreso: '',
        nombre: '', 
        primerApellido: '', 
        segundoApellido: '',
        correoElectronico: '',
        direccion: '',
        foto: '',
        telefonoOficina: '',
        telefonoFax: '',
        telefonoCelular: '',
        productos: [],
        nombreContacto: '',
        telefonoContacto: '',
        direccionContacto: '',
        cedulaError: '',
        fechaIngresoError: '',
        nombreError: '', 
        primerApellidoError: '', 
        segundoApellidoError: '',
        correoElectronicoError: '',
        direccionError: '',
        fotoError: '',
        telefonoOficinaError: '',
        telefonoFaxError: '',
        telefonoCelularError: '',
        productosError: '',
        nombreContactoError: '',
        telefonoContactoError: '',
        direccionContactoError: ''
    });

    const agregarProducto=()=>{

        let verifier = true;

        if(!currentProductRestId){
            setProveedorData({ ...proveedorData, productosError: "Debe seleccionar un producto de la lista del restaurante"});
            verifier= false;
        }else if(proveedorData.productos){

            for( let i=0; i < proveedorData.productos.length; i++){

                if(currentProductRestId === proveedorData.productos[i]){
                    setProveedorData({ ...proveedorData, productosError: "El producto ya existe en la lista del proveedor"});
                    verifier= false;
                }
            }
            
        }
        
        if(verifier){
            setProveedorData({ ...proveedorData, productosError: ""});
            proveedorData.productos.push(currentProductRestId);
            setCurrentProductRestId(null);
        }
        
    };

    const eliminarProducto=()=>{

        if(!currentProductProvId){
            setProveedorData({ ...proveedorData, productosError: "Debe seleccionar un producto de la lista del proveedor"});
        }else{

            setProveedorData({ ...proveedorData, productosError: ""});

            for( var i = 0; i < proveedorData.productos.length; i++){ 

                console.log(proveedorData.productos[i])
                console.log(currentProductProvId)
    
                if ( proveedorData.productos[i] === currentProductProvId) { 
            
                    proveedorData.productos.splice(i, 1); 
                }
            
            }
            setCurrentProductProvId(null);

        }
    };

    const validate = () => {

        let cedulaError = '';
        let fechaIngresoError = '';
        let nombreError = '';
        let primerApellidoError = '';
        let segundoApellidoError = '';
        let correoElectronicoError = '';
        let direccionError = '';
        let fotoError = '';
        let telefonoOficinaError = '';
        let telefonoFaxError = '';
        let telefonoCelularError = '';
        let productosError = '';
        let nombreContactoError = '';
        let telefonoContactoError = '';
        let direccionContactoError = '';
        
        if(!proveedorData.cedula){
            cedulaError = 'Debe ingresar la cédula del proveedor';
        }else if(proveedorData.telefono < 1){
            cedulaError = 'Números deben ser mayor a 0';
        }

        if(!proveedorData.fechaIngreso){
            fechaIngresoError = 'Debe seleccionar la fecha de ingreso del proveedor';
        }

        if(!proveedorData.nombre){
            nombreError = 'Debe ingresar el nombre del proveedor';
        }

        if(!proveedorData.primerApellido){
            primerApellidoError = 'Debe ingresar el primer apellido del proveedor';
        }

        if(!proveedorData.segundoApellido){
            segundoApellidoError = 'Debe ingresar el segundo apellido del proveedor';
        }

        if(!proveedorData.correoElectronico){
            correoElectronicoError = 'Debe ingresar el correo electrónico del proveedor';
        }

        if(!proveedorData.direccion){
            direccionError = 'Debe ingresar la dirección del proveedor';
        }

        if(!proveedorData.foto){
            fotoError = 'Debe subir una foto del proveedor';
        }

        if(!proveedorData.telefonoOficina){
            telefonoOficinaError = 'Debe ingresar el teléfono de oficina del proveedor';
        }else if(proveedorData.telefonoOficina < 1){
            telefonoOficinaError = 'Números deben ser mayor a 0';
        }

        if(!proveedorData.telefonoFax){
            telefonoFaxError = 'Debe ingresar el fax del proveedor';
        }else if(proveedorData.telefonoFax < 1){
            telefonoFaxError = 'Números deben ser mayor a 0';
        }

        if(!proveedorData.telefonoCelular){
            telefonoCelularError = 'Debe ingresar el celular del proveedor';
        }else if(proveedorData.telefonoCelular < 1){
            telefonoCelularError = 'Números deben ser mayor a 0';
        }

        if(proveedorData.productos.length < 1){
            productosError = 'Debe seleccionar los productos del proveedor';
        }

        if(!proveedorData.nombreContacto){
            nombreContactoError = 'Debe ingresar el nombre de contacto del proveedor';
        }

        if(!proveedorData.telefonoContacto){
            telefonoContactoError = 'Debe ingresar el teléfono de contacto del proveedor';
        }else if(proveedorData.telefonoContacto < 1){
            telefonoContactoError = 'Números deben ser mayor a 0';
        }

        if(!proveedorData.direccionContacto){
            direccionContactoError = 'Debe ingresar la dirección de contacto del proveedor';
        }

        if(nombreError || cedulaError  || fechaIngresoError || primerApellidoError || segundoApellidoError || correoElectronicoError || direccionError || fotoError || telefonoOficinaError || telefonoFaxError || telefonoCelularError || productosError || nombreContactoError || telefonoContactoError || direccionContactoError){
            setProveedorData({ ...proveedorData, nombreError, cedulaError, fechaIngresoError, primerApellidoError, segundoApellidoError, correoElectronicoError, direccionError, fotoError, telefonoOficinaError, telefonoFaxError, telefonoCelularError, productosError, nombreContactoError, telefonoContactoError, direccionContactoError});
            return false;
        }

        return true;

    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;

        consecutivos.forEach(consecutivo => {

            if(consecutivo.prefijo === "CLI-"){

                if(consecutivo.valor > valorMayor){

                    valorMayor = consecutivo.valor;
                }
                codigoEncontrado = true;
            }
        });

        valorMayor++;

        if(!codigoEncontrado){
            consecutivoData.valor= 1;
            consecutivoData.prefijo = 'CLI-';
            
            codigo = `CLI-1`;
        }else{

            codigo = `CLI-${valorMayor}`;

            consecutivoData.valor= valorMayor++;
            consecutivoData.prefijo = 'CLI-';
        }

        proveedorData.codigo = codigo;

        return codigo;
    }

    const getConsecutivoId = () => {
        consecutivos.forEach(consecutivo => {
            if(consecutivo.prefijo === consecutivoData.prefijo && consecutivo.valor === consecutivoData.valor){
                return consecutivo._id;
            }
        });
    }

    //populate data on edit
    useEffect(() => { if(proveedor){setProveedorData(proveedor)} 
    }, [proveedor]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProveedor(currentId, proveedorData));
                setCurrenteId(null);
                dispatch(getProveedores());
                clearForm();
                setshow(false);
                ;
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setProveedorData({ ...proveedorData, id_consecutivo : tempIdConsecutivo});
                dispatch(createProveedor(proveedorData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        // setCurrenteId(null);
        setProveedorData({
            cedula: '',
            fechaIngreso: '',
            nombre: '', 
            primerApellido: '', 
            segundoApellido: '',
            correoElectronico: '',
            direccion: '',
            foto: '',
            telefonoOficina: '',
            telefonoFax: '',
            telefonoCelular: '',
            productos: [],
            nombreContacto: '',
            telefonoContacto: '',
            direccionContacto: '',
            cedulaError: '',
            fechaIngresoError: '',
            nombreError: '', 
            primerApellidoError: '', 
            segundoApellidoError: '',
            correoElectronicoError: '',
            direccionError: '',
            fotoError: '',
            telefonoOficinaError: '',
            telefonoFaxError: '',
            telefonoCelularError: '',
            productosError: '',
            nombreContactoError: '',
            telefonoContactoError: '',
            direccionContactoError: ''
        });
    }

    console.table(proveedorData)
    
    
    return(

        <Modal size="xl" show={isOpen} onHide={setshow} onExit={clearForm} className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Proveedor' : 'Cliente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="8">
                            <h6 className="mt-2 mb-4">Datos del Cliente</h6>
                            <Row>
                                <Col md="6">   
                                    <Row>
                                        <Col md="3"className="text-right pt-1">
                                            <Form.Label >Código</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl type="text" disabled name="codigo" value={ !currentId ? generarCodigo() : proveedorData.codigo} ></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Nombre</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={proveedorData.nombre} onChange={(e) => setProveedorData({ ...proveedorData, nombre: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.nombreError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Mesa</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Monto</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.segundoApellidoError) ? 'is-invalid' : ''} type="text" name="segundoApellido" value={proveedorData.segundoApellido} onChange={(e) => setProveedorData({ ...proveedorData, segundoApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.segundoApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="4" className="text-right">
                                            <Form.Label>Restaurante</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Hora Entrada</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Hora Salida</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Duración</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                
                                </Col>
                            </Row>
                            
                            <Row>
                                
                                <Col md="12 mt-4">
                                    <h6>Información del Pedido</h6>
                                    <Row>
                                        <Col md="2" className="text-right pt-1">
                                            <Form.Label># Mesa</Form.Label>
                                        </Col>
                                        <Col md="3">
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3" className="text-center pt-1">
                                            <Form.Label className="pt-2"><h6>Precio</h6></Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="2" className="text-right pt-1">
                                            <Form.Label> Silla #1</Form.Label>
                                        </Col>
                                        <Col md="3">
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3">
                                            <FormGroup>
                                                <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={proveedorData.primerApellido} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3">
                                        <FormGroup>
                                            <Form.Check type="checkbox" label="Buffet" name="tienePrefijo" className="pt-2"  onChange={(e) => {setConsecutivoData({ ...consecutivoData, tienePrefijo: e.target.checked});  }}/>
                                        </FormGroup>
                                        
                                    </Col>
                                    </Row>
                                  
                                   
                                </Col>
                            </Row>          
                        </Col>

                        <Col md="4" >
                            <h6 className="mt-2 mb-4">Fecha del Cliente</h6>
                                
                                <Row>
                                    <Col md="3">
                
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Form.Check type="checkbox" label="Reservación" name="tienePrefijo"  onChange={(e) => {setConsecutivoData({ ...consecutivoData, tienePrefijo: e.target.checked});  }}/>
                                        </FormGroup>
                                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="3"className="text-right pt-1">
                                        <Form.Label >Llegada</Form.Label>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <FormControl className={ (proveedorData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={actualDate} onChange={(e) => setProveedorData({ ...proveedorData, primerApellido: e.target.value})} disabled></FormControl>
                                            <small className="form-text text-danger">{proveedorData.primerApellidoError}</small>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col md="3" className="text-right pt-1">
                                        <Form.Label>Reservación</Form.Label>
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                            <FormControl className={ (proveedorData.fechaIngresoError) ? 'is-invalid' : ''} type="date" name="fechaIngreso" value={proveedorData.fechaIngreso} onChange={(e) => setProveedorData({ ...proveedorData, fechaIngreso: e.target.value.toString("yyyy-MM-dd")})}></FormControl>
                                            <small className="form-text text-danger">{proveedorData.fechaIngresoError}</small>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                

                            <h6 className="mt-3 mb-4">Facturación</h6>
                            <Row>
                                <Col md="3"className="text-right">
                                    <Form.Label >Estado Cuenta</Form.Label>
                                </Col>
                                <Col >
                                    <FormGroup>
                                    <FormControl className={ (proveedorData.nombreContactoError) ? 'is-invalid' : ''} type="text" name="nombreContacto" value={proveedorData.nombreContacto} onChange={(e) => setProveedorData({ ...proveedorData, nombreContacto: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{proveedorData.nombreContactoError}</small>
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

export default ClienteForm;