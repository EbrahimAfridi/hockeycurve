import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks, createTask } from '../api/taskAPI';
import { Task } from '../types';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Partial<Task>) => Promise<void>;
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

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
    return context;
};
