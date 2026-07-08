import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      transition={Slide}
    />
  );
};