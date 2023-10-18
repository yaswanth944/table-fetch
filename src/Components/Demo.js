import React, { useState, useEffect } from 'react';
import './table.css';

const Data = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users); // Update state with the users' data
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Profile Pic</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>E-mail</th>
            <th>Username</th> {/* New column: Username */}
            <th>Domain</th> {/* New column: Domain */}
            <th>IP</th> {/* New column: IP */}
            <th>University</th> {/* New column: University */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <img src={user.image} alt={`Profile of ${user.firstName}`} />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.username}</td> {/* New column: Username */}
              <td>{user.domain}</td> {/* New column: Domain */}
              <td>{user.ip}</td> {/* New column: IP */}
              <td>{user.university}</td> {/* New column: University */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
