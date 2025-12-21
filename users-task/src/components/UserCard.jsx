function UserCard({ selectedUser }) {
  return (
    <div>
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

export default UserCard;
