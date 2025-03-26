import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api';
import './PostList.scss';

const PostList: React.FC = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">Error loading posts: {error instanceof Error ? error.message : 'Unknown error'}</div>;

    return (
        <div className="posts-list">
            <h2>Recent Posts</h2>
            {posts?.length ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h3>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="post-excerpt">{post.body.substring(0, 100)}...</p>
                            <p className="post-meta">User ID: {post.userId} | Post ID: {post.id}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default PostList;