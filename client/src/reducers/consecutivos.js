//Recudcers are funcitions that accept a state (array of consevutivos) and action.

const reducer = (consecutivos = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return consecutivos.filter((consecutivo) => consecutivo._id !== action.payload); //keep all the consecutivos but the action.payload
        case 'UPDATE':
            return consecutivos.map((consecutivo) => consecutivo._id === action.payload.id ? action.payload : consecutivo);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...consecutivos, action.payload];
    
        default:
            return consecutivos;
    }
}

export default reducer; 