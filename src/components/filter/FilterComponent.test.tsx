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
      name: "namePrefix",
      label: "Commercial Name",
      type: "text",
    },
    {
      name: "typeId",
      label: "Types",
      type: "select",
      options: [
        { value: "", label: "All" },
        { value: "type1", label: "Type 1" },
        { value: "type2", label: "Type 2" },
      ],
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with all filters", () => {
    renderComponent();

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByLabelText("Commercial Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Types")).toBeInTheDocument();
  });

  it("calls onFilterChange when input values change", async () => {
    renderComponent();

    const textInput = screen.getByLabelText("Commercial Name");
    await userEvent.type(textInput, "Aspirin");
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });

    const selectInput = screen.getByLabelText("Types");
    await userEvent.selectOptions(selectInput, "type1");
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ typeId: "type1" })
      );
    });
  });

  it("clears filters when clicking 'Clear'", async () => {
    renderComponent();

    const textInput = screen.getByLabelText("Commercial Name");
    await userEvent.type(textInput, "Test"); // Simulamos que el usuario escribe algo

    const clearButton = await screen.findByTestId("clear-filters");

    await userEvent.click(clearButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          namePrefix: "",
          typeId: "",
        })
      );
    });
  });

  it("toggles filter visibility", async () => {
    renderComponent();

    const toggleButton = screen.getByTestId("toggle-filters");
    const filterBody = screen.getByTestId("filter-body");

    expect(filterBody.classList.contains("show")).toBe(true);

    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(filterBody.classList.contains("show")).toBe(false);
    });

    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(filterBody.classList.contains("show")).toBe(true);
    });
  });
});
