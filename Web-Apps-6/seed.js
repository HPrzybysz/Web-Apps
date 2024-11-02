const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    let category = await prisma.category.findUnique({
        where: { name: "Technology" },
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: "Technology",
            },
        });
    }

    await prisma.post.create({
        data: {
            title: "Some title",
            content: "I wrote titel not title im gonna cry",
            categoryId: category.id,
        },
    });

    console.log("Sample data added db");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
