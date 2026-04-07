import './App.css';
import TodoList from './Components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Hooks
import { TodosContext } from './Context/TodosContext';
import { useState } from 'react';
import { SnackBarProvider } from './Context/SnackBarContext';

// Font Theme
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  }
});

function App() {
  // Todos
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <div className="App">
          {/* Todo List */}
          <TodosContext value={{todos: todos , setTodos: setTodos}}>
            <TodoList/>
          </TodosContext>
        </div>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
