import React from 'react';
import '../css/App.css';

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

    let titleError = document.getElementById('titleError');
    let descriptionError = document.getElementById('descriptionError');

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


    // Continue with the rest of your code to send data if all validations pass
    try {
      if (title !== '' && description !== '') {
        const data = {
          title,
          description,
        };

        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');

        const response = await fetch(`http://localhost/regnars/api/postData.php?role=${role}&id=${id}`, {
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
        <div className='inputBox'>
          <input className='input' type="text" id="title" placeholder='Your title'></input>
          <p className='errorMsg' id={"titleError"}></p>
        </div>
        <div className='inputBox'>
          <textarea className='input2'  id="description" placeholder='Write your blog here'></textarea>
          <p className='errorMsg' id={"descriptionError"}></p>
        </div>
        <button type="button" className="submit" onClick={sendDataToPHP}>
          Create your blog
        </button>
      </form>
    </div>
  );
}

export default Add;
