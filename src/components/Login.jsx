import React, { useState, useEffect } from 'react';
import '../css/App.css';
import setInfo from './userInfo';

function Login() {
  
  
  async function closeAlert(){
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('none');
    const alert = document.getElementById('alert');
    alert.classList.toggle('none');
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  async function sendDataToPHP() {
    // Function to check for HTML-like tags
    const containsHTMLTags = (text) => /<.*>/g.test(text);

    // Check if the username is empty or contains HTML tags
    if (username.trim() === '') {
      setUsernameError('Fill out this field');
    } else if (containsHTMLTags(username)) {
      setUsernameError('Username cannot contain HTML tags');
      setUsername(''); // Clear the input field
    } else {
      setUsernameError('');
    }

    // You can similarly handle the password field
    if (password.trim() === '') {
      setPasswordError('Fill out this field');
    } else if (containsHTMLTags(password)) {
      setPasswordError('Password cannot contain HTML tags');
      setPassword(''); // Clear the input field
    } else {
      setPasswordError('');
    }

    try {
      const data = {
        username: username,
        password: password,
      };

      const response = await fetch('http://localhost/regnars/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle a successful response here
        const responseData = await response.json(); 
        
        const message = document.getElementById('message')
        message.textContent = responseData['message'];
        
        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('none');
        const alert = document.getElementById('alert');
        alert.classList.toggle('none');

        const { id, role } = responseData.user;
        setInfo(role, id)
        
        const storedRole = localStorage.getItem('role');
        const storedId = localStorage.getItem('id');

        console.log('Role from localStorage:', storedRole);
        console.log('ID from localStorage:', storedId);

        let description = document.getElementById('username');
        description.value = '';
        let date = document.getElementById('password');
        date.value = '';
      } else {
        // Handle errors here
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="main">
      <div className="overlay none" id="overlay"></div>
      <div className="success none" id="alert">
        <div className="successText" id="message">There was an error loggin in</div>
        <button className='closeButton' onClick={closeAlert}>OK</button>
      </div>
      LOGIN
      <form className="box">
        <div className='inputBox'>
          <input
            className='input'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <p className='errorMsg' id="usernameError">{usernameError}</p>
        </div>
        <div className='inputBox'>
          <input
            className='input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p className='errorMsg' id="passwordError">{passwordError}</p>
        </div>
        <button type="button" className="submit" onClick={sendDataToPHP}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
