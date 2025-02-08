import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPosts, Post } from '../api';

const PostsList: React.FC = () => {
    const { data: posts, error, isLoading } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Loading posts...</p>;
    if (error instanceof Error) return <p className="error">{error.message}</p>;

    return (
        <div className="posts-list">
            <h2>Posts</h2>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`}>Read more</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
