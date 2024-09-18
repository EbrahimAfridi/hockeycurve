export default function Input({type = "text", placeholder}: { type: string, placeholder?: string }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
    )
}
