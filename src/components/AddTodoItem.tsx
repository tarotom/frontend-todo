import React, { useState } from 'react';
import { Toggles } from '../types/todo';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slices/todo';

const AddTodoItem: React.FC<Toggles> = ({toggleVisibility}) => {
  const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTodoCreation = () => {
      if (title !== "" && description !== "") {
        dispatch(addTodo({ title, description }));
        setTitle("");
        setDescription("");
        toggleVisibility()
      }
    }
  
    return (
      <div>
        <div>
          <div style={addItemsContainer}>
            <label>Title</label>
            <input type="text" placeholder='title' value={title} onChange={(event) => setTitle(event.target.value)} />
            <label>Description</label>
            <input type="text" placeholder='description' value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
        </div>
        <div>
          <button onClick={toggleVisibility}>Cancel</button>
          <button onClick={handleTodoCreation}>Add</button>
        </div>
      </div>
  );
};

const addItemsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem",
  alignItems: "center"
};

export default AddTodoItem;