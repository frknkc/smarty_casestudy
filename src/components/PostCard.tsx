import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/posts/${post._id}`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">
            {post.content.substring(0, 150)}
            {post.content.length > 150 ? '...' : ''}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-4">
              {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {format(new Date(post.updatedAt), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};