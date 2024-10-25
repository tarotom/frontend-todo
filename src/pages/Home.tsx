import React from 'react';
import TodoItem from '../components/TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeTodo, saveEditedTodo, setIsBeingEditedId } from '../redux/slices/todo';

const Home: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();
    
    const handleDelete = (id: string) => {
        dispatch(removeTodo(id)); // Remove the todo by its id
    };

    const handleEditToggle = (id: string | null) => {
        dispatch(setIsBeingEditedId(id));
    }

    const handleEdit = (id: string, title: string, description: string) => {
        dispatch(saveEditedTodo({id: id, title: title, description: description})); // Remove the todo by its id
    };

    return (
        <div>
            <div className="todos">
                <h1>Todos</h1>
                <ol>
                    {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        onDelete={() => handleDelete(todo.id)} // Pass delete handler as a prop
                        editToggle={() => handleEditToggle(todo.id)}
                        editTodo={() => handleEdit(todo.id, todo.title, todo.description)}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Home;