// Modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// UseContext Hook
import { ModalContext } from '../Context/ModalContext';
import { useContext } from 'react';

import { TodosContext } from '../Context/TodosContext';

import { useSnackBar } from '../Context/SnackBarContext';

// Style For Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({id}) {
  // Todos Context
  const myTodos = useContext(TodosContext);
  const todos = myTodos.todos;
  const setTodos = myTodos.setTodos;

  // Modal Context
  const delModal = useContext(ModalContext);
  const open = delModal.open;
  const setOpen = delModal.setOpen;
  const handleClose = () => setOpen(false);

  // SnackBar Context
  const { ShowHideToast } = useSnackBar();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, textAlign: "right" }}>
          {/* Title */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            هل انت متأكد من حذف هذه المهمة؟
          </Typography>

          {/* For Action */}
          <Typography id="modal-modal-description"
            sx={{ mt: 2, display: "flex", alignItems: "center", gap: "5px" }}>
                {/* To Delete */}
                <Button variant="contained" color='error' startIcon={<DeleteIcon />} 
                  onClick={() => {
                    const updatedTodos = todos.filter(myTodo => myTodo.id !== id );
                    setTodos(updatedTodos);
                    localStorage.setItem("todos" , JSON.stringify(updatedTodos));
                    handleClose();
                    ShowHideToast("تم حذف المهمة بنجاح");
                  }}>
                    حذف
                </Button>
                      
                {/* Don't Delete */}
                <Button variant="outlined" color='error' endIcon={<KeyboardArrowRightIcon />}
                  onClick={() => {
                    handleClose()
                  }}>
                    تراجع
                </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}