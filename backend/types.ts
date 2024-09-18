export interface UpdateTaskPayload {
    id?: number;
    title?: string;
    description?: string;
    dueDate?: string; // ISO date format as a string
    priority?: 'LOW' | 'MEDIUM' | 'HIGH'; // Match your enum values
    snoozed?: boolean;
    completed?: boolean;
    createdAt?: string;
}

