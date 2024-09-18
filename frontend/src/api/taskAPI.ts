// import { taskSchema, updateTaskSchema } from "../schema/taskSchema.ts";
// import { z } from "zod";
//
// // Fetch all tasks
// export const fetchTasks = async () => {
//     const response = await fetch("/api/tasks");
//     const data = await response.json();
//     return z.array(taskSchema).parse(data.tasks);
// };
//
// // Create a new task
// export const createTask = async (taskData: z.infer<typeof taskSchema>) => {
//     const parsedTask = taskSchema.parse(taskData);
//     const response = await fetch("/api/tasks/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(parsedTask),
//     });
//     return response.json();
// };
//
// // Update a task
// export const updateTask = async (id: number, taskData: z.infer<typeof updateTaskSchema>) => {
//     const parsedData = updateTaskSchema.parse(taskData);
//     const response = await fetch(`/api/tasks/update/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(parsedData),
//     });
//     return response.json();
// };
//
// // Delete a task
// export const deleteTask = async (id: number) => {
//     const response = await fetch(`/api/tasks/delete/${id}`, {
//         method: "DELETE",
//     });
//     return response.json();
// };

import {Task} from "../types.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL);

export async function fetchTasks() {
    const response = await fetch(`${BASE_URL}/api/tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
}

export async function createTask(task: Task) {
    try {
        const response = await fetch(`http://localhost:8787/api/tasks/create`, {
            // const response = await fetch(`${BASE_URL}/api/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'My New Task',
                description: 'This is an optional description',
                dueDate: '2024-12-20T10:00:00.000Z',
                priority: 'LOW',
                completed: false, // Optional, defaults to false
                snoozed: false,   // Optional, defaults to false
                createdAt: '2024-10-20T10:00:00.000Z',
            }),
            // body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        console.log(response);
        return response.json(); // Ensure this matches your API response structure
    } catch (error) {
        console.error(error);
    }

}

export async function updateTask(id: number, updatedTask: Partial<Task>) {
    const response = await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update task: ${errorText}`);
    }
    return response.json(); // Ensure this matches your API response structure
}


export async function deleteTask(id: number) {
    const response = await fetch(`${BASE_URL}/api/tasks/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    return response.json(); // Ensure this matches your API response structure
}
