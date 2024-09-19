import React, {useState} from 'react';
import {useTaskContext} from '../context/TaskContext';
import {Task} from '../types';
import {CheckCircle, Pencil, Trash2} from 'lucide-react';
import Accordion from "./Accordion.tsx";

const TaskItem: React.FC<{ task: Task }> = ({task}) => {
    const {updateTask, removeTask} = useTaskContext();
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the accordion from toggling
        await removeTask(task.id);
    };

    const handleToggleComplete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the accordion from toggling
        await updateTask(task.id, {completed: !task.completed});
    };

    const handleToggleAccordion = (id: number | null) => {
        if (openAccordion === id) {
            setOpenAccordion(null);
            setIsEditing(false); // Reset editing state when closing
        } else {
            setOpenAccordion(id);
            setIsEditing(false); // Ensure it's not in editing mode
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the title click from toggling the accordion
        setOpenAccordion(task.id); // Open accordion
        setIsEditing(true); // Set to editing mode
    };

    const priorityIcons = {
        LOW: "🪫",
        MEDIUM: "🙆🏻‍♂️️",
        HIGH: "🚨",
    };

    return (
        <div className="border hover:bg-zinc-100 rounded-lg overflow-hidden bg-white my-2.5">
            <div className="flex justify-between items-center p-4" onClick={() => handleToggleAccordion(task.id)}>
                <div className={`rounded-full flex items-center gap-2`}>
                    {priorityIcons[task.priority]}
                    <span
                        className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</span>
                </div>
                <div className="flex space-x-2">
                    <button onClick={handleToggleComplete}>
                        {task.completed ? <CheckCircle className="text-green-500"/> :
                            <CheckCircle className="text-gray-500"/>}
                    </button>
                    <button onClick={handleEditClick}>
                        <Pencil className="text-blue-500"/>
                    </button>
                    <button onClick={handleDelete}>
                        <Trash2 className="text-red-500"/>
                    </button>
                </div>
            </div>
            {openAccordion === task.id && (
                <Accordion task={task} onClose={() => setOpenAccordion(null)} isEditing={isEditing}/>
            )}
        </div>
    );
};

export default TaskItem;
