import * as api from  '../api';

//Action Creators = functions that return actions
export const getCajas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCajas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_CAJAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createCaja = (caja) => async (dispatch) => {
    try {
        const { data } = await api.createCaja(caja);
        dispatch({ type: 'CREATE_CAJA', payload: data});
    } catch (error) {
        console.log(error);
    }
}