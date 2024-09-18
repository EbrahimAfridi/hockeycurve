import {Hono} from 'hono';
import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";
import {UpdateTaskPayload} from "../types";
import {cors} from "hono/cors";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    }
}>();

// CORS Middleware
app.use("/*", cors());
app.use('*', (c, next) => {
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    c.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});


// 1. Get all tasks
app.get('/api/tasks', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const tasks = await prisma.task.findMany();
        return c.json({tasks}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while fetching tasks.", 500);
    }
});

// 2. Add a task
app.post("/api/tasks/create", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        console.log(body);
        const task = await prisma.task.create({
            // data: {
            //     title: body.title,
            //     // description: body.description,
            //     dueDate: body.dueDate,
            //     priority: body.priority,
            //     createdAt: body.createdAt,
            // }
            data: {
                title: body.title,
                description: body.description || null, // Default to null if not provided
                dueDate: new Date(body.dueDate),        // Ensure valid Date object
                priority: body.priority,
                completed: body.completed || false,     // Boolean field
                snoozed: body.snoozed || false,         // Boolean field
                createdAt: body.createdAt ? new Date(body.createdAt) : undefined, // Optional field
            }
        });
        return c.json({task}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while creating task.", 500);
    }
});

// 3. Update a task
app.patch("/api/tasks/update/:id", async (c) => {
    const {title, description, dueDate, priority, completed, snoozed} = await c.req.json();
    const id = Number(c.req.param("id"));

    const updateData: UpdateTaskPayload = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (dueDate) updateData.dueDate = new Date(dueDate).toISOString();
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
        return c.json({task: updatedTask}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while updating task.", 500);
    }
});

// 4. Delete a task
app.delete("/api/tasks/delete/:id", async (c) => {
    const id = Number(c.req.param("id"));

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const task = await prisma.task.delete({
            where: {id: id}
        });
        return c.json({task}, 200);
    } catch (error) {
        console.error(error);
        return c.text("Error while deleting task.", 500);
    }
});

export default app;
