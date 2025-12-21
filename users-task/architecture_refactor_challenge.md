# Architecture + Performance + Refactoring Challenge
## Split Feature + Extract Logic

### 🎯 Goal
Refactor an existing Users page to improve architecture, performance, and maintainability.

---

## Scenario
You have a Users Management page that works but is badly structured:
- UI and logic mixed
- Multiple responsibilities in one file
- Unnecessary re-renders
- Hard to scale

Your job is NOT to add new features.
Your job is to **rebuild it properly**.

---

## Initial Code (Before Refactor)

### UsersPage.jsx
```jsx
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <input
        placeholder="Search users"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {filteredUsers.map(user => (
          <li
            key={user.id}
            onClick={() => setSelectedUser(user)}
            style={{ cursor: "pointer" }}
          >
            {user.name}
          </li>
        ))}
      </ul>

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
```

---

## Required Tasks
1. Split feature into smaller components.
2. Extract data & logic into a custom hook `useUsers`.
3. Improve performance (memoization, callbacks).
4. Separate UI from business logic.
5. Add documentation explaining decisions.

---

## Deliverables
- Refactored code
- Folder structure
- Custom hook
- `REFACTOR_NOTES.md`

---

## Success Criteria
- Clean architecture
- Minimal re-renders
- Clear reasoning
- Scalable structure
