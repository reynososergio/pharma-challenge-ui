import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { ConfirmationModalProps } from "@/types/modal";

describe("ConfirmationModal", () => {
  const mockOnHide = jest.fn();
  const mockOnConfirm = jest.fn();

  const defaultProps: ConfirmationModalProps = {
    show: true,
    onHide: mockOnHide,
    title: "Delete Item",
    message: "Are you sure you want to delete this item?",
    onConfirm: mockOnConfirm,
  };

  const renderComponent = (props = defaultProps) => {
    return render(<ConfirmationModal {...props} />);
  };

  it("renders correctly with title and message", () => {
    renderComponent();

    expect(screen.getByText("Delete Item")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this item?")
    ).toBeInTheDocument();
  });

  it("calls onHide when clicking Cancel button", () => {
    renderComponent();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when clicking Confirm button", () => {
    renderComponent();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onHide when closing the modal", () => {
    renderComponent();

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(mockOnHide).toHaveBeenCalled();
  });

  it("does not render when show is false", () => {
    renderComponent({ ...defaultProps, show: false });

    expect(screen.queryByText("Delete Item")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Are you sure you want to delete this item?")
    ).not.toBeInTheDocument();
  });
});
