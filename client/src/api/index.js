import axios from 'axios';

const urlConsecutvios = 'http://localhost:5000/consecutivos';
const urlRestaurantes = 'http://localhost:5000/restaurantes';
const urlUnidadesMedidas = 'http://localhost:5000/unidadesMedida';
const urlPaises = 'http://localhost:5000/paises';
const urlMarcas = 'http://localhost:5000/marcas';
const urlBuffets = 'http://localhost:5000/buffets';
const urlEventos = 'http://localhost:5000/eventos';

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

export const fetchPaises = () => axios.get(urlPaises);
export const createPais = (newPais) => axios.post(urlPaises, newPais);
export const updatePais = (id, updatedPais) => axios.patch(`${urlPaises}/${id}`, updatedPais);
export const deletePais = (id) => axios.delete(`${urlPaises}/${id}`);

export const fetchMarcas = () => axios.get(urlMarcas);
export const createMarca = (newMarca) => axios.post(urlMarcas, newMarca);
export const updateMarca= (id, updatedMarca) => axios.patch(`${urlMarcas}/${id}`, updatedMarca);
export const deleteMarca = (id) => axios.delete(`${urlMarcas}/${id}`);

export const fetchBuffets = () => axios.get(urlBuffets);
export const createBuffet = (newBuffet) => axios.post(urlBuffets, newBuffet);
export const updateBuffet = (id, updatedBuffet) => axios.patch(`${urlBuffets}/${id}`, updatedBuffet);
export const deleteBuffet = (id) => axios.delete(`${urlBuffets}/${id}`);

export const fetchEventos = () => axios.get(urlEventos);
export const createEvento = (newEvento) => axios.post(urlEventos, newEvento);
export const updateEvento = (id, updatedEvento) => axios.patch(`${urlEventos}/${id}`, updatedEvento);
export const deleteEvento = (id) => axios.delete(`${urlEventos}/${id}`);