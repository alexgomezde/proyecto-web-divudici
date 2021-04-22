import React from 'react';
import { useSelector } from 'react-redux';
import {  Table } from 'react-bootstrap';

const FacturaData = ({ inputSearchTerm, selectedTypeSearch}) => {

    const facturas = useSelector((state) => state.facturas);
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
                {facturas.filter( factura => {

                    if(!inputSearchTerm){
                        return factura;

                    }else if( selectedTypeSearch === "codigo"){

                        if(factura.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return factura;
                        }
                        
                    }else if( selectedTypeSearch === "descripcion"){
                        
                        if(factura.descripcion.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return factura;
                        }
                    }
                    
                }).map( factura => {
        
                    return(
                        <tr key={factura._id}>
                            <td key={factura.codigo}>{factura.codigo}</td>
                            <td key={factura.fecha}>{factura.fecha}</td>
                            <td key={factura.descripcion}>{factura.descripcion}</td>
                            <td key={factura.EntradaDinero}>{factura.EntradaDinero}</td>
                            <td key={factura.AperturaCaja}>{factura.AperturaCaja}</td>
                            <td key={factura.EntradaDinero}>{factura.EntradaDinero}</td>
                            <td key={factura.CierreCaja}>{factura.CierreCaja}</td>
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === factura.id_restaurante){

                                    return(
                                        <td key={factura.id_restaurante}>{restaurante.nombre}</td>
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

export default FacturaData; 