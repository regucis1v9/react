import React from 'react';
import '../css/App.css';
import Input from './input';

function Add() {

  const sendDataToPHP = async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dateInput = document.getElementById('date').value;

    let titleError = document.getElementById('titleError');
    let descriptionError = document.getElementById('descriptionError');
    let dateError = document.getElementById('dateError');

    // Check if title is empty
    if (title !== '') {
      titleError.textContent = '';
    } else {
      titleError.textContent = 'Fill out this field';
    }

    // Check if description is empty
    if (description !== '') {
      descriptionError.textContent = '';
    } else {
      descriptionError.textContent = 'Fill out this field';
    }

    // Check if date is empty
    if (dateInput !== '') {
      const today = new Date();
      const inputDate = new Date(dateInput);

      if (inputDate >= today) {
        dateError.textContent = '';
      } else {
        dateError.textContent = 'Date must be greater than or equal to today';
        console.log(today);
        console.log(inputDate);
        return; // Stop further processing if the date is invalid
      }
    } else {
      dateError.textContent = 'Fill out this field';
      return; // Stop further processing if the date is empty
    }

    // Continue with the rest of your code to send data if all validations pass
    try {
      const data = {
        title,
        description,
        date: dateInput,
      };

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
        let title = document.getElementById('title');
        title.value = '';
        let description = document.getElementById('description');
        description.value = '';
        let date = document.getElementById('date');
        date.value = '';
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
