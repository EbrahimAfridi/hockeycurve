import React, {useState} from 'react';
import {useTaskContext} from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const {tasks} = useTaskContext();
    const [selectedPriority, setSelectedPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'ALL'>('ALL');

    const handlePriorityChange = (priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'ALL') => {
        setSelectedPriority(priority);
    };

    const filteredTasks = selectedPriority === 'ALL' ? tasks : tasks.filter(task => task.priority === selectedPriority);

    return (
        <div>
            <div className="mb-4">
                <label className="mr-2 font-medium text-lg">Filter by Priority</label>
                <select
                    className="w-18 font-medium px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPriority}
                    onChange={(e) => handlePriorityChange(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'ALL')}
                >
                    <option value="ALL">All</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>
            <div>
                {(filteredTasks.length === 0) ?
                    <div className={"text-xl"}>No tasks with priority
                        <span className={"bg-blue-600 font-medium text-white px-1 mx-1"}>
                            {selectedPriority.toLocaleLowerCase()}
                        </span>
                        found 🥹
                    </div>
                    : filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
