import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskAPI';
import { Task } from '../types';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Partial<Task>) => Promise<void>;
    updateTask: (id: number, task: Partial<Task>) => Promise<void>;
    removeTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasks();
            setTasks(data.tasks);
        };
        loadTasks();
    }, []);

    const addTask = async (newTask: Partial<Task>) => {
        const response = await createTask(newTask as Task);
        setTasks((prev) => [...prev, response.task]);
    };

    const updateTaskHandler = async (id: number, updatedTask: Partial<Task>) => {
        const response = await updateTask(id, updatedTask as Task);
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? response.task : task))
        );
    };

    const removeTask = async (id: number) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask: updateTaskHandler, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
    return context;
};
