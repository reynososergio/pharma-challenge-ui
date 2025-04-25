import {
  ToastContainer,
  toast,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToasterProps } from "@/types/toaster";

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const theme = prefersDarkMode ? "dark" : "light";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme,
  transition: Bounce,
};

const toastTypes: Record<
  TypeOptions,
  (msg: string, opts?: ToastOptions) => void
> = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warning: toast.warning,
  default: toast,
};

export const showToast = ({
  type = "info",
  message,
  promise,
}: ToasterProps) => {
  if (promise) {
    toast.promise(
      promise,
      {
        pending: "Processing...",
        success: "Success!",
        error: "An error occurred",
      },
      options
    );
  } else if (message) {
    toastTypes[type](message, options);
  }
};

export const Toaster = () => <ToastContainer />;
