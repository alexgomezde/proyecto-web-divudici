import * as api from  '../api';

//Action Creators = functions that return actions
export const getFacturas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFacturas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_FACTURAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createFactura = (factura) => async (dispatch) => {
    try {
        const { data } = await api.createFactura(factura);
        dispatch({ type: 'CREATE_FACTURA', payload: data});
    } catch (error) {
        console.log(error);
    }
}