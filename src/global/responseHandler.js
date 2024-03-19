import { Bounce, toast } from "react-toastify";

export const successHandler = (response) => {
    toast.success(response, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        transition: Bounce,
    });
}

export const errorHandler = (response) => {
    toast.error(response, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        transition: Bounce,
    });
}