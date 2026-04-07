// Icon
import CheckIcon from '@mui/icons-material/Check';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Typography } from '@mui/material';

// Hooks
import { useContext , useState } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { ModalContext, UpdateModalContext } from '../Context/ModalContext';
import { useSnackBar } from '../Context/SnackBarContext';

// Components
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';


export default function Todo({complated}) {
    // Todos Context
    const myTodos = useContext(TodosContext);
    const todos = myTodos.todos;
    const setTodos = myTodos.setTodos;

    // Modal Context
    const delModal = useContext(ModalContext);
    const open = delModal.open;
    const setOpen = delModal.setOpen;

    const updateModal = useContext(UpdateModalContext)
    const openUpdate = updateModal.open;
    const setOpenUpdate = updateModal.setOpen; 

    // SnackBar Context
    const { ShowHideToast } = useSnackBar();

    // Selected ID
    const [ selectId, setSelectId ] = useState(null);

    // Handle Open Modal
    const handleOpen = () => setOpen(true);

    const handleOpenUpdate = () => setOpenUpdate(true);

    // Filter Todos To (Complated , Non-Complated , All)
    let filteredTodos = todos;

    if (complated === "true") {
        filteredTodos = todos.filter(todo => todo.isComplate === true);
    } else if (complated === "false") {
        filteredTodos = todos.filter(todo => todo.isComplate === false);
    }

    const todosJsx = filteredTodos.map((todo) => {
        return (
            <div key={todo.id} className='todoCard' style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#0707cdff",
                color: "#e9e9e9",
                padding: "10px",
                margin: "7px 0",
                }}>
                
                {/* Right Side */}
                <div>
                    {/* Title */}
                    <Typography style={{margin: "0" , fontWeight: "normal" , fontSize: "large" , textDecoration: todo.isComplate ? "line-through" : "none"}}>
                        {todo.title}
                    </Typography> 

                    {/* Details */}
                    <Typography  style={{fontWeight: "normal" , fontSize: "small"}}>
                        {todo.details}
                    </Typography>
                </div>
                
                {/* Left Side */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%" }}>
                    {/* Check isComplated Todo */}
                    <div className='icon'
                        style={{ borderColor: "green" , backgroundColor: todo.isComplate ? "green" : "white" }} onClick={() => {
                        const updatedTodos = todos.map((newTodo) => {
                            if (newTodo.id === todo.id) {
                                return { ...newTodo, isComplate: !newTodo.isComplate };
                            } else {
                                return newTodo;
                            }
                        });

                        setTodos(updatedTodos);
                        localStorage.setItem("todos", JSON.stringify(updatedTodos));
                        ShowHideToast(!todo.isComplate ? "تم إنجاز المهمة بنجاح" : "تم إلغاء إنجاز المهمة")  
                    }}>
                        <CheckIcon style={{color: todo.isComplate ? "white" : "green" }} />
                    </div>
                    
                    {/* To Edit Todo */}
                    <div className='icon' style={{ borderColor: "blue" }}
                        onClick={() => {
                            handleOpenUpdate();
                            setSelectId(todo.id);
                            ShowHideToast("تم التعديل بنجاح")
                        }}>
                        <EditRoundedIcon style={{color: "blue"}}/>
                    </div>

                    {/* To Delete Todo */}
                    <div className='icon' style={{ borderColor: "red" }}
                        onClick={() => {
                            handleOpen();
                            setSelectId(todo.id);
                        }}>
                        <DeleteOutlineRoundedIcon style={{color: "red"}}/>  
                    </div>
                </div>
            </div>
        )
        
    })
    
    return (
        <>
            {/* Todos */}
            {todosJsx}

            {/* Delete Modal */}
            {open === true ? <DeleteModal id={selectId} /> : ""}

            {/* Update Modal */}
            {openUpdate === true ? <UpdateModal id={selectId} /> : ""}
        </>
    );
}
