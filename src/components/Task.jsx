import React, { useState, useEffect } from 'react';

function Task() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');

  const [task, setTask] = useState({
    description: '',
    dueDate: '',
    status: 'no', // Default status
  });

  useEffect(() => {
    fetch(`http://localhost/regnars/api/getByID.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const taskData = data[0] || {}; // Ensure we have valid data
        setTask({
          title: taskData.title || '',
          description: taskData.description || '',
          dueDate: taskData.due_date || '',
          status: taskData.status || 'no',
        });
      })
      .catch((error) => console.log('Error fetching data:', error));
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
        // Handle a successful delete operation here, e.g., update UI
        window.location.href = 'http://localhost:3000';
      } else {
        // Handle errors here
        console.error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const sendDataToPHP = async () => {
    try {
      const response = await fetch(`http://localhost/regnars/api/update.php?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      console.log(task)
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

  return (
    <div className="main">
      <div className="taskContainer">
        <div className="title">{task.title}</div>
        <div className='width100'>
          <textarea className="desc" name="description" value={task.description} onChange={handleInputChange}></textarea>
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
            <label htmlFor="date"> <b>Due by </b> </label>
            <input className="dueDate" type="date" name="dueDate" id="date" value={task.dueDate} onChange={handleInputChange} />
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
