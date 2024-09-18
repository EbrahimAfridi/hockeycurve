import AddButton from "../ui/AddButton.tsx";
import Input from "../ui/Input.tsx";
import Select from "../ui/Select.tsx";
import {useState} from "react";
import {Task} from "../types.ts"
import CalendarComponent from "./Calendar.tsx";

function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<Partial<Task>>({})

    const onAddTask = () => {
        if (newTask.title) {
            setTasks([...tasks, {...newTask, id: Date.now(), completed: false, createdAt: new Date()} as Task])
            setNewTask({})
        }
    }

    return (
        <div
            className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
                <div className="mb-8 flex h-12 space-x-4">
                    <Input type={"text"} placeholder={"Enter Task"}/>
                    <Select/>
                    <div className="relative">
                        <CalendarComponent newTask={newTask} setNewTask={setNewTask}/>
                    </div>
                </div>
                <AddButton onClick={onAddTask} text={"Add Task"}/>
            </div>
        </div>
    );
}

export default TaskManager;