//Recudcers are funcitions that accept a state (array of facturas) and action.

const reducer = (facturas = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_FACTURAS':
            return action.payload;
        case 'CREATE_FACTURA':
            return [...facturas, action.payload];
        default:
            return facturas;
    }
}

export default reducer; 