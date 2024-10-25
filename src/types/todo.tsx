export interface TodoItemProps {
    id: string;
    title: string;
    description: string;
    onDelete: () => void;
    editToggle: () => void;
    editTodo: () => void;
}

export interface Todo {
    id: string;
    title: string;
    description: string;
}

export interface Toggles {
    toggleVisibility: () => void;
}