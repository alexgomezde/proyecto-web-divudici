import axios from 'axios';

const url = 'http://localhost:5000/consecutivos';

export const fetchConsecutivos = () => axios.get(url);
export const createConsecutivo = (newConsecutivo) => axios.post(url, newConsecutivo);
export const updateConsecutivo = (id, updatedConsecutivo) => axios.patch(`${url}/${id}`, updatedConsecutivo);
export const deleteConsecutivo = (id) => axios.delete(`${url}/${id}`);