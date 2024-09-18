function Select() {
    return (
        <select
            id="priority"
            name="priority"
            className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
        </select>
    );
}

export default Select;