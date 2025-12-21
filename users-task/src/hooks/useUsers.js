import { useMemo } from "react";
import { useEffect, useState } from "react";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredUsers = useMemo (
    () => users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    ),
    [users, search]
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return { users: filteredUsers, search, setSearch, loading };
}

export default useUsers;
