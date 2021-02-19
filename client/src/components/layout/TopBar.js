import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" id='sign-in-button'>Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button" id='btn-sign'>
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  let userCheck
  if (user) {
    userCheck = user.id
  } else {
    userCheck = ''
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <img className='top-bar-img' src="https://i.imgur.com/TfvQM2t.png" />
          <li className="menu-text">myMapp</li>
          <li>
            <Link id='sign-in-button' to="/my-map">Home</Link>
          </li>
          <li>
            <Link id='sign-in-button' to={`/my-map/${userCheck}`}>myMap</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
