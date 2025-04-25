import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "@/components/sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Sidebar", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

  it("renders sidebar toggle button", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens the sidebar when clicking the toggle button", () => {
    renderComponent();
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);

    expect(screen.getByText("Pharma Challenge")).toBeInTheDocument();
  });

  it("closes the sidebar when clicking the close button", async () => {
    renderComponent();
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Pharma Challenge")).not.toBeInTheDocument();
    });
  });

  it("contains navigation links", () => {
    renderComponent();
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /log out/i })).toBeInTheDocument();
  });
});
