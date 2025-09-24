// src/services/usuarioService.js
import api from './api';

// Criar usuário (Cadastro.js)
export const createUsuario = async (usuario) => {
    try {
        const response = await api.post('/usuarios', usuario);
        return response.data; // Deve retornar { id: ..., message: ... }
    } catch (error) {
        console.error('Erro em createUsuario:', error.response?.data || error.message);
        throw error;
    }
};

// Atualizar usuário (Cadastro2.js e Cadastro3.js)
export const updateUsuario = async (id, dados) => {
    try {
        const response = await api.put(`/usuarios/${id}`, dados);
        return response.data;
    } catch (error) {
        console.error('Erro em updateUsuario:', error.response?.data || error.message);
        throw error;
    }
};

// Login (Login.js)
export const loginUsuario = async (dados) => {
    try {
        const response = await api.post('/login', dados);
        return response.data;
    } catch (error) {
        console.error('Erro em loginUsuario:', error.response?.data || error.message);
        throw error;
    }
};
