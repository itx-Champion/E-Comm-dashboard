import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate("/register");
  };
  return (
    <div className="navbar container">
    <div className="main-logo">
    <img src="/download.jpeg" alt="logo"></img>
    <span className="logo">E-Commerce Dashboard</span>
    </div>
    
    {  auth ?
      <ul className="navbar-ul">
        <li><Link to="/">Products</Link></li>{" "}|
        <li> <Link to="/add">Add Products</Link></li>{" "}|
        <li><Link to="/update/:id">Update Products</Link></li>{" "}|
        <li><Link to="/profile">Profile</Link></li>{" "} |
        <li><Link to="/login" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
      :
      <ul className="navbar-ul">
        <li><Link to="/login">Login</Link> </li>{" "}|
        <li><Link to="/register">Signup</Link></li>
      </ul>
    }
    </div>
  );
};

export default Navbar;
