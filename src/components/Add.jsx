import React from 'react';
import '../css/App.css';
import Input from './input';
// import { handleFormData } from '../functions/sendTask';
// import { sendError } from '../functions/sendError';

function Add() {

  const sendDataToPHP = async (formData) => {
    const data = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
    };
  
    try {
      const response = await fetch('http://localhost/api/postData.php', {
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
      } else {
        // Handle errors here
        console.error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // const handleSubmit = () => {

    // const formData = {
    //   title: document.getElementById('title').value,
    //   description: document.getElementById('description').value,
    //   date: document.getElementById('date').value,
        
    // };
  //   if(formData.title != "" && formData.description != "" && formData.date != ""){
  //     handleFormData(formData);
  //   }else{
  //     sendError(formData);
  //   }
  // };

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
