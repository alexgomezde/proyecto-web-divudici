import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBuffet } from '../../actions/buffets';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const BuffetData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const buffets = useSelector((state) => state.buffets);
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Tipo</th>
                    <th>Unidad de Medida</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {buffets.filter( buffet => {

                    if(!inputSearchTerm){
                        return buffet;

                    }else if( selectedTypeSearch === "codigo"){

                        if(buffet.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return buffet;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(buffet.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return buffet;
                        }
                    }
                }).map( buffet => {
        
                    return(
                        <tr key={buffet._id}>
                            <td key={buffet.codigo}>{buffet.codigo}</td>
                            <td key={buffet.nombre}>{buffet.nombre}</td>
                            <td key={buffet.precio}>{buffet.precio}</td>
                            <td key={buffet.tipo}>{buffet.tipo}</td>

                            {unidadesMedidas.map( unidad => {
                                if(unidad._id === buffet.id_unidadMedida){

                                    return(
                                        <td key={buffet.id_unidadMedida}>{unidad.unidad}</td>
                                    )
                                }
                            })}
                            
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(buffet._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteBuffet(buffet._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default BuffetData; 