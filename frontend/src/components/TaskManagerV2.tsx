import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManagerV2 = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
            <h1 className="text-4xl font-bold text-center mb-8">Task Manager</h1>
            <TaskForm/>
            <TaskList/>
        </div>
    );
};

export default TaskManagerV2;
