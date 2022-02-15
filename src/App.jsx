import React, { useState } from "react";
import http from "axios";

function App() {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const signup = async() => {
    try {
      await http.post("http://localhost:3001/api/signup", {
      username: nameValue,
      password: passwordValue
      });
      alert ("success");
      setNameValue("");
      setPasswordValue("");
    } catch (err) {
      if (!err.response) alert("No No");
      if (err.response.status === 409) alert("User already exists");
      if (err.response.status === 400) alert("Missing input");
    };
  };

  return (
    <div className="App">
      <h1>Sign up</h1>
      <input type="text" placeholder="username" value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
      <input type="password" placeholder="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}></input>
      <button onClick={signup}>Sign up</button>
    </div>
  );
}

export default App;
