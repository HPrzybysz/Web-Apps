export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
};

export const fetchPost = async (id: string): Promise<Post> => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Post not found');
    return response.json();
};

export const fetchUser = async (userId: number): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
};
