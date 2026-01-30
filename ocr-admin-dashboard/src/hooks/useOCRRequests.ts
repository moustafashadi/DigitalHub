import { useMemo, useCallback, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import type { OCRRequest, StatusHistoryEntry } from "../types";

const API_URL = `${import.meta.env.VITE_API_URL}/requests`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

//hook for requests list
export function useOCRRequests() {
  const {
    data: requests = [],
    error,
    isLoading,
    mutate,
  } = useSWR<OCRRequest[]>(API_URL, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000, // 1 minute
  });

  const [statusFilter, setStatusFilter] = useState<
    OCRRequest["status"] | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (statusFilter && statusFilter !== "all") {
      result = result.filter((req) => req.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (req) =>
          req.name.toLowerCase().includes(query) ||
          req.id.toLowerCase().includes(query),
      );
    }

    return result;
  }, [requests, statusFilter, searchQuery]);

  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredRequests.slice(start, end);
  }, [filteredRequests, currentPage, pageSize]);

  const updateStatus = useCallback(
    async (id: string, newStatus: OCRRequest["status"], note?: string) => {
      const current = requests.find((req) => req.id === id);
      if (!current) return;

      const historyEntry: StatusHistoryEntry = {
        status: newStatus,
        timestamp: new Date().toISOString(),
        changedBy: "admin",
        note: note || `Status changed to ${newStatus}`,
      };

      const updated: OCRRequest = {
        ...current,
        status: newStatus,
        statusHistory: [...(current.statusHistory || []), historyEntry],
      };

      await axios.put(`${API_URL}/${id}`, updated);
      mutate();
    },
    [requests, mutate],
  );

  return {
    requests: paginatedRequests,
    allrequests: requests,
    loading: isLoading,
    error: error?.message || null,
    statusFilter,
    setStatusFilter: (filter: OCRRequest["status"] | "all") => {
      setStatusFilter(filter);
    },
    searchQuery,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
    },
    currentPage,
    setCurrentPage: (page: number) => setCurrentPage(page),
    totalPages,
    totalItems,
    updateStatus,
    refresh: mutate,
  };
}

//hook for a single request
export function useOCRRequest(id: string | undefined) {
  const { mutate: globalMutate } = useSWRConfig();
  const {
    data: request,
    error,
    isLoading,
    mutate,
  } = useSWR<OCRRequest>(id ? `${API_URL}/${id}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000,
  });

  const updateStatus = useCallback(
    async (newStatus: OCRRequest["status"], note?: string) => {
      if (!request) return;

      const historyEntry: StatusHistoryEntry = {
        status: newStatus,
        timestamp: new Date().toISOString(),
        changedBy: "admin",
        note: note || `Status changed to ${newStatus}`,
      };

      const updated: OCRRequest = {
        ...request,
        status: newStatus,
        statusHistory: [...(request.statusHistory || []), historyEntry],
      };

      await axios.put(`${API_URL}/${id}`, updated);
      mutate(updated); //update the local cache
      globalMutate(API_URL, { revalidate: true }); //refetch the whole list
    },
    [request, id, globalMutate, mutate],
  );

  return {
    request,
    loading: isLoading,
    error: error?.message || null,
    updateStatus,
    refresh: mutate,
  };
}
