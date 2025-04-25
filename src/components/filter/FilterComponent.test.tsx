import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { createStore } from "jotai";
import FilterComponent from "@/components/filter/FilterComponent";
import { filtersAtom } from "@/atoms/filter/filterAtom";
import { FilterConfig } from "@/types/filter";

describe("FilterComponent", () => {
  const mockOnFilterChange = jest.fn();

  const mockFiltersConfig: FilterConfig[] = [
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All" },
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
      ],
    },
    {
      name: { from: "fromDate", to: "toDate" },
      label: "Date Range",
      type: "date-range",
    },
    {
      name: "role",
      label: "My Role",
      type: "select",
      options: [
        { value: "", label: "All" },
        { value: "owner", label: "Owner" },
        { value: "collaborator", label: "Collaborator" },
      ],
    },
    {
      name: "showDeleted",
      label: "Include deleted",
      type: "checkbox",
    },
  ];

  const renderComponent = () => {
    const store = createStore();
    store.set(filtersAtom, {});

    return render(
      <Provider store={store}>
        <FilterComponent
          filtersConfig={mockFiltersConfig}
          onFilterChange={mockOnFilterChange}
        />
      </Provider>
    );
  };

  it("renders correctly with all filters", () => {
    renderComponent();

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("My Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Include deleted")).toBeInTheDocument();
  });

  it("calls onFilterChange when input values change", async () => {
    renderComponent();

    const statusSelect = screen.getByLabelText("Status");
    await userEvent.selectOptions(statusSelect, "closed");
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ status: "closed" })
    );

    const roleSelect = screen.getByLabelText("My Role");
    await userEvent.selectOptions(roleSelect, "owner");
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ role: "owner" })
    );

    const checkbox = screen.getByLabelText("Include deleted");
    await userEvent.click(checkbox);
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ showDeleted: true })
    );
  });

  it("clears filters when clicking 'Clear'", async () => {
    renderComponent();

    const checkbox = screen.getByLabelText("Include deleted");
    await userEvent.click(checkbox);

    const clearButton = await screen.findByTestId("clear-filters");

    await userEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: "",
      fromDate: "",
      toDate: "",
      role: "",
      showDeleted: "",
    });
  });

  it("toggles filter visibility", async () => {
    renderComponent();

    const toggleButton = screen.getByTestId("toggle-filters");
    const filterBody = screen.getByTestId("filter-body");

    await userEvent.click(toggleButton);
    await waitFor(() => expect(filterBody).toHaveClass("collapse"));

    await userEvent.click(toggleButton);
    await waitFor(() => expect(filterBody).toHaveClass("show"));
  });
});
