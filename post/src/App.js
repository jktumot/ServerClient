import React, { useState, useEffect } from "react";


function App() {
  const [merchants, setMerchants] = useState(false);

  useEffect(() => {
    getMerchant();
  }, []);

  function getMerchant() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setMerchants(data);
      });
  }

  function createMerchant() {
    let name = prompt("Введите имя");
    let email = prompt("Введите почту");
    let str = JSON.stringify({ name, email });

    fetch("http://localhost:3001/merchants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: str,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }

  function deleteMerchant() {
    let id = prompt("Введите id того, кого удалить");

    fetch(`http://localhost:3001/merchants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }
  let listNames = merchants;

  return (
    <div>
      {listNames}
      <br />
      <button onClick={createMerchant}>Add</button>
      <br />
      <button onClick={deleteMerchant}>Delete</button>
  
    </div>
  );
}

export default App;
