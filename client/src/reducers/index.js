import { combineReducers } from 'redux';
import consecutivos from './consecutivos';
import restaurantes from './restaurantes';
import unidadesMedidas from './unidadesMedidas';
import paises from './paises';


export default combineReducers({ 
    consecutivos, 
    restaurantes, 
    unidadesMedidas,
    paises 
});
