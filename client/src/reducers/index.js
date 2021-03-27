import { combineReducers } from 'redux';
import consecutivos from './consecutivos';
import restaurantes from './restaurantes';
import unidadesMedidas from './unidadesMedidas';
import paises from './paises';
import marcas from './marcas';
import buffets from './buffets';
import eventos from './eventos';
import bebidas from './bebidas';


export default combineReducers({ 
    consecutivos, 
    restaurantes, 
    unidadesMedidas,
    paises,
    marcas,
    buffets,
    eventos,
    bebidas
});
