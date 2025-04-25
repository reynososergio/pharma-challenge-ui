/**
 * handleApiError.ts
 *
 * Utility function to handle errors in API calls consistently across the app.
 * It extracts the most informative error message available and shows it in a toast.
 *
 * @param error - The error caught from a try/catch block, usually from an Axios request.
 * @param defaultMessage - A fallback message to display if no specific error message is found.
 *
 * @example
 * try {
 *   const response = await apiCall();
 * } catch (error) {
 *   handleApiError(error, "Failed to fetch data");
 * }
 */

import { showToast } from "@/components/toaster/Toaster";
import axios, { AxiosError } from "axios";

export const handleApiError = (error: unknown, defaultMessage: string) => {
  let errorMessage = defaultMessage;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response?.data?.message) {
      errorMessage = axiosError.response.data.message;
    }
  }

  showToast({
    type: "error",
    message: errorMessage,
  });
};
