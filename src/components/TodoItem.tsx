import React, { useState } from "react";
import { TodoItemProps } from "../types/todo";
import { saveEditedTodo, setIsBeingEditedId } from '../redux/slices/todo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, onDelete }) => {
    const dispatch = useDispatch()
    const todos = useSelector((state: RootState) => state.todos.todos)
    const todo = todos.find(t => t.id === id);  // Find the specific todo by id
    const isBeingEditedId = useSelector((state: RootState) => state.todos.isBeingEditedId)

    // State to track the ID of the todo being edited
    // State to track input values for title and description while editing
    const [editTitle, setEditTitle] = useState<string>(todo?.title || '');
    const [editDescription, setEditDescription] = useState<string>(todo?.description || '');

    // Handles the change in title input
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);  // Update the editTitle state
    };

    // Handles the change in description input
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditDescription(e.target.value);  // Update the editDescription state
    };

    // Saves the changes and calls the onSave function from props
    const handleSave = () => {
        //onSave(todo.id, editTitle, editDescription);
        // editTodo(todo?.id, todo?.title, todo?.description)
        dispatch(saveEditedTodo({id: id, title: editTitle, description: editDescription}));
        handleEditToggle(null);  // Exit edit mode after saving
        // should vall the slice metgos
    };

    const handleEditToggle = (id: string | null) => {
        dispatch(setIsBeingEditedId(id))
        if(isBeingEditedId){
            setEditTitle("")
            setEditDescription("")
        } else {
            setEditTitle(todo?.title ? todo.title : "")
            setEditDescription(todo?.description? todo.description : "")
        }
    }

    return (
        <div>
        {todo?.id !== isBeingEditedId ?
        <div className="todo" style={container}>
            <div style={textContainer}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div>
                <button onClick={() => handleEditToggle(todo?.id ? todo?.id : null)}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div> 
        :
        <div>
            <div className="todo-edit" style={container}>
                <div style={inputContainer}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={handleTitleChange}
                        placeholder="Title"
                    />
                </div>
                <div style={inputContainer}>
                    <label>Description</label>
                    <input
                        type="text"
                        value={editDescription}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                    />
                </div>
                {/* Save and Cancel buttons */}
                <button onClick={handleSave}>Save</button>
                <button onClick={() => handleEditToggle(todo?.id ? todo.id : null)}>Cancel</button>
            </div>
        </div>
        }
        </div>
    );
};

const container: React.CSSProperties = {
      display: 'flex' as const,  // Flexbox layout
      justifyContent: 'center' as const,  // Spread title/description and button
      alignItems: 'center' as const,  // Vertically center items
      flexDirection: "column",
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '10px',
    };

const textContainer: React.CSSProperties = {
      display: 'flex' as const,
      flexDirection: 'column' as const,  // Specify valid flex direction
    };
    
const inputContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem",
};

export default TodoItem;