import React, { useState } from "react";
import { Button } from "antd";
import LoginForm from "./components/LoginForm/app.jsx";
import RegisterForm from "./components/RegisterForm/app.jsx";
import useLocalStorage from "./components/localStorage/app.jsx";
import "./App.css";

export default function App() {
  const [users, setUsers, error] = useLocalStorage("users");
  const [currentUser, setCurrentUser] = useState(null);
  function addUser(user) {
    setUsers(oldUsers => [...oldUsers, user]);
  }
  return (
    <div className="container">
      <h1>Login / Register</h1>
      <p className="error">{error}</p>
      <LoginForm users={users}onLogin={setCurrentUser}/>
      {currentUser && (
        <div className="info">
          <p>Xin chào, {currentUser.name}!</p>
          <Button onClick={() => setCurrentUser(null)}>
            Đăng xuất
          </Button>
        </div>
      )}
      <hr />
      <RegisterForm users={users}onRegister={addUser}/>
    </div>
  );
}