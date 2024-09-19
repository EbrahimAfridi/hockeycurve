import React, { useState } from 'react';
import AddButton from '../ui/AddButton';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');

    // TODO: MAKE A addTask METHOD IN CONTEXT

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title) {
            await addTask({ title, description, priority });
            setTitle('');
            setDescription('');
            setPriority('LOW');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex space-x-4">
            <input
                type="text"
                placeholder="New task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
            />
            <input
                type="text"
                placeholder="New task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                className="px-4 py-2 border rounded-md"
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            <AddButton text="Add Task" />
        </form>
    );
};

export default TaskForm;
