import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/posts';
import { PostForm } from '../components/PostForm';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await api.createPost(data);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Create Post" />
    </div>
  );
};