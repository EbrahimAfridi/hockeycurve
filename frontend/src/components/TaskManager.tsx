import Input from "../ui/Input.tsx";
import Select from "../ui/Select.tsx";
import {useState} from "react";
import {Task} from "../types.ts"
import CalendarComponent from "./Calendar.tsx";
import {CheckCircle, ChevronDown, ChevronUp, Pencil, Trash2, XCircle} from "lucide-react"
import AddButton from "../ui/AddButton.tsx";

function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<Partial<Task>>({})
    const [openAccordion, setOpenAccordion] = useState<number | null>(null)

    const onAddTask = () => {
        if (newTask.title) {
            setTasks([...tasks, {...newTask, id: Date.now(), completed: false, createdAt: new Date()} as Task])
            setNewTask({})
        }
        console.log(tasks)
    }

    const toggleAccordion = (id: number) => {
        setOpenAccordion(openAccordion === id ? null : id)
    }

    return (
        <div
            className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
                <div className="mb-8 flex h-12 space-x-4">
                    <Input newTask={newTask} setNewTask={setNewTask} placeholder={"Enter Task"}/>
                    <Select/>
                    <div className="relative">
                        <CalendarComponent newTask={newTask} setNewTask={setNewTask}/>
                    </div>
                </div>
                <AddButton onClick={onAddTask} text={"Add Task"}/>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="border rounded-lg overflow-hidden bg-white bg-opacity-80">
                            <div
                                className="flex items-center justify-between w-full px-4 py-3 cursor-pointer"
                                onClick={() => toggleAccordion(task.id)}
                            >
                                <div className="flex items-center space-x-4">
                                    <span
                                        className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        {task.completed ? (
                                            <XCircle className="h-5 w-5"/>
                                        ) : (
                                            <CheckCircle className="h-5 w-5"/>
                                        )}
                                    </button>
                                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                                        <Pencil className="h-5 w-5"/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 focus:outline-none">
                                        <Trash2 className="h-5 w-5"/>
                                    </button>
                                    {/*TODO: ADD TOGGLE HANDLER LOGIC*/}
                                    {openAccordion === task.id ? (
                                        <ChevronUp className="h-5 w-5"/>
                                    ) : (
                                        <ChevronDown className="h-5 w-5"/>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskManager;