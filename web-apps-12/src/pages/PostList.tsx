import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api';

const PostList: React.FC = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts</div>;

    return (
        <div className="posts-list">
            <h2>Recent Posts</h2>
            {posts?.length ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p>{post.content.substring(0, 100)}...</p>
                            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
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