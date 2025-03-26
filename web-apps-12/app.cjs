require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let posts = [
    {
        id: '1',
        title: 'First Post',
        content: 'This is the content of the first post.',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'This is the content of the second post.',
        createdAt: new Date().toISOString()
    }
];

let comments = [
    {
        id: '1',
        postId: '1',
        author: 'John Doe',
        content: 'Great post!',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        postId: '1',
        author: 'Jane Smith',
        content: 'I learned a lot from this.',
        createdAt: new Date().toISOString()
    }
];

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

app.get('/api/posts/:id/comments', (req, res) => {
    const postComments = comments.filter(c => c.postId === req.params.id);
    res.json(postComments);
});

app.post('/api/posts/:id/comments', (req, res) => {
    const { author, content } = req.body;

    if (!author || !content) {
        return res.status(400).json({ error: 'Author and content are required' });
    }

    const newComment = {
        id: uuidv4(),
        postId: req.params.id,
        author,
        content,
        createdAt: new Date().toISOString()
    };

    comments.push(newComment);
    res.status(201).json(newComment);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});