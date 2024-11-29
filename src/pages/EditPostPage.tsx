import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/posts';
import { Post } from '../types/post';
import { PostForm } from '../components/PostForm';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';

export const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const data = await api.getPost(id);
        setPost(data);
        
        // Redirect if not the author
        if (user?.id !== data.author._id) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate, user]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    setFormData(data);
    setShowUpdateModal(true);
  };

  const confirmUpdate = async () => {
    if (!id || !formData) return;
    try {
      await api.updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        submitLabel="Update Post"
      />

      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onConfirm={confirmUpdate}
        title="Update Post"
        message="Are you sure you want to update this post?"
        confirmLabel="Update"
        cancelLabel="Cancel"
      />
    </div>
  );
};