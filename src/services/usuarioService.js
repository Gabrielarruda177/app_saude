import api from './api';

export const createUsuario = async (dados) => {
  const res = await api.post('/users', dados);
  return res.data;
};

export const updateUsuario = async (id, dados) => {
  const res = await api.put(`/users/${id}`, dados);
  return res.data;
};

export const loginUsuario = async (email, senha) => {
  const res = await api.post('/login', { email, senha });
  return res.data;
};
