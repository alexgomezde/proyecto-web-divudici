import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { createConsecutivo, getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';
import { createProveedor, updateProveedor } from '../../actions/proveedores';
import { getProveedores } from '../../actions/proveedores';
import Board from '../Board/Board';


const ClienteForm = ({currentId, setCurrenteId, isOpen, setshow, currentMesaId, setCurrenteMesaId, currentRestauranteId}) => {

    const dispatch = useDispatch();
    const mesas = useSelector((state) => state.mesas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const especialidades = useSelector((state) => state.especialidades);

    const mesa = useSelector((state) => currentMesaId ? state.mesas.find((m) => m._id === currentMesaId) : null);
    const restaurante = useSelector((state) => currentRestauranteId ? state.restaurantes.find((r) => r._id === currentRestauranteId) : null);

    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");
    // let date = new Date();
    // date.setDate(date.getDate()); 
    // const actualDate = date.toISOString(); 

    const [silla, setSilla] = useState({
        id_especialidad: '',
        precio: '',
        buffet: ''
    })

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Clientes', 
        descripcion: 'Cliente creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    
    const [clienteData, setClienteData] = useState({
        codigo: '',
        nombre: '',
        id_mesa: '',
        id_restaurante: '',
        nombreRestaurante: '',
        nombreMesa: '',
        numeroMesa: '',
        montoPagado: '', 
        horaEntrada: '', 
        horaSalida: '',
        duracionMesa: '',   
        reservacion: '',
        fechaLlegada: '',
        fechaReservacion: '',
        pedidos: [],
        estadoCuenta: '',
        nombreError: '',
        cantidadSillas: ''
        
    });

    const validate = () => {

        let nombreError = '';

        if(!clienteData.nombre){
            nombreError = 'Debe ingresar el nombre del cliente';
        }

        if(nombreError ){
            setClienteData({ ...clienteData, nombreError});
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

        clienteData.codigo = codigo;

        return codigo;
    }



    useEffect(() => { if(mesa){
        setClienteData({...clienteData, 
            id_mesa: mesa._id, 
            nombreMesa: mesa.nombre, 
            numeroMesa: mesa.numero,
            cantidadSillas: mesa.cantidadSillas,
            id_restaurante: restaurante._id,
            nombreRestaurante: restaurante.nombre
        })
        } 
    }, [mesa, restaurante]);

    let sillas = [];

    for(let i=0; i < clienteData.cantidadSillas; i++){

        sillas.push(i+1);
    }

    console.log(sillas)

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProveedor(currentId, clienteData));
                setCurrenteId(null);
                dispatch(getProveedores());
                clearForm();
                setshow(false);
                ;
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setClienteData({ ...clienteData, id_consecutivo : tempIdConsecutivo});
                dispatch(createProveedor(clienteData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        // setCurrenteMesaId(null);
        setClienteData({ ...clienteData, nombre: '', nombreError: ''
        });
    }
    
    // console.table(clienteData)
    
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
                                                <FormControl type="text" disabled name="codigo" value={ !currentId ? generarCodigo() : clienteData.codigo} ></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Nombre</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={clienteData.nombre} onChange={(e) => setClienteData({ ...clienteData, nombre: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.nombreError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Mesa</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl type="text" name="nombreMesa" value={clienteData.nombreMesa} disabled></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Monto</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.segundoApellidoError) ? 'is-invalid' : ''} type="text" name="segundoApellido" value={clienteData.segundoApellido} onChange={(e) => setClienteData({ ...clienteData, segundoApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.segundoApellidoError}</small>
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
                                                <FormControl type="text" name="nombreRestaurante" value={clienteData.nombreRestaurante} disabled></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Hora Entrada</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={clienteData.primerApellido} onChange={(e) => setClienteData({ ...clienteData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Hora Salida</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={clienteData.primerApellido} onChange={(e) => setClienteData({ ...clienteData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.primerApellidoError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Duración</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={clienteData.primerApellido} onChange={(e) => setClienteData({ ...clienteData, primerApellido: e.target.value})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.primerApellidoError}</small>
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
                                                <FormControl type="text" name="numeroMesa" value={clienteData.numeroMesa} onChange={(e) => setClienteData({ ...clienteData, numeroMesa: e.target.value})} disabled></FormControl>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3" className="text-center pt-1">
                                            <Form.Label className="pt-2"><h6>Precio</h6></Form.Label>
                                        </Col>
                                    </Row>

                                    {
                                        sillas.map( silla => {


                                            return(
                                                <Row>
                                                    <Col md="2" className="text-right pt-1">
                                                        <Form.Label> Silla #{silla}</Form.Label>
                                                    </Col>
                                                    <Col md="3">
                                                        <Form.Control as="select" name="id_especialidad"  value={clienteData.id_restaurante} onChange={(e) => setClienteData({ ...clienteData, id_restaurante: e.target.value})} >
                                                            <option value="">--Seleccione--</option>
                                                            {especialidades.map((especialidad) => <option key={especialidad._id} value={especialidad._id}>{especialidad.nombre}</option>)}               
                                                        </Form.Control>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <FormControl className={ (clienteData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={clienteData.primerApellido} onChange={(e) => setClienteData({ ...clienteData, primerApellido: e.target.value})} disabled></FormControl>
                                                            <small className="form-text text-danger">{clienteData.primerApellidoError}</small>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <Form.Check type="checkbox" label="Buffet" name="tienePrefijo" className="pt-2"  onChange={(e) => {setConsecutivoData({ ...consecutivoData, tienePrefijo: e.target.checked});  }}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                    
                                    
                                    
                                  
                                   
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
                                            <FormControl className={ (clienteData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido"  onChange={(e) => setClienteData({ ...clienteData, primerApellido: e.target.value})} disabled></FormControl>
                                            <small className="form-text text-danger">{clienteData.primerApellidoError}</small>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col md="3" className="text-right pt-1">
                                        <Form.Label>Reservación</Form.Label>
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                            <FormControl className={ (clienteData.fechaIngresoError) ? 'is-invalid' : ''} type="date" name="fechaIngreso" value={clienteData.fechaIngreso} onChange={(e) => setClienteData({ ...clienteData, fechaIngreso: e.target.value.toString("yyyy-MM-dd")})}></FormControl>
                                            <small className="form-text text-danger">{clienteData.fechaIngresoError}</small>
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
                                    <FormControl className={ (clienteData.nombreContactoError) ? 'is-invalid' : ''} type="text" name="nombreContacto" value={clienteData.nombreContacto} onChange={(e) => setClienteData({ ...clienteData, nombreContacto: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.nombreContactoError}</small>
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