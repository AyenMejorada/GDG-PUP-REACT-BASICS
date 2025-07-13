import React, { useState, useEffect } from "react";
import "./AssignmentThree.css";

function AssignmentThree() {
  // state to store user data from the API
  const [users, setUsers] = useState([]);

  // state to handle loading status
  const [loading, setLoading] = useState(true);

  // useEffect will run only once when the component mounts
  useEffect(() => {
    // fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // convert the response to JSON
      .then((data) => {
        setUsers(data);       // store the data in state
        setLoading(false);    // set loading to false once data is received
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);    // also stop loading if there's an error
      });
  }, []); // empty array means this runs only once

  return (
    <div className="title-container">
      <h1>User List</h1>
      <p>
        This table displays user data fetched from an external API using
        <code> useEffect</code>. It includes the user's name, email, phone, and company.
      </p>

      {/* show loading message while fetching */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone">{user.phone}</td>
                  <td data-label="Company">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AssignmentThree;
