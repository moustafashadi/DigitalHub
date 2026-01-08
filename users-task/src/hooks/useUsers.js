import { useMemo, useCallback } from "react";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import * as cacheService from "../services/userCacheService";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce the search term with 300ms delay
  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      ),
    [users, debouncedSearch]
  );

  // Fetch users from API
  const fetchFromAPI = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      cacheService.setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users - from cache if available, otherwise from API
  useEffect(() => {
    if (cacheService.hasValidCache()) {
      // Load from cache (instant)
      const cachedUsers = cacheService.getUsers();
      setUsers(cachedUsers);
    } else {
      // Fetch from API and cache
      fetchFromAPI();
    }
  }, [fetchFromAPI]);

  // Update a user (both in state and cache)
  const updateUser = useCallback((id, userData) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      );
      cacheService.setUsers(updatedUsers);
      return updatedUsers;
    });
  }, []);

  // Delete a user (both from state and cache)
  const deleteUser = useCallback((id) => {
    setUsers((prevUsers) => {
      const filteredUsers = prevUsers.filter((user) => user.id !== id);
      cacheService.setUsers(filteredUsers);
      return filteredUsers;
    });
  }, []);

  // Force refresh from API (clears cache and re-fetches)
  const refreshFromAPI = useCallback(() => {
    cacheService.clearCache();
    fetchFromAPI();
  }, [fetchFromAPI]);

  // Clear cache
  const clearCache = useCallback(() => {
    cacheService.clearCache();
    setUsers([]);
  }, []);

  return {
    users: filteredUsers,
    allUsers: users,
    search,
    setSearch,
    loading,
    updateUser,
    deleteUser,
    refreshFromAPI,
    clearCache,
  };
}

export default useUsers;
