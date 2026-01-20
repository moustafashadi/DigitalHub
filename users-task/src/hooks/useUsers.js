import { useMemo, useCallback, useState } from "react";
import useSWR from "swr";
import useDebounce from "./useDebounce";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// API URL - json-server running on port 3001
const API_URL = "http://localhost:3001/users";

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
    revalidateOnMount: false, // Don't refetch on component mount if cache exists
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

  // Update a user - sends PUT to server, then revalidates
  const updateUser = useCallback(
    async (id, userData) => {
      // Get current user data to merge with updates
      const currentUser = users.find((u) => u.id === id);
      const updatedUser = { ...currentUser, ...userData };

      // Send PUT request to json-server
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      // Revalidate - fetch fresh data from server
      mutate();
    },
    [mutate, users],
  );

  // Delete a user - sends DELETE to server, then revalidates
  const deleteUser = useCallback(
    async (id) => {
      // Send DELETE request to json-server
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      // Revalidate - fetch fresh data from server
      mutate();
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
