import './App.css'
import TaskManager from "./components/TaskManager.tsx";
import {useEffect, useState} from "react";

function App() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({x: e.clientX, y: e.clientY})
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, []);


    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 relative overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-50"
                style={{
                    transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            />
            <div className="absolute inset-0 backdrop-blur-3xl"/>
            <TaskManager/>
        </div>
    )
}

export default App
