import { combineReducers } from 'redux';
import consecutivos from './consecutivos';
import restaurantes from './restaurantes';
import unidadesMedidas from './unidadesMedidas';
import paises from './paises';
import marcas from './marcas';


export default combineReducers({ 
    consecutivos, 
    restaurantes, 
    unidadesMedidas,
    paises,
    marcas
});
