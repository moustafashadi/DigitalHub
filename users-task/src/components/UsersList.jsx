function UsersList({ filteredUsers, setSelectedUser }) {
  return (
    <ul>
      {filteredUsers.map((user) => (
        <li
          key={user.id}
          onClick={() => setSelectedUser(user)}
          style={{ cursor: "pointer" }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
