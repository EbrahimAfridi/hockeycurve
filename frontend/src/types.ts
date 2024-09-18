export type Task = {
    id: number;
    title: string;
    description?: string;
    dueDate?: any;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    completed: boolean;
    createdAt: string;
    snoozed: boolean;
}
