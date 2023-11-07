import React, { useState, useEffect } from "react";

function Deposit() {
  const baseUrl = 'https://jesus-frias-backbankingapplication.onrender.com/api/users/';
  const [depositData, setDepositData] = useState({ Id: '', balance: 0 });
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    // Recuperar el valor inicial de balance del servidor
    const fetchData = async () => {
      if (depositData.Id) {
        try {
          const response = await fetch(`${baseUrl}${depositData.Id}`);
          if (response.ok) {
            const userData = await response.json();
            setDepositData({ ...depositData, balance: userData.balance });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [depositData.Id]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    const url = `https://jesus-frias-backbankingapplication.onrender.com/api/users/${depositData.Id}`;

    if (!depositData.Id) {
      setMessage("Please enter a User ID.");
      return;
    }

    // Realizar una solicitud para obtener el valor actual de balance
    try {
      const response = await fetch(`${baseUrl}${depositData.Id}`);
      if (response.ok) {
        const userData = await response.json();
        // Sumar el depósito al balance actual
        const newBalance = userData.balance + depositData.balance;

        // Realizar una solicitud para actualizar el valor de balance en el servidor
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: newBalance }),
        });

        if (updateResponse.ok) {
          setMessage("Deposit successful.");
          setTimeout(() => setMessage(""), 2000);
        } else {
          setMessage("Failed to deposit. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h3>Make a Deposit</h3>
      <form onSubmit={handleDeposit}>
        <div className="form-group">
          <label htmlFor="Id">User ID:</label>
          <input
            type="text"
            id="Id"
            value={depositData.Id}
            onChange={(e) => setDepositData({ ...depositData, Id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="depositAmount">Deposit Amount:</label>
          <input
            type="number"
            id="depositAmount"
            value={depositData.balance}
            onChange={(e) => setDepositData({ ...depositData, balance: Number(e.target.value) })}
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Deposit;
