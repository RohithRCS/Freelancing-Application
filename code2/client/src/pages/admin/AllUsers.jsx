import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/allUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:6001/fetch-users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="all-users-page">
      <h3 className="page-title">All Users</h3>
      <input
        type="text"
        placeholder="Search by username or email"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="all-users">
          {filterUsers.map((user) => (
            <div className="user" key={user._id}>
              <div className="user-header">
                <div className="username">{user.username}</div>
                <div className="role">{user.usertype}</div>
              </div>
              <div className="user-info">
                <span><b>User Id:</b> {user._id}</span>
                <span><b>Email:</b> {user.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
