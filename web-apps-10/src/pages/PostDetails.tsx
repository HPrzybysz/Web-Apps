import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                return response.json();
            })
            .then((data: Post) => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then((userData: User) => setUser(userData))
            .catch((error) => setError(error.message));
    }, [id]);

    if (error) {
        return (
            <div className="post-details">
                <p className="error">{error}</p>
                <Link to="/">Back to Posts</Link>
            </div>
        );
    }

    if (!post || !user) return <p>Loading...</p>;

    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Author: {user.name}</h3>
            <p>Email: {user.email}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    );
};

export default PostDetails;
