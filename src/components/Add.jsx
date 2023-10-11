import React from 'react';
import '../css/App.css';
import Input from './input';

function Add() {

  async function closeAlert(){
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('none');
    const alert = document.getElementById('alert');
    alert.classList.toggle('none');
  }
  const sendDataToPHP = async () => {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dateInput = document.getElementById('date').value;

    let titleError = document.getElementById('titleError');
    let descriptionError = document.getElementById('descriptionError');
    let dateError = document.getElementById('dateError');

    // Function to check for HTML-like tags
    const containsHTMLTags = (text) => /<.*>/g.test(text);

    // Check if title is empty or contains HTML tags
    if (title.trim() === '') {
      titleError.textContent = 'Fill out this field';
    } else if (containsHTMLTags(title)) {
      titleError.textContent = 'Title cannot contain HTML tags';
      title = ""
    } else {
      titleError.textContent = '';
    }

    // Check if description is empty or contains HTML tags
    if (description.trim() === '') {
      descriptionError.textContent = 'Fill out this field';
    } else if (containsHTMLTags(description)) {
      descriptionError.textContent = 'Description cannot contain HTML tags';
      description = ""
    } else {
      descriptionError.textContent = '';
    }

    // Check if date is empty
    if (dateInput !== '') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)
      
      const inputDate = new Date(dateInput);
      inputDate.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)

      if (inputDate >= today) {
        dateError.textContent = '';
      } else {
        dateError.textContent = 'Date must be greater than or equal to today';
        return; // Stop further processing if the date is invalid
      }
    } else {
      dateError.textContent = 'Fill out this field';
      return; // Stop further processing if the date is empty
    }

    // Continue with the rest of your code to send data if all validations pass
    try {
      if (title !== '' && description !== '' && dateInput !== '') {
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
          const overlay = document.getElementById('overlay');
          overlay.classList.toggle('none');
          const alert = document.getElementById('alert');
          alert.classList.toggle('none');
        } else {
          // Handle errors here
          console.error('Request failed');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
};


  return (
    <div className="main">
      <div className="overlay none" id="overlay"></div>
      <div className="success none" id="alert">
        <div className="successText">Task created successfuly</div>
        <button className='closeButton' onClick={closeAlert}>CLOSE</button>
      </div>
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
