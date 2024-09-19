import React from 'react';
import { Task } from '../types';
import { CheckCircle, Trash2, Pencil } from 'lucide-react';
import {deleteTask, updateTask} from "../api/taskAPI.ts";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {

    const handleDelete = async () => {
        await deleteTask(task.id);
    };

    const handleToggleComplete = async () => {
        await updateTask(task.id, { completed: !task.completed });
    };

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="flex justify-between items-center p-4">
                <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
                <div className="flex space-x-2">
                    <button onClick={handleToggleComplete}>
                        {task.completed ? <CheckCircle className="text-green-500" /> : <CheckCircle className="text-gray-500" />}
                    </button>
                    <button>
                        <Pencil className="text-blue-500" />
                    </button>
                    <button onClick={handleDelete}>
                        <Trash2 className="text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
