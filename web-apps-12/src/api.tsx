const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
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

// Note: jsonplaceholder doesn't actually save new comments, but will return a mock response
export const addComment = async (postId: string, comment: { name: string; body: string; email?: string }): Promise<Comment> => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...comment,
            email: comment.email || 'anonymous@example.com'
        }),
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return response.json();
};