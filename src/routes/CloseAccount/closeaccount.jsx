import React, { useState, useEffect } from "react";

function CloseAccount() {
  const baseUrl = 'https://jesus-frias-backbankingapplication.onrender.com/api/users/';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${baseUrl}${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove the deleted user from the data
      const updatedData = data.filter((user) => user._id !== id);
      setData(updatedData);
    } catch (error) {
      setError("Error deleting user. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.balance}</td>
                <td>
                  <button
                    onClick={() => deleteUser(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CloseAccount;
