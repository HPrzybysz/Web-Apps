import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostList: React.FC = () =>{
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then((data: Post[]) => setPosts(data))
            .catch((error: Error) => {console.error("Error fetching posts...", error)});
    }, []);

    return (
        <div className="posts-list">
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`}>Read more</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostList;