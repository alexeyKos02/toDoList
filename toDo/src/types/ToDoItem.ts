export type ToDoItem = {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
    isLarge: boolean;
    extraItems : ExtraItem[];
}
export type ExtraItem = {
    id: number;
    name: string;
    isDone: boolean;
}