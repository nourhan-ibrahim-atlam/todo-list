import { createContext , useState , useContext } from "react";
import MySnackBar from '../Components/MySnackBar';

const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children  }) => {
    // SnackBar
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    
    const ShowHideToast = (message) => {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
        setOpen(false)
        }, 2000)
    };

    return (
        <SnackBarContext.Provider value={{ ShowHideToast }}>
            {/* SnackBar */}
            <MySnackBar open={open} message={ message } />
            {children }
        </SnackBarContext.Provider>
    );
};

export const useSnackBar = () => {
    return useContext(SnackBarContext)
}