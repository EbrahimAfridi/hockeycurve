export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    dueDate?: string; // ISO date format as a string
    priority?: 'LOW' | 'MEDIUM' | 'HIGH'; // Match your enum values
    completed?: boolean;
    snoozed?: boolean;
}

