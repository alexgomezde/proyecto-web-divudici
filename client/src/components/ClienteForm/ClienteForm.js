import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave, faPrint } from '@fortawesome/free-solid-svg-icons';
import { createConsecutivo, getConsecutivos } from '../../actions/consecutivos';
import { createCliente, updateCliente } from '../../actions/clientes';
import { getMesas, updateMesa } from '../../actions/mesas';
import { createFactura } from '../../actions/facturas';
import moment from 'moment';



const ClienteForm = ({currentId, setCurrenteId, isOpen, setshow, currentMesaId, setCurrenteMesaId, currentRestauranteId , currentClienteId, setClienteCurrenteId}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const mesas = useSelector((state) => state.mesas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const especialidades = useSelector((state) => state.especialidades);

    const mesa = useSelector((state) => currentMesaId ? state.mesas.find((m) => m._id === currentMesaId) : null);
    const restaurante = useSelector((state) => currentRestauranteId ? state.restaurantes.find((r) => r._id === currentRestauranteId) : null);
    const cliente = useSelector((state) => currentClienteId ? state.clientes.find((c) => c.codigo === currentClienteId) : null);

    const reload=()=>{window.location.reload()};

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Clientes', 
        descripcion: 'Cliente creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [consecutivoFacturaData, setConsecutivoFacturaData] = useState({
        tipo: 'Facturas', 
        descripcion: 'Factura creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [mesaData, setMesaData] = useState({
        codigo: '',
        nombre: '', 
        numero: '',
        cantidadSillas: '',
        id_restaurante: '', 
        estado: '',
        codigoCliente: ''
    });

    
    const [clienteData, setClienteData] = useState({
        codigo: '',
        nombre: '',
        id_mesa: '',
        id_restaurante: '',
        nombreRestaurante: '',
        nombreMesa: '',
        numeroMesa: '',
        montoPagado: 0, 
        horaEntrada: moment().format('LTS'), 
        horaSalida: '',
        duracionMesa: '',   
        reservacion: false,
        fechaLlegada: moment().format('L'),
        fechaReservacion: '',
        pedidos: [],
        estadoCuenta: false,
        nombreError: '',
        cantidadSillas: ''
        
    });

    const [facturaData, setFacturaData] = useState({
        codigo: '',
        fecha: moment().format('L'),
        descripcion: `Factura pagada por ${clienteData.codigo} y registrada por ${user.result.codigo}`,
        entradaDinero: '',
        aperturaCaja: 75000,
        cierreCaja: 0,
        id_restaurante: currentRestauranteId
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


    const generarCodigoFactura = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'FAC-';

        consecutivos.forEach(consecutivo => {

            if(consecutivo.prefijo === prefix){

                if(consecutivo.valor > valorMayor){

                    valorMayor = consecutivo.valor;
                }
                codigoEncontrado = true;
            }
        });

        valorMayor++;

        if(!codigoEncontrado){
            consecutivoFacturaData.valor= 1;
            consecutivoFacturaData.prefijo = prefix;
            
            codigo = prefix;
        }else{

            codigo = prefix + valorMayor;

            consecutivoFacturaData.valor= valorMayor++;
            consecutivoFacturaData.prefijo = prefix;
        }

        facturaData.codigo = codigo;

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

        setMesaData(mesa);
        } 
    }, [mesa, restaurante]);


    if(clienteData.pedidos.length === 0){

        for(let i=0; i < clienteData.cantidadSillas; i++){

            let silla = {
                id: i+1,
                id_especialidad: -1,
                precio: 0, 
                buffet: false,
                productosBuffet: []
            };
    
            clienteData.pedidos.push(silla);
        }
    }

    const updatePedidoSilla = (sillaId, especialidadId) => {

        const sillasIndex = clienteData.pedidos.findIndex(element => element.id === sillaId );

        if(especialidadId != -1){
            
            const especialidad = especialidades.find(element => element._id === especialidadId );

            let newArray = [...clienteData.pedidos];

            newArray[sillasIndex] = {...newArray[sillasIndex], id_especialidad: especialidad._id, precio: especialidad.precio};

            clienteData.pedidos = newArray;

        }else{

            let newArray = [...clienteData.pedidos];

            newArray[sillasIndex] = {...newArray[sillasIndex], id_especialidad: -1, precio: 0};

            clienteData.pedidos = newArray;
        }


        let montoAPagar = 0;

        clienteData.pedidos.forEach(element => {
            
            montoAPagar += element.precio;
        });

        setClienteData({ ...clienteData, montoPagado : montoAPagar});
        
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(cliente) {

                console.log("ELIMINAR CLIENTE")

                if(clienteData.estadoCuenta){
                    mesaData.estado = "disponible";
                    mesaData.codigoCliente = null;
                    dispatch(updateMesa(mesaData._id, mesaData ));
                }
                console.log(clienteData);
                dispatch(updateCliente(clienteData._id, clienteData));
                setClienteCurrenteId(null);
                dispatch(getMesas());
                clearForm();
                setshow(false);

                reload();
            }else{


                console.log("INGRESAR CLIENTE")
                dispatch(createConsecutivo(consecutivoData));
                mesaData.estado = "ocupada";
                mesaData.codigoCliente = clienteData.codigo ;
                dispatch(updateMesa(mesaData._id, mesaData ));
                dispatch(getMesas());
                console.log(clienteData)
                dispatch(createCliente(clienteData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteMesaId(null);
        setClienteCurrenteId(null);
        clienteData.pedidos.length=0;
        // setMesaData({ ...mesaData, estado: "disponible"});
        setClienteData({ ...clienteData,
            nombre: '',
            nombreError: '',
            cantidadSillas: 0, 
            montoPagado: 0,
            horaSalida: '',
            horaEntrada: moment().format('LTS'),
            duracionMesa: '',
            estadoCuenta: false
        });
    }
    
    useEffect(() => { if(cliente){setClienteData(cliente)} 
    }, [cliente]);

    

    const facturar = () => {

        generarCodigoFactura();
        facturaData.entradaDinero = clienteData.montoPagado;
        dispatch(createConsecutivo(consecutivoFacturaData));
        dispatch(createFactura(facturaData));
        clienteData.estadoCuenta = true;
        clienteData.horaSalida = moment().format('LTS');
        diffDuration();
        dispatch(updateCliente(clienteData._id, clienteData))
    }

    const diffDuration = () => {

        // start time and end time
        var startTime = moment(clienteData.horaEntrada, "HH:mm:ss a");
        var endTime = moment(clienteData.horaSalida, "HH:mm:ss a");

        // calculate total duration
        var duration = moment.duration(endTime.diff(startTime));

        // duration in hours
        var hours = parseInt(duration.asHours());

        // duration in minutes
        var minutes = parseInt(duration.asMinutes())%60;

        var output = `${hours} horas y ${minutes} minutos`;

        clienteData.duracionMesa = output;
    }


    console.log(cliente)
    
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
                                                <FormControl type="text" disabled name="codigo" value={ !currentClienteId ? generarCodigo() : clienteData.codigo} ></FormControl>
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
                                                <FormControl type="number" name="segundoApellido" value={clienteData.montoPagado} disabled></FormControl>
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
                                                <FormControl type="text" name="horaEntrada" value={clienteData.horaEntrada} disabled></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Hora Salida</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl type="text" name="horaSalida" value={clienteData.horaSalida} disabled></FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="4" className="text-right pt-1">
                                            <Form.Label>Duración</Form.Label>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <FormControl type="text" name="duracion" value={clienteData.duracionMesa} disabled></FormControl>
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
                                        clienteData.pedidos.map( silla => {


                                            return(
                                                <Row>
                                                    <Col md="2" className="text-right pt-1">
                                                        <Form.Label> Silla #{silla.id}</Form.Label>
                                                    </Col>
                                                    <Col md="3">
                                                        <Form.Control as="select" name="id_especialidad"  value={silla.id_especialidad} onChange={ (e) => {updatePedidoSilla( silla.id, e.target.value,);  } } >
                                                            <option value="-1">--Seleccione--</option>
                                                            {especialidades.map((especialidad) => <option key={especialidad._id} value={especialidad._id}>{especialidad.nombre}</option>)}               
                                                        </Form.Control>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <FormControl  type="text" name="primerApellido" value={silla.precio} disabled></FormControl>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <Form.Check type="checkbox" label="Buffet" name="buffet" className="pt-2" checked={ silla.buffet } onChange={(e) => setClienteData({ ...clienteData, buffet: e.target.value})}/>
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
                                            <Form.Check type="checkbox" label="Reservación" name="reservacion" value={clienteData.reservacion} onChange={(e) => {setClienteData({ ...clienteData, reservacion: e.target.checked});  }}/>
                                        </FormGroup>
                                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="3"className="text-right pt-1">
                                        <Form.Label >Llegada</Form.Label>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <FormControl type="text" name="fechaLlegada"  value={clienteData.fechaLlegada} disabled></FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {clienteData.reservacion && 

                                    <Row>
                                        <Col md="3" className="text-right pt-1">
                                            <Form.Label>Reservación</Form.Label>
                                        </Col>

                                        <Col>
                                            <FormGroup>
                                                <FormControl className={ (clienteData.fechaReservacionError) ? 'is-invalid' : ''} type="date" name="fechaReservacion" value={clienteData.fechaReservacion} onChange={(e) => setClienteData({ ...clienteData, fechaReservacion: e.target.value.toString("yyyy-MM-dd")})}></FormControl>
                                                <small className="form-text text-danger">{clienteData.fechaReservacionError}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                }
                                

                            <h6 className="mt-3 mb-4">Facturación</h6>
                            <Row>
                                <Col md="3"className="text-right">
                                    <Form.Label >Estado Cuenta</Form.Label>
                                </Col>
                                <Col >
                                    <FormGroup>
                                    <FormControl className={ (clienteData.nombreContactoError) ? 'is-invalid' : ''} type="text" name="nombreContacto" value={clienteData.estadoCuenta ? 'PAGADO': 'SIN PAGAR'} disabled></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>

                            { currentClienteId &&

                            <Row>
                                <Col md="3"className="text-right">
                                </Col>
                                <Col >
                                    <Button className="mr-2 btn-restaurant" variant="outline-light" onClick={() => facturar()}>
                                        <FontAwesomeIcon icon={faPrint} size="2x"></FontAwesomeIcon>
                                    </Button>
                                </Col>
                            </Row>
                            
                            }

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