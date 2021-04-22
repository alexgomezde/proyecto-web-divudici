//Recudcers are funcitions that accept a state (array of cajas) and action.

const reducer = (cajas = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_CAJAS':
            return action.payload;
        case 'CREATE_CAJA':
            return [...cajas, action.payload];
        default:
            return cajas;
    }
}

export default reducer; 