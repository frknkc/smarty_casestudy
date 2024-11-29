import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Pencil, Trash2, ArrowLeft, User } from 'lucide-react';
import { api } from '../api/posts';
import { Post } from '../types/post';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const data = await api.getPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await api.deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const isAuthor = user && post?.author._id === user.id;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Posts
      </button>
      <article className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          {isAuthor && (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/posts/${post._id}/edit`)}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit post"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:text-red-800"
                title="Delete post"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <div className="flex items-center mr-4">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author.username}</span>
          </div>
          <span>Created: {format(new Date(post.createdAt), 'PPP')}</span>
          <span className="mx-2">•</span>
          <span>Updated: {format(new Date(post.updatedAt), 'PPP')}</span>
        </div>
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};