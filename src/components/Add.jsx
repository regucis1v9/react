import React from 'react';
import '../css/App.css';
import Input from './input';

function Add() {

  const sendDataToPHP = async (formData) => {
    const data = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
    };
  
    try {
      const response = await fetch('http://localhost/regnars/api/postData.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Request was successful
        const result = await response.json();
        console.log(result);
        let title = document.getElementById("title");
        title.value = "";
        let description = document.getElementById("description");
        description.value = "";
        let date = document.getElementById("date");
        date.value = "";
      } else {
        // Handle errors here
        console.error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <div className="main">
      Task creation
      <form className="box">
        <Input type="text" id="title" placeholder="Title"/>
        <Input type="text" id="description" placeholder="Description"/>
        <Input type="date" id="date"/>
        <button type="button" className="submit" onClick={sendDataToPHP}>
          Submit Data
        </button>
      </form>
    </div>
  );
}

export default Add;
