import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup,  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateConsecutivo } from '../../actions/consecutivos';
import { createPais, updatePais } from '../../actions/paises';
import FileBase from 'react-file-base64';


const PaisFrom = ({currentId, setCurrenteId, isOpen, setshow, onExit, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const pais = useSelector((state) => currentId ? state.paises.find((r) => r._id === currentId) : null);
    const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "P-") : null);
    const [paisData, setPaisData] = useState({
        id_consecutivo: '',
        codigo: '', 
        nombre: '', 
        bandera: '', 
        nombreError: '', 
        banderaError: ''
    
    });


    const validate = () => {

        let nombreError ='';
        let banderaError = '';


        if(!paisData.nombre){
            nombreError = 'Debe ingresar un nombre para el país';
        }

        if(!paisData.bandera){
            banderaError = 'Debe subir una foto de la bandera del país';
        }

        if(nombreError || banderaError ){
            setPaisData({ ...paisData, nombreError, banderaError });
            return false;
        }

        
        return true;

    }

    //populate data on edit
    useEffect(() => { if(selectedConsecutivo){

            setPaisData({ ...paisData, id_consecutivo : selectedConsecutivo._id, codigo : selectedConsecutivo.prefijo + selectedConsecutivo.valor});
        } 
    }, [selectedConsecutivo]);

    //populate data on edit
    useEffect(() => { if(pais){setPaisData(pais)} 
    }, [pais]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updatePais(currentId, paisData));
                clearForm();
                setshow(false);
            }else{

                dispatch(createPais(paisData));
                selectedConsecutivo.valor++;
                dispatch(updateConsecutivo(selectedConsecutivo._id, selectedConsecutivo));
                clearForm();
                setshow(false);
            }
        }

    }
        

    const clearForm = () => {
        setPaisData({nombre: '', bandera: ''});
    }

    console.table(paisData)
    
    
    return(

        <Modal show={isOpen} onHide={setshow}  className="modal" onExit={onExit}>
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar País' : 'Crear País'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={paisData.codigo} ></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (paisData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={paisData.nombre} onChange={(e) => setPaisData({ ...paisData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{paisData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Bandera del País</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FileBase className={ (paisData.banderaError) ? 'is-invalid' : ''} type="file" multiple={false} name="bandera" value={paisData.bandera} onDone={({base64}) => setPaisData({ ...paisData, bandera: base64})}></FileBase>
                                <small className="form-text text-danger">{paisData.banderaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            
                        </Col>
                        <Col>
                            <FormGroup>
                                <img className="img-fluid pr-5 pl-5" src={paisData.bandera}/>
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

export default PaisFrom;