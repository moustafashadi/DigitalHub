import { useState } from "react";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import useUsers from "../hooks/useUsers";
import UsersList from "../components/UsersList";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const { users: filteredUsers, search, setSearch, loading } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <div>
        <Title />
      </div>

      <div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {loading && <p>Loading...</p>}

      <UsersList
        filteredUsers={filteredUsers}
        setSelectedUser={setSelectedUser}
      />

      <UserCard selectedUser={selectedUser} />
    </div>
  );
}
