import React, { useState, useEffect } from "react";

function Withdraw() {
  const baseUrl = 'https://jesus-frias-backbankingapplication.onrender.com/api/users/';
  const [withdrawData, setWithdrawData] = useState({ Id: '', balance: 0 });
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    // Recuperar el valor inicial de balance del servidor
    const fetchData = async () => {
      if (withdrawData.Id) {
        try {
          const response = await fetch(`${baseUrl}${withdrawData.Id}`);
          if (response.ok) {
            const userData = await response.json();
            setWithdrawData({ ...withdrawData, balance: userData.balance });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [withdrawData.Id]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const url = `https://jesus-frias-backbankingapplication.onrender.com/api/users/${withdrawData.Id}`;

    if (!withdrawData.Id) {
      setMessage("Please enter a User ID.");
      return;
    }

    // Realizar una solicitud para obtener el valor actual de balance
    try {
      const response = await fetch(`${baseUrl}${withdrawData.Id}`);
      if (response.ok) {
        const userData = await response.json();
        // Restar el retiro al balance actual
        const newBalance = userData.balance - withdrawData.balance;

        if (newBalance < 0) {
          setMessage("Insufficient balance for withdrawal.");
          return;
        }

        // Realizar una solicitud para actualizar el valor de balance en el servidor
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: newBalance }),
        });

        if (updateResponse.ok) {
          setMessage("Withdrawal successful.");
          setTimeout(() => setMessage(""), 2000);
        } else {
          setMessage("Failed to withdraw. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h3>Make a Withdrawal</h3>
      <form onSubmit={handleWithdraw}>
        <div className="form-group">
          <label htmlFor="Id">User ID:</label>
          <input
            type="text"
            id="Id"
            value={withdrawData.Id}
            onChange={(e) => setWithdrawData({ ...withdrawData, Id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="withdrawAmount">Withdrawal Amount:</label>
          <input
            type="number"
            id="withdrawAmount"
            value={withdrawData.balance}
            onChange={(e) => setWithdrawData({ ...withdrawData, balance: Number(e.target.value) })}
          />
        </div>
        <button type="submit">Withdraw</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Withdraw;
