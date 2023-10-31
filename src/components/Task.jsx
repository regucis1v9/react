import React, { useState, useEffect } from 'react';

function Task() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  const descriptionError = document.getElementById('descriptionError');
  const dateError = document.getElementById('dateError');
  const containsHTMLTags = (text) => /<.*>/g.test(text);

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetch(`http://localhost/regnars/api/getByID.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        let taskData = data[0] || {}; // Ensure we have valid data
        setTask({
          title: taskData.title || '',
          description: taskData.description || '',
        });
        console.log(taskData);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        // Redirect to localhost:3000 in case of an error
        window.location.href = 'http://localhost:3000/';
      });
  }, [id]);

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
      task.description = task.description.trim().trimStart();
    } else if (containsHTMLTags(task.description)) {
      descriptionError.textContent = 'Description cannot contain HTML tags';
      task.description = '';
    } else {
      descriptionError.textContent = '';
      task.description = task.description.trim().trimStart();
    }
    console.log(task.title)
    console.log(task.description)
    if (task.description !== '') {
      try {
        const response = await fetch(`http://localhost/regnars/api/update.php?id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          const overlay = document.getElementById('overlay');
          overlay.classList.toggle('none');
          const alert = document.getElementById('alert');
          alert.classList.toggle('none');
        } else {
          console.error('Request failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const deleteTask = async () => {
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
  };

  const closeAlert = () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('none');
    const alert = document.getElementById('alert');
    alert.classList.toggle('none');
  };

  return (
    <div className="main">
      <div className="overlay none" id="overlay"></div>
      <div className="success none" id="alert">
        <div className="successText">Update successful</div>
        <button className='closeButton' onClick={closeAlert}>CLOSE</button>
      </div>
      <div className="taskContainer">
        <input
          className="title"
          type="text"
          name="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <div className='width100'>
          <div className='descriptionContainer'>
            <textarea
              className="desc"
              name="description"
              value={task.description}
              onChange={handleInputChange}
            ></textarea>
            <p className='editError' id="descriptionError"></p>
          </div>
          <div className="side">
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
