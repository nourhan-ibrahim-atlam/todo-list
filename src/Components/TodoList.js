// Hooks
import { useState, useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { useSnackBar } from '../Context/SnackBarContext';

// Delete Modal
import { ModalContext , UpdateModalContext  } from '../Context/ModalContext';


// Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

// Toggle Button
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Them
import { createTheme , ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors'

// Todo Comp
import Todo from './Todo';

// UUID Library
import { v4 as uuidv4 } from 'uuid';

// Color Theme
const Theme = createTheme({
  palette: {
    primary: {
      main: pink[800],
    },
  },
});



export default function TodoList() {
    // Toggle Button
    const [alignment, setAlignment] = useState('الكل');

    const handleAlignment = (event ,  newAlignment) => {
        setAlignment(newAlignment);
    };

    // Todos
    const myTodos = useContext(TodosContext);
    const todos = myTodos.todos;
    const setTodos = myTodos.setTodos;

    // SnackBar
    const {ShowHideToast} = useSnackBar();

    // Modals
    const [openDel, setOpenDel] = useState(false);
    const [openUpd, setOpenUpd] = useState(false);

    // Add New Todo
    const [newTodo, setNewTodo] = useState("");

    return (
        <Container maxWidth="sm">
            {/* Main Card */}
            <Card sx={{ minWidth: 275 }}
                style={{maxHeight: "80vh" , overflow: "auto" , scrollbarWidth: "none"}}>
                <CardContent>
                    {/* Title */}
                    <Typography variant='h2' style={{fontWeight: "bold"}}>
                        مهامي
                    </Typography>
                    <Divider /> 

                    {/* 3 Buttons */}
                    <ThemeProvider theme={Theme}>
                        <ToggleButtonGroup
                            style={{ marginTop: "25px", direction: "ltr" }}
                            color='primary'
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="Platform"
                            >
                            <ToggleButton value=" غير المنجزه" >
                                غير المنجزه
                            </ToggleButton>
                            <ToggleButton value="المنجزه">
                                المنجزه
                            </ToggleButton>
                            <ToggleButton value="الكل" >
                                الكل
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ThemeProvider>  
                </CardContent>
                        
                {/*  All Todos Comp  */}
                <div style={{margin: "0 10px"}}>
                    <ModalContext.Provider value={{open: openDel , setOpen: setOpenDel}}>
                        <UpdateModalContext.Provider value={{ open: openUpd, setOpen: setOpenUpd }}>
                            {/* Check Type Of Todo */}
                            {alignment === "المنجزه" ? <Todo complated="true" /> :
                            (alignment === " غير المنجزه" ? <Todo complated="false"/> : <Todo/>)}
                        </UpdateModalContext.Provider>
                    </ModalContext.Provider>       
                </div> 
                
                {/* Add Todo */}
                <CardActions>
                    <ThemeProvider theme={Theme}>
                        <TextField value={newTodo} onChange={(e) => {
                            setNewTodo(e.target.value)
                        }}
                        id="outlined-basic" label="عنوان المهمة" variant="outlined"
                        style={{ width: "63.5%" }} size='small' />    
                        <Button onClick={(e) => {
                            const newTodos = [...todos , { id: uuidv4(), title: newTodo, details: "", isComplate: false }]
                            setTodos(newTodos)
                            setNewTodo('')

                            // Save Todos
                            localStorage.setItem("todos", JSON.stringify(newTodos));
                            ShowHideToast("تمت إضافة المهمة بنجاح");
                        }}
                        variant="contained" style={{ width: "35%", marginRight: "1.5%" }} size='large' disabled={newTodo.length === 0}>
                            إضافة
                        </Button>  
                    </ThemeProvider>
                </CardActions>
            </Card> 
        </Container>
  );
}