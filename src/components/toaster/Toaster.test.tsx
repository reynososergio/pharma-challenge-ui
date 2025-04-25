import { render, screen, waitFor } from "@testing-library/react";
import { showToast, Toaster } from "@/components/toaster/Toaster";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    default: jest.fn(),
    promise: jest.fn(),
  },
}));

describe("Toaster", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ToastContainer", () => {
    render(<Toaster />);
    expect(screen.getByLabelText("Notifications Alt+T")).toBeInTheDocument();
  });

  it("calls toast.success when showToast is called with type 'success'", () => {
    showToast({ type: "success", message: "Success message" });
    expect(toast.success).toHaveBeenCalledWith(
      "Success message",
      expect.any(Object)
    );
  });

  it("calls toast.error when showToast is called with type 'error'", () => {
    showToast({ type: "error", message: "Error message" });
    expect(toast.error).toHaveBeenCalledWith(
      "Error message",
      expect.any(Object)
    );
  });

  it("calls toast.info when showToast is called with type 'info'", () => {
    showToast({ type: "info", message: "Info message" });
    expect(toast.info).toHaveBeenCalledWith("Info message", expect.any(Object));
  });

  it("calls toast.warning when showToast is called with type 'warning'", () => {
    showToast({ type: "warning", message: "Warning message" });
    expect(toast.warning).toHaveBeenCalledWith(
      "Warning message",
      expect.any(Object)
    );
  });

  it("calls toast.promise when a promise is passed", async () => {
    const promise = Promise.resolve();
    showToast({ type: "info", promise });

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledWith(
        promise,
        {
          pending: "Processing...",
          success: "Success!",
          error: "An error occurred",
        },
        expect.any(Object)
      );
    });
  });
});
