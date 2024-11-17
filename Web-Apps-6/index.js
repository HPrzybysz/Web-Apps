const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const postRouter = express.Router();
const categoryRouter = express.Router();
const commentRouter = express.Router();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// CRUD Routers for posts

postRouter.get('/', async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true, comments: true },
        });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

postRouter.post('/', async (req, res, next) => {
    try {
        const { title, content, categoryId } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                content,
                category: { connect: { id: categoryId } },
            },
        });
        res.json(post);
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 400;
            error.message = 'Category not found.';
        }
        next(error);
    }
});

postRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, categoryId } = req.body;
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                category: { connect: { id: categoryId } },
            },
        });
        res.json(updatedPost);
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Post not found.';
        }
        next(error);
    }
});

postRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Post not found.';
        }
        next(error);
    }
});

// CRUD Routers for category

categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            include: { posts: true },
        });
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

categoryRouter.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: { name },
        });
        res.json(category);
    } catch (error) {
        next(error);
    }
});

categoryRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(updatedCategory);
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Category not found.';
        }
        next(error);
    }
});

categoryRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Category not found.';
        }
        next(error);
    }
});

// CRUD Routers for comments

commentRouter.get('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(postId) },
        });
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

commentRouter.post('/', async (req, res, next) => {
    try {
        const { content, postId } = req.body;

        // Ensure the post exists
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            throw { status: 404, message: 'Post not found.' };
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                post: { connect: { id: postId } },
            },
        });
        res.json(comment);
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Post not found.';
        }
        next(error);
    }
});

commentRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { content },
        });
        res.json(updatedComment);
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Comment not found.';
        }
        next(error);
    }
});

commentRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Comment not found.';
        }
        next(error);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
