import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { fetchPost, fetchComments, addComment } from '../api';
import './PostDetails.scss';

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState({
        author: '',
        content: ''
    });

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!),
    });

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(id!),
    });

    const { mutate: addNewComment, isPending: isAddingComment, isError: isCommentError, error: commentError } = useMutation({
        mutationFn: () => addComment(id!, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', id] });
            setNewComment({ author: '', content: '' });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.author.trim() && newComment.content.trim()) {
            addNewComment();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewComment(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div className="loading">Loading post...</div>;
    if (error) return <div className="error">Error loading post: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    if (!post) return <div className="error">Post not found</div>;

    return (
        <div className="post-details">
            <article className="post-content">
                <h1>{post.title}</h1>
                <p className="post-meta">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="post-body">{post.content}</p>
            </article>

            <section className="comments-section">
                <h2>Comments ({comments?.length || 0})</h2>

                {commentsLoading ? (
                    <p>Loading comments...</p>
                ) : (
                    <ul className="comments-list">
                        {comments?.map(comment => (
                            <li key={comment.id} className="comment">
                                <p className="comment-author">{comment.author}</p>
                                <p className="comment-date">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                                <p className="comment-text">{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="add-comment">
                    <h3>Add a comment</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="author">Your name:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={newComment.author}
                                onChange={handleInputChange}
                                required
                                minLength={2}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Your comment:</label>
                            <textarea
                                id="content"
                                name="content"
                                value={newComment.content}
                                onChange={handleInputChange}
                                required
                                minLength={10}
                                rows={4}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isAddingComment}
                            className="submit-button"
                        >
                            {isAddingComment ? 'Posting...' : 'Post Comment'}
                        </button>
                        {isCommentError && (
                            <p className="error-message">
                                Error: {commentError instanceof Error ? commentError.message : 'Failed to post comment'}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default PostDetails;