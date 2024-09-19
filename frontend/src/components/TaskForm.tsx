import React, {useState} from 'react';
import AddButton from '../ui/AddButton';
import {useTaskContext} from "../context/TaskContext.tsx";
import {Calendar} from "lucide-react";
import {format} from "date-fns";

const TaskForm = () => {
    const {addTask} = useTaskContext();

    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH',
        dueDate: null as Date | null,
    });

    const [showCalendar, setShowCalendar] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setTask(prevTask => ({
            ...prevTask,
            dueDate: date,
        }));
        setShowCalendar(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task.title) {
            const newTask = {
                ...task,
                dueDate: task.dueDate?.toISOString(), // Store as string if required
            };
            await addTask(newTask);
            setTask({
                title: '',
                description: '',
                priority: 'LOW',
                dueDate: null,
            });
        }
    };

    return (
        // <form onSubmit={handleSubmit} className="mb-8 flex  space-y-4">
        <form onSubmit={handleSubmit}>
            <div className="mb-8 flex h-12 space-x-2">
                <input
                    type="text"
                    name="title"
                    placeholder="New task title"
                    value={task.title}
                    onChange={handleInputChange}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="New task description"
                    value={task.description}
                    onChange={handleInputChange}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleInputChange}
                    className="w-32 font-medium px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                {/* Calendar Component */}
                    <div className="flex items-center relative">
                        <button
                            onClick={() => setShowCalendar(!showCalendar)}
                            className="w-full gap-2 px-4 py-3 bg-white border border-gray-300 rounded-md flex items-center justify-between"
                            type="button"
                        >
                    <span className={`${task.dueDate ? 'text-xs py-1' : 'font-medium'}`}>
                        {task.dueDate ? format(task.dueDate, "PPP") : "Pick a date"}
                    </span>
                            <Calendar className="size-5"/>
                        </button>
                        {showCalendar && (
                            <div className="absolute top-12 mt-2 bg-white shadow-lg rounded-md p-2">
                                <input
                                    type="date"
                                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                    </div>
            </div>
            <AddButton text="Add Task"/>
        </form>
    );
};

export default TaskForm;
