import {Hono} from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import {withAccelerate} from "@prisma/extension-accelerate"
import {UpdateTaskPayload} from "../types";


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

// 3. Update a task
app.patch("/update/:id", async (c) => {
    const {title, description, dueDate, priority, completed, snoozed} = await c.req.json();
    const id = Number(c.req.param("id"));
    console.log("id", id);

    // Create an updateData object based on the fields provided
    const updateData: UpdateTaskPayload = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (dueDate) updateData.dueDate = new Date(dueDate).toISOString(); // Converting Date object into string
    if (priority) updateData.priority = priority;
    if (typeof completed === 'boolean') updateData.completed = completed;
    if (typeof snoozed === 'boolean') updateData.snoozed = snoozed;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const updatedTask = await prisma.task.update({
            where: {id: id},
            data: updateData,
        });
        console.log(updatedTask);
        return c.json({task: updatedTask}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while updating task.", 500);
    }
});

app.delete("/delete/:id", async (c) => {
    const id = Number(c.req.param("id"));
    console.log("id", id);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const task = await prisma.task.delete({
            where: {id: id}
        });
        console.log(task);
        return c.json({task: task}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while deleting task.", 500);
    }
})
export default app
