import { taskSchema, updateTaskSchema } from "../schema/taskSchema.ts";
import { z } from "zod";

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return z.array(taskSchema).parse(data.tasks);
};

// Create a new task
export const createTask = async (taskData: z.infer<typeof taskSchema>) => {
    const parsedTask = taskSchema.parse(taskData);
    const response = await fetch("/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedTask),
    });
    return response.json();
};

// Update a task
export const updateTask = async (id: number, taskData: z.infer<typeof updateTaskSchema>) => {
    const parsedData = updateTaskSchema.parse(taskData);
    const response = await fetch(`/api/tasks/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
    });
    return response.json();
};

// Delete a task
export const deleteTask = async (id: number) => {
    const response = await fetch(`/api/tasks/delete/${id}`, {
        method: "DELETE",
    });
    return response.json();
};
