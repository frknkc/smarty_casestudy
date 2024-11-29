import axios from 'axios';
import { AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:3000/api';

export const authApi = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },
};