const CACHE_KEY = "users_cache";

// Check if cache exists

export const hasValidCache = () => {
  const cache = localStorage.getItem(CACHE_KEY);
  return !!cache;
};

// Get users from cache

export const getUsers = () => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    return cache ? JSON.parse(cache) : [];
  } catch (error) {
    console.error("Error reading from cache:", error);
    return [];
  }
};

// Save users to cache

export const setUsers = (users) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error("Error saving to cache:", error);
    return false;
  }
};

// Update a single user in cache
export const updateUser = (id, userData) => {
  try {
    const users = getUsers();
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) return null;

    users[index] = { ...users[index], ...userData };
    setUsers(users);
    return users[index];
  } catch (error) {
    console.error("Error updating user in cache:", error);
    return null;
  }
};

// Delete a user from cache
export const deleteUser = (id) => {
  try {
    const users = getUsers();
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    return true;
  } catch (error) {
    console.error("Error deleting user from cache:", error);
    return false;
  }
};

// Clear the cache

export const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing cache:", error);
    return false;
  }
};

export default {
  hasValidCache,
  getUsers,
  setUsers,
  updateUser,
  deleteUser,
  clearCache,
};
