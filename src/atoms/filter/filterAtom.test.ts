import { renderHook, act } from "@testing-library/react";
import { useAtom } from "jotai";
import { filtersAtom } from "./filterAtom";

describe("filtersAtom", () => {
  test("should initialize with an empty object", () => {
    const { result } = renderHook(() => useAtom(filtersAtom));

    expect(result.current[0]).toEqual({});
  });

  test("should update the status filter correctly", () => {
    const { result } = renderHook(() => {
      const [filters, setFilters] = useAtom(filtersAtom);
      return { filters, setFilters };
    });

    act(() => {
      result.current.setFilters({ status: "completed" });
    });

    expect(result.current.filters).toEqual({ status: "completed" });
  });

  test("should update the date range filter correctly", () => {
    const { result } = renderHook(() => {
      const [filters, setFilters] = useAtom(filtersAtom);
      return { filters, setFilters };
    });

    act(() => {
      result.current.setFilters({
        fromDate: new Date("2025-03-01"),
        toDate: new Date("2025-03-05"),
      });
    });

    expect(result.current.filters).toEqual({
      fromDate: new Date("2025-03-01"),
      toDate: new Date("2025-03-05"),
    });
  });

  test("should update the role filter correctly", () => {
    const { result } = renderHook(() => {
      const [filters, setFilters] = useAtom(filtersAtom);
      return { filters, setFilters };
    });

    act(() => {
      result.current.setFilters({ role: "owner" });
    });

    expect(result.current.filters).toEqual({ role: "owner" });
  });

  test("should toggle the showDeleted filter", () => {
    const { result } = renderHook(() => {
      const [filters, setFilters] = useAtom(filtersAtom);
      return { filters, setFilters };
    });

    act(() => {
      result.current.setFilters({ showDeleted: true });
    });

    expect(result.current.filters).toEqual({ showDeleted: true });

    act(() => {
      result.current.setFilters({ showDeleted: false });
    });

    expect(result.current.filters).toEqual({ showDeleted: false });
  });

  test("should allow multiple filters to be set without overriding previous values", () => {
    const { result } = renderHook(() => {
      const [filters, setFilters] = useAtom(filtersAtom);
      return { filters, setFilters };
    });

    act(() => {
      result.current.setFilters({ role: "collaborator" });
    });

    act(() => {
      result.current.setFilters((prev) => ({
        ...prev,
        status: "in-progress",
        showDeleted: true,
      }));
    });

    expect(result.current.filters).toEqual({
      role: "collaborator",
      status: "in-progress",
      showDeleted: true,
    });
  });
});
