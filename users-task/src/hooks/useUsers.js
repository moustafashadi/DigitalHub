import { useMemo, useCallback, useState } from "react";
import useSWR from "swr";
import useDebounce from "./useDebounce";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/users";

function useUsers() {
  // SWR handles caching, revalidation, and loading states
  const {
    data: users = [],
    error,
    isLoading,
    mutate,
  } = useSWR(API_URL, fetcher, {
    revalidateOnFocus: false, // Don't refetch when window regains focus
    revalidateOnReconnect: false, // Don't refetch on reconnect
    dedupingInterval: 60000, // Dedupe requests within 1 minute
  });

  const [search, setSearch] = useState("");

  // Debounce the search term with 300ms delay
  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    [users, debouncedSearch],
  );

  // Update a user (optimistic update)
  const updateUser = useCallback(
    (id, userData) => {
      mutate(
        (currentUsers) =>
          currentUsers.map((user) =>
            user.id === id ? { ...user, ...userData } : user,
          ),
        { revalidate: false }, // Don't refetch from API after local update
      );
    },
    [mutate],
  );

  // Delete a user (optimistic update)
  const deleteUser = useCallback(
    (id) => {
      mutate((currentUsers) => currentUsers.filter((user) => user.id !== id), {
        revalidate: false,
      });
    },
    [mutate],
  );

  // Force refresh from API
  const refreshFromAPI = useCallback(() => {
    mutate(); // Triggers a revalidation from the API
  }, [mutate]);

  return {
    users: filteredUsers,
    search,
    setSearch,
    loading: isLoading,
    error,
    updateUser,
    deleteUser,
    refreshFromAPI,
  };
}

export default useUsers;
