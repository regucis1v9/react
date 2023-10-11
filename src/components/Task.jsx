import React, { useState, useEffect } from 'react';

function Task() {

  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  const descriptionError = document.getElementById('descriptionError')
  const dateError = document.getElementById('dateError')
  const containsHTMLTags = (text) => /<.*>/g.test(text);


  let [task, setTask] = useState({
    description: '',
    dueDate: '',
    status: 'no', // Default status
  });

  useEffect(() => {
    fetch(`http://localhost/regnars/api/getByID.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        let taskData = data[0] || {}; // Ensure we have valid data
        setTask({
          title: taskData.title || '',
          description: taskData.description || '',
          dueDate: taskData.due_date || '',
          status: taskData.status || 'no',
        });
        console.log(taskData)
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        // Redirect to localhost:3000 in case of an error
        window.location.href = 'http://localhost:3000/';
      });
  }, [id]);

  async function deleteTask() {
    try {
      const response = await fetch(`http://localhost/regnars/api/deleteTask.php?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

      if (response.ok) {
        window.location.href = 'http://localhost:3000/';
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  async function closeAlert(){
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('none');
    const alert = document.getElementById('alert');
    alert.classList.toggle('none');
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const sendDataToPHP = async () => {

    if (task.description.trim() === '') {
      descriptionError.textContent = 'Fill out this field';
      task.description = task.description.trim().trimStart()
    } else if (containsHTMLTags(task.description)) {
      descriptionError.textContent = 'Description cannot contain HTML tags';
      task.description = ""
    } else {
      descriptionError.textContent = '';
      task.description = task.description.trim().trimStart()
    }

    if (task.dueDate !== '') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)
      
      const inputDate = new Date(task.dueDate);
      inputDate.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)

      if (inputDate >= today) {
        dateError.textContent = '';
      } else {
        dateError.textContent = 'Date must be greater than or equal to today';
        // console.log(today);
        // console.log(inputDate);
        return; 
      }
    } else {
      dateError.textContent = 'Fill out this field';
      return;
    }

    if(task.description != ''){
      try {
        const response = await fetch(`http://localhost/regnars/api/update.php?id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
        if (response.ok) {
          // Request was successful
          const result = await response.json();
          console.log(result);
          const overlay = document.getElementById('overlay');
          overlay.classList.toggle('none');
          const alert = document.getElementById('alert');
          alert.classList.toggle('none');
        } else {
          // Handle errors here
          console.error('Request failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }      
    }
  };

  return (
    <div className="main">
      <div className="overlay none" id="overlay"></div>
      <div className="success none" id="alert">
        <div className="successText">Update successful</div>
        <button className='closeButton' onClick={closeAlert}>CLOSE</button>
      </div>
      <div className="taskContainer">
        <div className="title">{task.title}</div>
        <div className='width100'>
          <div className='descriptionContainer'>
            <textarea className="desc" name="description" value={task.description} onChange={handleInputChange}></textarea>     
            <p className='editError' id="descriptionError"></p>      
          </div>
          <div className="side">
            <div className="status">
              <div className='checkBox'>
                <label htmlFor="checkbox1">Completed</label>
                <input type="checkbox" name="status" value="yes" id="checkbox1" checked={task.status === 'yes'} onChange={handleInputChange} />
              </div>
              <div className='checkBox'>
                <label htmlFor="checkbox2">In Progress</label>
                <input type="checkbox" name="status" value="no" id="checkbox2" checked={task.status === 'no'} onChange={handleInputChange} />
              </div>
            </div>
            <div className="status">
              <label htmlFor="date"> <b>Due by </b> </label>
              <input className="dueDate" type="date" name="dueDate" id="date" value={task.dueDate} onChange={handleInputChange} />      
              <p className='editError' id="dateError"></p>         
            </div>
            <div className="buttons">
              <button className='tableButton height50' onClick={sendDataToPHP}>SAVE</button>
              <button className='tableButton height50' onClick={deleteTask}>DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
