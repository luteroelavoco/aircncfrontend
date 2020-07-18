import React from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import logo from "./assets/logo.svg";
import Routes from "./routes";

function App() {


  return (
    <div className="container">
      <Link to="/">
        <img className="logo" src={logo} alt="logo aircnc" />
      </Link>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
