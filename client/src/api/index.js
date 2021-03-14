import axios from 'axios';

const urlConsecutvios = 'http://localhost:5000/consecutivos';
const urlRestaurantes = 'http://localhost:5000/restaurantes';
const urlUnidadesMedidas = 'http://localhost:5000/unidadesMedida';

export const fetchConsecutivos = () => axios.get(urlConsecutvios);
export const createConsecutivo = (newConsecutivo) => axios.post(urlConsecutvios, newConsecutivo);
export const updateConsecutivo = (id, updatedConsecutivo) => axios.patch(`${urlConsecutvios}/${id}`, updatedConsecutivo);
export const deleteConsecutivo = (id) => axios.delete(`${urlConsecutvios}/${id}`);

export const fetchRestaurantes = () => axios.get(urlRestaurantes);
export const createRestaurante = (newRestaurante) => axios.post(urlRestaurantes, newRestaurante);
export const updateRestaurante = (id, updatedRestaurante) => axios.patch(`${urlRestaurantes}/${id}`, updatedRestaurante);
export const deleteRestaurante = (id) => axios.delete(`${urlRestaurantes}/${id}`);

export const fetchUnidadesMedidas = () => axios.get(urlUnidadesMedidas);
export const createUnidadMedida = (newUnidadMedida) => axios.post(urlUnidadesMedidas, newUnidadMedida);
export const updateUnidadMedida = (id, updatedUnidadMedida) => axios.patch(`${urlUnidadesMedidas}/${id}`, updatedUnidadMedida);
export const deleteUnidadMedida = (id) => axios.delete(`${urlUnidadesMedidas}/${id}`);