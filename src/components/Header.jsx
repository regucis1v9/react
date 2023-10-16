import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdd = location.pathname === '/add';

  const localRole = localStorage.getItem('role');
  let text = 'Log in'
  let redirect = 'http://localhost:3000/login'
  if(localRole != ''){
    text = 'Log out'
    redirect = 'http://localhost:3000/logout'
  }

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
        <a className="headerButton" href={redirect}>
          {text}
        </a>
      </div>
    </div>
  );
}

export default Header;
