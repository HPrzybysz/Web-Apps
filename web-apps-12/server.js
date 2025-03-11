import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
});
const CommentSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,
    text: String,
});
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ postId: req.params.id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post, comments });
});

app.post('/posts/:id/comments', async (req, res) => {
    console.log("New comment request:", req.body);
    const comment = new Comment({
        postId: req.params.id,
        text: req.body.text,
    });
    await comment.save();
    res.status(201).json(comment);
});


app.listen(5000, () => console.log('Server running on port 5000'));
