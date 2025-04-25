import { useState, useEffect, useTransition } from "react";
import { cleanObject } from "@/utils/cleanObject";

interface UsePaginatedQueryProps<TData, TFilters> {
  filters: TFilters;
  fetchFn: (params: Record<string, unknown>) => Promise<{
    data: {
      content: TData[];
      totalPages: number;
    };
  }>;
  pageSize?: number;
}

export const usePaginatedQuery = <TData, TFilters>({
  filters,
  fetchFn,
  pageSize = 10,
}: UsePaginatedQueryProps<TData, TFilters>) => {
  const [data, setData] = useState<TData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    setError(null);
    setData([]);

    const params = {
      ...filters,
      pageSize,
      page: currentPage,
    };

    const cleanParams = cleanObject(params as Record<string, unknown>);

    try {
      const response = await fetchFn(cleanParams);
      startTransition(() => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
      });
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage]);

  return {
    data,
    totalPages,
    currentPage,
    setCurrentPage,
    isPending,
    error,
  };
};
