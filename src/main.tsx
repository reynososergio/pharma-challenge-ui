import { createRoot } from "react-dom/client";
import { Provider } from "jotai";

import AppRoutes from "./routes/routes";
import { Toaster } from "./components/toaster/Toaster";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento #root en el DOM");
}

createRoot(rootElement).render(
  <Provider>
    <AppRoutes />
    <Toaster />
  </Provider>
);
