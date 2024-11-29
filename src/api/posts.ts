import axios from 'axios';
import { Post } from '../types/post';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Pick<Post, 'title' | 'content'>): Promise<Post> => {
    const response = await axios.post(`${API_URL}/posts`, post, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updatePost: async (id: string, post: Partial<Pick<Post, 'title' | 'content'>>): Promise<Post> => {
    const response = await axios.put(`${API_URL}/posts/${id}`, post, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/posts/${id}`, {
      headers: getAuthHeader(),
    });
  },
};