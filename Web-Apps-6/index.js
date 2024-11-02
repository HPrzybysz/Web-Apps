const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { category: true, comments: true },
    });
    res.json(posts);
});


app.post('/posts', async (req, res) => {
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
