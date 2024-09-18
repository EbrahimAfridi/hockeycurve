// import {useState} from "react";
// import {Task} from "../types.ts"
// import CalendarComponent from "./Calendar.tsx";
// import {Calendar, CheckCircle, ChevronDown, ChevronUp, Clock, Flag, Pencil, Trash2, XCircle} from "lucide-react"
// import AddButton from "../ui/AddButton.tsx";
// import {format} from "date-fns";
//
// function TaskManager() {
//     const [tasks, setTasks] = useState<Task[]>([])
//     const [newTask, setNewTask] = useState<Partial<Task>>({})
//     const [openAccordion, setOpenAccordion] = useState<number | null>(null)
//     const [editingTask, setEditingTask] = useState<number | null>(null)
//
//     const onAddTask = () => {
//         if (newTask.title) {
//             setTasks([...tasks, {...newTask, id: Date.now(), completed: false, createdAt: new Date()} as Task])
//             setNewTask({})
//         }
//         console.log(tasks)
//     }
//
//     const updateTask = (id: number, updatedTask: Partial<Task>) => {
//         setTasks(tasks.map(task => task.id === id ? {...task, ...updatedTask} : task))
//     }
//
//     const deleteTask = (id: number) => {
//         setTasks(tasks.filter(task => task.id !== id))
//     }
//
//     const priorityColors = {
//         LOW: "bg-green-500",
//         MEDIUM: "bg-yellow-500",
//         HIGH: "bg-red-500"
//     }
//
//     const toggleTaskCompletion = (id: number) => {
//         setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
//     }
//
//     const toggleAccordion = (id: number) => {
//         setOpenAccordion(openAccordion === id ? null : id)
//     }
//
//     return (
//         <div
//             className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
//             <div className="p-8">
//                 <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
//                 <div className="mb-8 flex h-12 space-x-4">
//                     <input
//                         type="text"
//                         placeholder="New task title"
//                         value={newTask.title || ""}
//                         onChange={(e) => setNewTask({...newTask, title: e.target.value})}
//                         className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                         value={newTask.priority || ""}
//                         onChange={(e) => setNewTask({
//                             ...newTask,
//                             priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"
//                         })}
//                         className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">Priority</option>
//                         <option value="low">Low</option>
//                         <option value="medium">Medium</option>
//                         <option value="high">High</option>
//                     </select>
//                     <div className="relative">
//                         <CalendarComponent newTask={newTask} setNewTask={setNewTask}/>
//                     </div>
//                 </div>
//                 <AddButton onClick={onAddTask} text={"Add Task"}/>
//                 <div className="space-y-4">
//                     {tasks.map((task) => (
//                         <div key={task.id} className="border rounded-lg overflow-hidden bg-white bg-opacity-80">
//                             <div
//                                 className="flex items-center justify-between w-full px-4 py-3 cursor-pointer"
//                                 onClick={() => toggleAccordion(task.id)}
//                             >
//                                 <div className="flex items-center space-x-4">
//                                     <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}/>
//                                     <span
//                                         className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
//                                         {task.title}
//                                     </span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             toggleTaskCompletion(task.id)
//                                         }}
//                                         className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                                     >
//                                         {task.completed ? (
//                                             <XCircle className="h-5 w-5"/>
//                                         ) : (
//                                             <CheckCircle className="h-5 w-5"/>
//                                         )}
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setEditingTask(editingTask === task.id ? null : task.id)
//                                         }}
//                                         className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                     >
//                                         <Pencil className="h-5 w-5"/>
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             deleteTask(task.id)
//                                         }}
//                                         className="text-red-500 hover:text-red-700 focus:outline-none">
//                                         <Trash2 className="h-5 w-5"/>
//                                     </button>
//                                     {openAccordion === task.id ? (
//                                         <ChevronUp className="h-5 w-5"/>
//                                     ) : (
//                                         <ChevronDown className="h-5 w-5"/>
//                                     )}
//                                 </div>
//                             </div>
//                             {openAccordion === task.id && (
//                                 <div className="p-4 space-y-4">
//                                     {editingTask === task.id ? (
//                                         <>
//                                             <input
//                                                 type="text"
//                                                 value={task.title}
//                                                 onChange={(e) => updateTask(task.id, {title: e.target.value})}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
//                                             />
//                                             <textarea
//                                                 value={task.description}
//                                                 onChange={(e) => updateTask(task.id, {description: e.target.value})}
//                                                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 rows={3}
//                                             />
//                                             <div className="flex space-x-4">
//                                                 <select
//                                                     value={task.priority}
//                                                     onChange={(e) => updateTask(task.id, {priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"})}
//                                                     className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 >
//                                                     <option value="LOW">Low</option>
//                                                     <option value="MEDIUM">Medium</option>
//                                                     <option value="HIGH">High</option>
//                                                 </select>
//                                                 <input
//                                                     type="date"
//                                                     value={format(task.dueDate, "yyyy-MM-dd")}
//                                                     onChange={(e) => updateTask(task.id, {dueDate: new Date(e.target.value)})}
//                                                     className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 />
//                                                 <button
//                                                     className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
//                                                     onClick={(e) => {
//                                                         e.stopPropagation()
//                                                         setEditingTask(editingTask === task.id ? null : task.id)
//                                                     }}>
//                                                     Edit Task
//                                                 </button>
//                                             </div>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <p className="text-gray-600">{task.description}</p>
//                                             <div className="flex items-center space-x-4 flex-wrap">
//                                                 <div className="flex items-center space-x-2">
//                                                     <Flag className={`h-5 w-5 ${priorityColors[task.priority]}`}/>
//                                                     <span className="capitalize">{task.priority} Priority</span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <span>Due: {format(task.dueDate ?? new Date(), "PPP")}</span>
//                                                     <Calendar className="h-5 w-5 text-gray-500"/>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <Clock className="h-5 w-5 text-gray-500"/>
//                                                     <span>Created: {format(task.createdAt, "PPP 'at' p")}</span>
//                                                 </div>
//                                             </div>
//                                         </>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default TaskManager;


import {useEffect, useState} from "react";
import {Task} from "../types";
import CalendarComponent from "./Calendar";
import {CheckCircle, Pencil, Trash2, XCircle} from "lucide-react";
import {format} from "date-fns";
import {createTask, deleteTask, fetchTasks, updateTask} from "../api/taskAPI.ts";

function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Partial<Task>>({});
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [editingTask, setEditingTask] = useState<number | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data.tasks); // Ensure 'tasks' matches your API response structure
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        loadTasks();
    }, []);

    const handleAddTask = async () => {
        if (newTask.title) {
            console.log(newTask);
            try {
                const response = await createTask({
                    ...newTask,
                    createdAt: new Date().toISOString(),
                } as Task);
                setTasks([...tasks, response.task]); // Ensure 'task' matches your API response structure
                setNewTask({});
            } catch (error) {
                console.error("Failed to create task:", error);
            }
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: Partial<Task>) => {
        try {
            const response = await updateTask(id, updatedTask as Task);
            setTasks(tasks.map(task => (task.id === id ? response.task : task))); // Ensure 'task' matches your API response structure
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const priorityColors = {
        LOW: "bg-green-500",
        MEDIUM: "bg-yellow-500",
        HIGH: "bg-red-500",
    };

    const toggleTaskCompletion = (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            handleUpdateTask(id, {completed: !task.completed});
        }
    };

    const toggleAccordion = (id: number) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <div
            className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
                <div className="mb-8 flex h-12 space-x-4">
                    <input
                        type="text"
                        placeholder="New task title"
                        value={newTask.title || ""}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={newTask.priority || ""}
                        onChange={(e) => setNewTask({
                            ...newTask,
                            priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"
                        })}
                        className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <div className="relative">
                        <CalendarComponent newTask={newTask} setNewTask={setNewTask}/>
                    </div>
                </div>
                {/*<AddButton onClick={handleAddTask} text={"Add Task"} />*/}
                <button
                    className={"-mt-4 mb-10 justify-start text-left font-normal relative inline-block text-lg group"}
                    onClick={handleAddTask}
                >
                <span
                    className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span
                        className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">Add Task</span>
                </span>
                    <span
                        className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
                </button>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="border rounded-lg overflow-hidden bg-white bg-opacity-80">
                            <div
                                className="flex items-center justify-between w-full px-4 py-3 cursor-pointer"
                                onClick={() => toggleAccordion(task.id)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}/>
                                    <span
                                        className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskCompletion(task.id);
                                        }}
                                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {task.completed ? (
                                            <XCircle className="h-5 w-5"/>
                                        ) : (
                                            <CheckCircle className="h-5 w-5"/>
                                        )}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingTask(editingTask === task.id ? null : task.id);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                    >
                                        <Pencil className="h-5 w-5"/>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTask(task.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        <Trash2 className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                            {openAccordion === task.id && (
                                <div className="px-4 py-3 border-t">
                                    {editingTask === task.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={task.title}
                                                onChange={(e) => handleUpdateTask(task.id, {title: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                            />
                                            <button
                                                onClick={() => setEditingTask(null)}
                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{task.description}</p>
                                            <p>Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskManager;
