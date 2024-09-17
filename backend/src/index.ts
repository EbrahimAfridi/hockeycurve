import {Hono} from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import {withAccelerate} from "@prisma/extension-accelerate"


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    }
}>();

// Routes
// 1. Get All Tasks
app.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const tasks = await prisma.task.findMany();
    console.log(tasks);

    return c.json({tasks: tasks}, 200);
});

// 2. Add a tasks
app.post("/create", async (c) => {
    const body = await c.req.json();
    console.log(body);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                dueDate: body.dueDate,
                priority: body.priority,
            }
        });
        console.log(task);
        return c.json({task: task}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while creating a task.", 411);
    }
});

export default app
