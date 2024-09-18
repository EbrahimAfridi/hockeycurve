import AddButton from "../ui/AddButton.tsx";

function TaskManager() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 relative overflow-hidden">
            <AddButton text={"Add Task"} />
        </div>
    );
}

export default TaskManager;