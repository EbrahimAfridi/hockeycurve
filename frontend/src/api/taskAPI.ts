import {Task} from "../types.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTasks() {
    const response = await fetch(`${BASE_URL}/api/tasks`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function createTask(task: Task) {
    try {
        const response = await fetch(`${BASE_URL}/api/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }

        return response.json();
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

    return response.json();
}


export async function deleteTask(id: number) {
    const response = await fetch(`${BASE_URL}/api/tasks/delete/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json();
}
