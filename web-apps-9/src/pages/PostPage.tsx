import React from 'react';
import { useParams } from 'react-router-dom';
import './PostPage.scss';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="post-page">
            <h2>Post Details</h2>
            <p>Currently viewing post ID: {id}</p>
        </div>
    );
};

export default PostPage;
