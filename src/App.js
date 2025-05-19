import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = process.env.REACT_APP_BACKEND_API || "http://localhost:5000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    zipcode: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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
      if (isEditing) {
        await axios.put(`${api}/${editId}`, formData);
      } else {
        await axios.post(api, formData);
      }

      setFormData({ name: '', email: '', password: '', phone: '', zipcode: '' });
      setIsEditing(false);
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${api}/${id}`);
      setFormData(res.data);
      setIsEditing(true);
      setEditId(id);
    } catch (err) {
      console.error("Failed to fetch user for edit:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>MongoDB CRUD App</h2>
        <button className="btn btn-secondary" onClick={fetchUsers}>Refresh</button>
      </div>

      <form className="row g-3 mb-5">
        <div className="col-md-4">
          <label className="form-label">User Name</label>
          <input type="text" className="form-control" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">User Email</label>
          <input type="email" className="form-control" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">User Phone</label>
          <input type="text" className="form-control" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">ZipCode</label>
          <input type="text" className="form-control" placeholder="Enter ZipCode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button type="button" className="btn btn-primary w-100" onClick={submitData}>
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>

      <h3>Users List</h3>
      {users.map(u => (
        <div key={u._id} className="card mb-3">
          <div className="card-body">
            <p className="card-title"><strong>Name:</strong>{u.name}</p>
            <p className="card-text"><strong>Email:</strong> {u.email}</p>
            <p className="card-text"><strong>ID:</strong> {u._id}</p>
<p className="card-text"> 
  <strong>Password:</strong> {'*'.repeat(u.password.length)}
</p>  <p className="card-text"> 
  <strong>Phone:</strong> {u.phone ? `${'*'.repeat(u.phone.length - 4)}${u.phone.slice(-4)}` : 'N/A'}
</p>
 
            <p className="card-text"><strong>ZipCode:</strong> {u.zipcode || 'N/A'}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(u._id)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
