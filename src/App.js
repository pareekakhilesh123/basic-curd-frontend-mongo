import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config(); 

const api = process.env.BACKEND_API ;s

function App() {
  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    const res = await axios.get(api);
    setUsers(res.data);
  };

 

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>MongoDB CRUD App</h2>
 

      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.email} - {u._id}  {u.password}  {u.zipcode}
            <button >Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;