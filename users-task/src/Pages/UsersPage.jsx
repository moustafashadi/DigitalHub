import { useState } from "react";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import useUsers from "../hooks/useUsers";
import UsersList from "../components/UsersList";

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

      <UsersList filteredUsers={filteredUsers} setSelectedUser={setSelectedUser} />

      {selectedUser && (
        <div style={{ marginTop: 20 }}>
          <h3>{selectedUser.name}</h3>
          <p>{selectedUser.email}</p>
          <p>{selectedUser.phone}</p>
        </div>
      )}
    </div>
  );
}
