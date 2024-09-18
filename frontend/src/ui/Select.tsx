import {Task} from "../types.ts";

function Select({newTask, setNewTask}: {
    newTask?: Partial<Task>,
    setNewTask?: (newTask: Partial<Task>) => void
}) {
    return (
        <select
            value={newTask?.priority || ""}
            onChange={(e) => {
                if (setNewTask) {
                    setNewTask({...newTask, priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"})
                }
            }}
            className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
        </select>
    );
}

export default Select;