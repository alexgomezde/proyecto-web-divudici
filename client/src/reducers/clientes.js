//Recudcers are funcitions that accept a state (array of clientes) and action.

const reducer = (clientes = [], action) => {
    switch (action.type) {
        case 'DELETE_CLIENTE':
            return clientes.filter((cliente) => cliente._id !== action.payload); //keep all the clientes but the action.payload
        case 'UPDATE_CLIENTE':
            return clientes.map((cliente) => cliente._id === action.payload.id ? action.payload : cliente);
        case 'FETCH_ALL_CLIENTES':
            return action.payload;
        case 'CREATE_CLIENTE':
            return [...clientes, action.payload];
        default:
            return clientes;
    }
}

export default reducer; 