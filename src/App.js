import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_BACKEND_API;

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(api);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>MongoDB CRUD App</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.email} - {u._id} - {u.password} - {u.zipcode}
            <button>Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
