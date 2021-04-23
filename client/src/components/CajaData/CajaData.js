import React from 'react';
import { useSelector } from 'react-redux';
import {  Table } from 'react-bootstrap';

const CajaData = ({ inputSearchTerm, selectedTypeSearch}) => {

    const cajas = useSelector((state) => state.cajas);
    const restaurantes = useSelector((state) => state.restaurantes);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Fecha</th>
                    <th>Descripción</th>    
                    <th>Entrada Dinero</th>
                    <th>Apertura Caja</th>
                    <th>Cierre Caja</th>
                    <th>Restaurante</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {cajas.filter( caja => {

                    if(!inputSearchTerm){
                        return caja;

                    }else if( selectedTypeSearch === "codigo"){

                        if(caja.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return caja;
                        }
                        
                    }else if( selectedTypeSearch === "descripcion"){
                        
                        if(caja.descripcion.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return caja;
                        }
                    }
                    
                }).map( caja => {
        
                    return(
                        <tr key={caja._id}>
                            <td key={caja._id}>{caja._id}</td>
                            <td key={caja.fecha}>{caja.fecha}</td>
                            <td key={caja.descripcion}>{caja.descripcion}</td>
                            <td key={caja.entradaDinero}>{caja.entradaDinero}</td>
                            <td key={caja.aperturaCaja}>{caja.aperturaCaja}</td>
                            <td key={caja.cierreCaja}>{caja.cierreCaja}</td>
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === caja.id_restaurante){

                                    return(
                                        <td key={caja.id_restaurante}>{restaurante.nombre}</td>
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

export default CajaData; 