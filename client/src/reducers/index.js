import { combineReducers } from 'redux';
import consecutivos from './consecutivos';
import restaurantes from './restaurantes';
import unidadesMedidas from './unidadesMedidas';


export default combineReducers({ 
    consecutivos, 
    restaurantes, 
    unidadesMedidas 
});
