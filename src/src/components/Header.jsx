import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdd = location.pathname === '/add';

  return (
    <div className="header">
      <div className="headerButtons">
        <a className={`headerButton ${isHome ? 'active' : ''}`} href="http://localhost:3000/">
          <div>Home</div>
        </a>
        <a className={`headerButton ${isAdd ? 'active' : ''}`} href="http://localhost:3000/add">
          <div>Add</div>
        </a>
      </div>
      <div className="loginButtonBox">
        <a className="headerButton" href="">
          Login
        </a>
      </div>
    </div>
  );
}

export default Header;
