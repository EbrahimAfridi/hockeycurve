import React, {useEffect, useState} from "react";
import {Task} from "../types";
import CalendarComponent from "./Calendar";
import {CalendarCheck2, CheckCircle, Clock, Pencil, Trash2, XCircle} from "lucide-react";
import {format} from "date-fns";
import {createTask, deleteTask, fetchTasks, updateTask} from "../api/taskAPI.ts";
import AddButton from "../ui/AddButton.tsx";

function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Partial<Task>>({});
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data.tasks); // Ensure 'tasks' matches your API response structure
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        loadTasks();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH");
    };

    const handleAddTask = async () => {
        if (newTask.title) {
            try {
                const response = await createTask({
                    ...newTask,
                    createdAt: new Date().toISOString(),
                } as Task);
                setTasks([...tasks, response.task]); // Ensure 'task' matches your API response structure
                setNewTask({});
            } catch (error) {
                console.error("Failed to create task:", error);
            }
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: Partial<Task>) => {
        try {
            const response = await updateTask(id, updatedTask as Task);
            setTasks(tasks.map(task => (task.id === id ? response.task : task))); // Ensure 'task' matches your API response structure
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleSave = async () => {
        if (currentTaskId !== null) {
            try {
                await handleUpdateTask(currentTaskId, {
                    title,
                    description,
                    priority
                });
                setEditingTask(null); // Exit editing mode
                setCurrentTaskId(null); // Clear the current task ID
            } catch (error) {
                console.error("Failed to update task:", error);
            }
        }
    };


    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    // const priorityColors = {
    //     LOW: "bg-green-500",
    //     MEDIUM: "bg-yellow-500",
    //     HIGH: "bg-red-500",
    // };

    const priorityColors = {
        LOW: "🪫",
        MEDIUM: "🙆🏻‍♂️️",
        HIGH: "🚨",
    };

    const toggleTaskCompletion = (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            handleUpdateTask(id, {completed: !task.completed});
        }
    };

    const toggleAccordion = (id: number) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <div
            className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
                <div className="mb-8 flex h-12 space-x-4">
                    <input
                        type="text"
                        placeholder="New task title"
                        value={newTask.title || ""}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={newTask.priority || ""}
                        onChange={(e) => setNewTask({
                            ...newTask,
                            priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"
                        })}
                        className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <div className="relative">
                        <CalendarComponent newTask={newTask} setNewTask={setNewTask}/>
                    </div>
                </div>
                <AddButton onClick={handleAddTask} text={"Add Task"}/>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="border rounded-lg overflow-hidden bg-white bg-opacity-80">
                            <div
                                className="flex items-center justify-between w-full px-4 py-3 cursor-pointer"
                                onClick={() => toggleAccordion(task.id)}
                            >
                                <div className="flex items-baseline space-x-4">
                                    {/*<div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}/>*/}
                                    <div className={`w-3 h-3 rounded-full`}>{priorityColors[task.priority]}</div>
                                    <span
                                        className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskCompletion(task.id);
                                        }}
                                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {task.completed ? (
                                            <XCircle className="h-5 w-5"/>
                                        ) : (
                                            <CheckCircle className="h-5 w-5"/>
                                        )}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentTaskId(task.id);
                                            setTitle(task.title);
                                            setDescription(task.description || "");
                                            setOpenAccordion(task.id);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                    >
                                        <Pencil className="size-5"/>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTask(task.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        <Trash2 className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                            {openAccordion === task.id && (
                                <div className="px-4 py-3 border-t">
                                    {currentTaskId === task.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={handleTitleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Edit description"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                            />
                                            <select
                                                value={priority}
                                                onChange={handlePriorityChange}
                                                className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Priority</option>
                                                <option value="LOW">Low</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="HIGH">High</option>
                                            </select>
                                            <button
                                                onClick={handleSave}
                                                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 w-24 font-medium mt-2 py-2 rounded-md focus:outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={"flex flex-col"}>
                                            <p className={"text-lg"}>{task.description}</p>
                                            <div className={"flex gap-4 mt-2"}>
                                                <div className={"flex items-center gap-1 text-sm"}>
                                                    <CalendarCheck2 size={14}/>
                                                    <p>
                                                        Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
                                                    </p>
                                                </div>

                                                <div className={"flex items-center gap-1 text-sm"}>
                                                    <Clock size={14}/>
                                                    <p>
                                                        Created at: {task.createdAt ? format(new Date(task.createdAt), 'MMM d, yyyy') : 'No created date'}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskManager;
