import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_BACKEND_API || "http://localhost:5000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
    try {
      await axios.post(api, formData);
      console.log("User added successfully");
      setFormData({ name: '', email: '', password: '', phone: '', zipcode: '' });
      // Reset form data after submission   
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${api}/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error("Failed to fetch user for edit:", err);
    }
  }
 

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>
        MongoDB CRUD App
        <button style={{ marginLeft: 20 }} onClick={fetchUsers}>Refresh</button>
      </h2>

      <div style={{ marginTop: 20 }}>
        <table style={{ border: '1px solid black', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black' }}>   <label>User Name:</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /></td>
              <td style={{ border: '1px solid black' }}>
        <label>User Email:</label>
        <input
          type="text"
          placeholder="Enter the Email id"
          name="email"
          value={formData.email}
          onChange={handleChange}
        /></td>
              <td style={{ border: '1px solid black' }}>  <label>User phone:</label>
        <input
          type="text"
          placeholder="Enter the phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        /></td>
                </tr>
            <tr>
              <td style={{ border: '1px solid black' }}>  <label>User Password:</label>
        <input
          type="password"
          placeholder="Enter the Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        /></td>
              <td style={{ border: '1px solid black' }}>
        <label>User ZipCode:</label>
        <input
          type="text"
          placeholder="Enter the ZipCode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        /></td>
            
        <button type="button" onClick={submitData}>Add User</button>
    </tr>
          </tbody>
     </table>
        

      </div>

      <h3 style={{ marginTop: 40 }}>Users List</h3>
      {users.map(u => (
        <div key={u._id} style={{ marginBottom: "25px" }}>
          <table style={{ border: '1px solid black', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black' }}>User Name: {u.name}</td>
                <td style={{ border: '1px solid black' }}>User Email: {u.email}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black' }}>User ID: {u._id}</td>
                <td style={{ border: '1px solid black' }}>User Password: {u.password}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black' }}>User Phone: {u.phone || 'N/A'}</td>
                <td style={{ border: '1px solid black' }}>User ZipCode: {u.zipcode || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => handleEdit(u.id)}>Edit</button>
          <button onClick={() => handleDelete(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
