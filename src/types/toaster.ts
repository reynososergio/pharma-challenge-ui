import { TypeOptions } from "react-toastify";

export interface ToasterProps {
  type?: TypeOptions;
  message?: string;
  promise?: Promise<unknown>;
}
