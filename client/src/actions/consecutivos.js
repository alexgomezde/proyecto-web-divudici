import * as api from  '../api';

//Action Creators = functions that return actions
export const getConsecutivos = () => async (dispatch) => {
    try {
        const { data } = await api.fetchConsecutivos(); //data comes from the response 

        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createConsecutivo = (consecutivo) => async (dispatch) => {
    try {
        const { data } = await api.createConsecutivo(consecutivo);

        dispatch({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateConsecutivo = (id, consecutivo) => async(dispatch) => {
    try {
        const { data } = await api.updateConsecutivo(id, consecutivo);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteConsecutivo = (id) => async (dispatch) => {
    try {
        await api.deleteConsecutivo(id);

        dispatchEvent({ type: 'DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }
}