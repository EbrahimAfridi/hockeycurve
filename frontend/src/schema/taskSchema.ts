import { z } from "zod";

// Define the schema for a task
export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    dueDate: z.date(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    completed: z.boolean().default(false),
    snoozed: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Schema for task updates
export const updateTaskSchema = taskSchema.partial().extend({
    id: z.number(),
});
