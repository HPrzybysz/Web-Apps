import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { fetchPost, fetchUser, Post, User } from '../api';

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: post,
        error: postError,
        isLoading: postLoading,
    } = useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!),
        enabled: !!id,
    });

    const {
        data: user,
        error: userError,
        isLoading: userLoading,
    } = useQuery<User>({
        queryKey: ['user', post?.userId],
        queryFn: () => fetchUser(post!.userId),
        enabled: !!post?.userId,
    });

    if (postLoading || userLoading) return <p>Loading...</p>;
    if (postError instanceof Error) return <p className="error">{postError.message}</p>;
    if (userError instanceof Error) return <p className="error">{userError.message}</p>;

    return (
        <div className="post-details">
            <h2>{post?.title}</h2>
            <p>{post?.body}</p>
            <h3>Author: {user?.name}</h3>
            <p>Email: {user?.email}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    );
};

export default PostDetails;
