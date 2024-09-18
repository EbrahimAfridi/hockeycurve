import AddButton from "../ui/AddButton.tsx";
import Input from "../ui/Input.tsx";
import Select from "../ui/Select.tsx";
import {Calendar} from "lucide-react";

function TaskManager() {

    return (
        <div
            className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
                <div className="mb-8 flex space-x-4">
                    <Input type={"text"} placeholder={"Enter Task"}/>
                    <Select/>
                </div>
                <div className="relative">
                    <button>
                        <Calendar className="h-5 w-5"/>
                    </button>
                    <AddButton text={"Add Task"}/>
                </div>
            </div>
        </div>
    );
}

export default TaskManager;