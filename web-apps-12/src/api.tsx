const API_URL = import.meta.env.VITE_API_URL;

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface Comment {
    id: number;
    postId: number;
    author: string;
    content: string;
    createdAt: string;
}

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

export const fetchComments = async (postId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
};

export const addComment = async (postId: string, comment: { author: string; content: string }): Promise<Comment> => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return response.json();
};