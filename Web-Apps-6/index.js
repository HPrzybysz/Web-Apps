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


// app.get('/posts', async (req, res) => {
//     const posts = await prisma.post.findMany({
//         include: { category: true, comments: true },
//     });
//     res.json(posts);
// });
//
//
// app.post('/posts', async (req, res) => {
//     const { title, content, categoryId } = req.body;
//     const post = await prisma.post.create({
//         data: {
//             title,
//             content,
//             category: { connect: { id: categoryId } },
//         },
//     });
//     res.json(post);
// });


// CRUD Routers for posts

postRouter.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { category: true, comments: true },
    });
    res.json(posts);
});

postRouter.post('/', async (req, res) => {
    const { title, content, categoryId } = req.body;
    const post = await prisma.post.create({
        data: {
            title,
            content,
            category: { connect: { id: categoryId } },
        },
    });
    res.json(post);
});

postRouter.put('/:id', async (req, res) => {
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
});

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.delete({
        where: { id: parseInt(id) },
    });
    res.json({ message: 'Post deleted successfully' });
});

// CRUD Routers for category

categoryRouter.get('/', async (req, res) => {
    const categories = await prisma.category.findMany({
        include: { posts: true },
    });
    res.json(categories);
});

categoryRouter.post('/', async (req, res) => {
    const { name } = req.body;
    const category = await prisma.category.create({
        data: { name },
    });
    res.json(category);
});

categoryRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name },
    });
    res.json(updatedCategory);
});

categoryRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.category.delete({
        where: { id: parseInt(id) },
    });
    res.json({ message: 'Category deleted successfully' });
});

// CRUD Routers for comments

commentRouter.get('/:postdId', async (req, res) => {
    const { postId } = req.params;
    const comments = await  prisma.comment.findMany({
        where: { postId: parseInt(postId) },
    });
    res.json(comments)
});

commentRouter.post('/', async (req, res) => {
    const { content, postId } = req.body;
    const comment = await prisma.comment.create({
        data: {
            content,
            post: { connect: { id: postId } },
        },
    });
    res.json(comment);
});

commentRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await prisma.comment.update({
        where: { id: parseInt(id) },
        data: { content },
    });
    res.json(updatedComment);
});

commentRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
        where: { id: parseInt(id) },
    });
    res.json({ message: 'Comment deleted successfully' });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
