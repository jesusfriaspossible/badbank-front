import React from 'react'
import Users from '../../components/Users'

const users = [
    { name: 'Jesús Frías', email: 'jesusfriasmx@hotmail.com', password: '123456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password2' },
    // Add more user data as needed
  ];
  
function AllData() {
  return (
    <div>
      <h2>All Data</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <Users/>
        </div>
      </div>
    </div>
  );
}

export default AllData