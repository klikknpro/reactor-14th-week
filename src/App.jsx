import React, { useState, useEffect } from "react";
import http from "axios";

function App() {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [todo, setTodo] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [divToShow, setDivToShow] = useState("signup");

  const signup = async() => {
    try {
      await http.post("http://localhost:3001/api/signup", {
      username: nameValue,
      password: passwordValue
      });
      alert ("success");
      setNameValue("");
      setPasswordValue("");
      setDivToShow("login");
    } catch (err) {
      if (!err.response) alert("No No");
      if (err.response.status === 409) alert("User already exists");
      if (err.response.status === 400) alert("Missing input");
    };
  };

  const addTodo = async() => {
    try {
      await http.post("http://localhost:3001/api/todo", {
        todo: todo
      }, {
        headers: {
          Authorization: authUsername + ":::" + authPassword
        }
      });
      alert ("todo added");
      setTodo("");
      setAuthUsername("");
      setAuthPassword("");
    } catch (err) {
      alert("No No");
    };
  };

  const login = async() => {
    try {
      await http.post("http://localhost:3001/api/login", {}, {
        headers: {
          Authorization: authUsername + ":::" + authPassword
        }
      });
      setDivToShow("todos");
      localStorage.setItem("user", authUsername);
      localStorage.setItem("password", authPassword);
    } catch (err) {
      alert("Wrong username or password");
    };
  };

  const signout = async() => {
    setAuthPassword("");
    setAuthUsername("");
    localStorage.removeItem("user", authUsername);
    localStorage.removeItem("password", authPassword);
    setDivToShow("login")
  }

  useEffect(() => {
    const user = localStorage.getItem("user", authUsername);
    const password = localStorage.getItem("password", authPassword);
    if (!user || !password) return;
    setAuthUsername(user);
    setAuthPassword(password);
    setDivToShow("todos");

  })

  return (
    <div className="App">
      {divToShow === "signup" && <div className="signup">
        <h1>Sign up</h1>
        <input type="text" placeholder="username" value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
        <input type="password" placeholder="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}></input>
        <button onClick={signup}>Sign up</button>
        <button onClick={() => setDivToShow("login")}>I already have an account</button>
      </div>}
      {divToShow === "login" && <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="log in username" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)}></input>
        <input type="password" placeholder="log in password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}></input>
        <button onClick={() => setDivToShow("signup")}>I don't have an account</button>
        <button onClick={login}>Log in</button>
      </div>}
      {divToShow === "todos" && <div className="todos">
        <h1>Todos</h1>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button onClick={addTodo} disabled={!todo}>Add todo</button>
        <button onClick={signout}>Sign Out</button>
      </div>}

    </div>
  );
}

export default App;
