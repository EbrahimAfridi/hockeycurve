import { useState } from "react";
import { Task } from "../types.ts";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

function CalendarComponent(
    {
        newTask,
        setNewTask
    }: {
        newTask: Partial<Task>,
        setNewTask: (newTask: Partial<Task>) => void
    }) {
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-52 px-4 py-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2
                focus:ring-blue-500 flex items-center justify-between"
            >
                <span className={`${newTask.dueDate && `text-xs py-1`}`}>{newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}</span>
                <Calendar className="h-5 w-5" />
            </button>
            {showCalendar && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-2">
                    <input
                        type="date"
                        onChange={(e) => {
                            setNewTask({ ...newTask, dueDate: new Date(e.target.value) });
                            setShowCalendar(false);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                </div>
            )}
        </>
    );
}

export default CalendarComponent;
