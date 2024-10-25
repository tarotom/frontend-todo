import './App.css';
import Home from './pages/Home';
import AddTodoItem from './components/AddTodoItem';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo  } from './redux/slices/todo';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [addingTodoItem, setAddingTodoItem] = useState<boolean>(false);
  const [editingTodoItem] = useState<boolean>(false);
  useEffect(() => {
    dispatch(addTodo({title: "Todo 1", description: "Description of Todo 1" }))
    dispatch(addTodo({title: "Todo 2", description: "Description of Todo 2" }))
    dispatch(addTodo({title: "Todo 3", description: "Description of Todo 3" }))
  }, [dispatch]); // Ensure useEffect runs once on mount

  const toggleVisibility = () => {
    setAddingTodoItem(!addingTodoItem);
  };

  return (
    <div className="App">
      {/* don't show "add form" when editing */}
      {(!addingTodoItem || editingTodoItem) && <button onClick={toggleVisibility}>Add a todo</button>}

      <div>
          {addingTodoItem ?
              <AddTodoItem toggleVisibility={toggleVisibility} /> : <div></div>
          }
      </div>
      
      <Home />
    </div>
  );
}

export default App;
