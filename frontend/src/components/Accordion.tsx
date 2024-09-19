import React, {useState} from 'react';
import {CalendarCheck2, Clock} from "lucide-react";
import {format} from "date-fns";
import {Task} from '../types';
import {useTaskContext} from '../context/TaskContext';

interface AccordionProps {
    task: Task;
    onClose: () => void;
    isEditing?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({task, onClose, isEditing = false}) => {
    const {updateTask} = useTaskContext();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>(task.priority);

    const handleSave = async () => {
        await updateTask(task.id, {title, description, priority});
        onClose(); // Close the accordion after saving
    };

    return (
        <div className="px-4 py-3 border-t">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Edit description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
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
                <div>
                    <h3 className="text-lg">{task.title}</h3>
                    <p className="mb-2">{task.description}</p>
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
                                Created
                                at: {task.createdAt ? format(new Date(task.createdAt), 'MMM d, yyyy') : 'No created date'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accordion;
