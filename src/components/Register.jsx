import React from 'react';
import '../css/App.css';
import Input from './input';

function Register() {
  async function sendDataToPHP() {
    let username = document.getElementById('username').value.trimStart().trim();
    let password = document.getElementById('password').value.trimStart().trim();

    let usernameError = document.getElementById('usernameError');
    let passwordError = document.getElementById('passwordError');

    if (username === '') {
      usernameError.textContent = 'Fill out this field';
    } else {
      usernameError.textContent = '';
    }

    if (password === '') {
      passwordError.textContent = 'Fill out this field';
    } else {
      passwordError.textContent = '';
    }

    try {
      if (username !== '' && password !== '') {
        const data = {
          username,
          password,
        };

        const response = await fetch('http://localhost/regnars/api/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Handle a successful login (e.g., redirect the user)
          console.log(response);
        } else {
          // Handle login errors
          console.error('Login failed');
        }
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error', error);
    }
  }

  return (
    <div className="main">
      Register
      <form className="box">
        <Input
          type="text"
          id="username"
          placeholder="Username"
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
        />
        <button type="button" className="submit" onClick={sendDataToPHP}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
