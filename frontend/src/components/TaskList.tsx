import TaskItem from './TaskItem';

const TaskList = () => {
    // TODO: GET TASKS AND MAKE TASK-ITEMS
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
