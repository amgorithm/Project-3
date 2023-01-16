import React from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div className="navBar-logged-in">
      <Link
        to={`/profile/${user._id}`}
        className="user-name"
        style={{ color: "#BCBCBC" }}
      >
        {user.name}
      </Link>
      {/* 
      <p className="seperate">|</p> */}
      <Link to="/blog/new" style={{ color: "#BCBCBC" }}>
        <h2 className="create-blog">Create</h2>
      </Link>

      {/* <p className="seperate">|</p> */}
      <NavLink
        to=""
        className="navBar-logout"
        onClick={handleLogout}
        style={{ color: "#BCBCBC" }}
      >
        Log out
      </NavLink>
    </div>
  ) : (
    <div className="navbar-logged-out">
      <NavLink
        to="/login"
        className="navBar-login"
        style={{ color: "#BCBCBC" }}
      >
        Log in
      </NavLink>
      <NavLink
        to="/signup"
        className="navBar-signup"
        style={{ color: "#949494" }}
      >
        Sign up
      </NavLink>
    </div>
  );

  return (
    <div className="navBar">
      <Link to="/" style={{ color: "#fa9500" }}>
        <h1 className="blen">Blen </h1>
      </Link>
      {nav}
    </div>
  );
};

export default NavBar;
