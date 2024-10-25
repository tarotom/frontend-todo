// src/redux/todo.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from "../../types/todo";

// Define the initial state for todos
interface TodoState {
  todos: Todo[];
  isBeingEditedId: string | null;
}

const initialState: TodoState = {
  todos: [],
  isBeingEditedId: null
};

// Create a slice for todo management
const todo = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Action to add a todo
    addTodo: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTodo: Todo = {
        id: `todo-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID generation
        title: action.payload.title,
        description: action.payload.description,
      };
      state.todos.push(newTodo);
    },
    // Action to remove a todo
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    // Action to edit a todo
    saveEditedTodo: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index >= 0) {
        state.todos[index] = {
          ...state.todos[index],
          title: action.payload.title,
          description: action.payload.description,
        };
      }
    },
    isBeingEditedId: (state, action: PayloadAction<string | null>) => {
        state.isBeingEditedId = action.payload
    },
    setIsBeingEditedId: (state, action: PayloadAction<string | null>) => {
        if (state.isBeingEditedId == null) {
            state.isBeingEditedId = action.payload;
        } else
        {
            state.isBeingEditedId = null
        }
      },
  },
});

// Export the actions
export const { addTodo, removeTodo, saveEditedTodo, isBeingEditedId, setIsBeingEditedId } = todo.actions;

// Export the reducer to be used in the store
export default todo.reducer;
