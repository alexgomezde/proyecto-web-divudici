import React from 'react';
import { useSelector } from 'react-redux';
import {  Table } from 'react-bootstrap';

const ClienteData = ({ inputSearchTerm, selectedTypeSearch}) => {

    const clientes = useSelector((state) => state.clientes);
    const restaurantes = useSelector((state) => state.restaurantes);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Monto Pagado</th>
                    <th>Fecha </th>
                    <th>Reservación </th>
                    <th>Restaurante</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {clientes.filter( cliente => {

                    if(!inputSearchTerm){
                        return cliente;

                    }else if( selectedTypeSearch === "codigo"){

                        if(cliente.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return cliente;
                        }
                        
                    }else if( selectedTypeSearch === "nombre"){
                        
                        if(cliente.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return cliente;
                        }
                    }
                    
                }).map( cliente => {
        
                    return(
                        <tr key={cliente._id}>
                            <td key={cliente.codigo}>{cliente.codigo}</td>
                            <td key={cliente.nombre}>{cliente.nombre}</td>
                            <td key={cliente.montoPagado}>{cliente.montoPagado}</td>
                            <td key={cliente.fechaLlegada}>{cliente.fechaLlegada}</td>
                            <td key={cliente.reservacion}>{(cliente.reservacion) ? "Sí" : "No"}</td>
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === cliente.id_restaurante){

                                    return(
                                        <td key={cliente.id_restaurante}>{restaurante.nombre}</td>
                                    )
                                }
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default ClienteData; 