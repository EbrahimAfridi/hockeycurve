import React from 'react';
import {useTaskContext} from '../context/TaskContext';
import {Task} from '../types';
import {CheckCircle, Pencil, Trash2} from 'lucide-react';

const TaskItem: React.FC<{ task: Task }> = ({task}) => {
    const {updateTask, removeTask} = useTaskContext();

    const handleDelete = async () => {
        await removeTask(task.id);
    };

    const handleToggleComplete = async () => {
        await updateTask(task.id, {completed: !task.completed});
    };

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="flex justify-between items-center p-4">
                <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
                <div className="flex space-x-2">
                    <button onClick={handleToggleComplete}>
                        {task.completed ? <CheckCircle className="text-green-500"/> :
                            <CheckCircle className="text-gray-500"/>}
                    </button>
                    <button>
                        <Pencil className="text-blue-500"/>
                    </button>
                    <button onClick={handleDelete}>
                        <Trash2 className="text-red-500"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
