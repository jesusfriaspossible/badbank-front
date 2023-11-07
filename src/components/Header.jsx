import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> BadBank React
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/account">Create Account</NavLink>
        <NavLink to="/closeaccount">Close Account</NavLink>
        <NavLink to="/deposit">Deposit</NavLink>
        <NavLink to="/withdraw">Withdraw</NavLink>
        <NavLink to="/alldata">All Data</NavLink>
      </nav>
    </header>
  );
}

export default Header;
