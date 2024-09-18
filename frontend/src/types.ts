export type Task = {
    id: number;
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate: Date;
    completed: boolean;
    createdAt: Date;
    snoozed: boolean;
}
