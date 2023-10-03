import React from 'react';
import { useState, useEffect}  from 'react';

function Home(){

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost/regnars/api/function.php')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log('Error fetching data:', error))
    }, [])
    // console.log(data)
    async function deleteTask(id) {
        const data = {
          id: id, // Use the id parameter directly
        };
      
        try {
          const response = await fetch('http://localhost/regnars/api/deleteTask.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            // Handle a successful delete operation here, e.g., update UI
            console.log('Task deleted successfully');
            const deletedElement = document.getElementById(id);
            if (deletedElement) {
              deletedElement.remove();
            } else {
              console.error('Element not found for removal');
            }
          } else {
            // Handle errors here
            console.error('Request failed');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      


    return (
        <div className="main">
            <div className="taskBox">
                {data.map((task) =>(
                    <a href={`/task?id=${task.id}`} key={task.id} className="task" id ={task.id}>
                        <div className="taskTitle">{task.title}</div>
                        <div className="taskDescription">{task.description}</div>
                        <div className="taskDueDate"><b>Due date:</b> {task.due_date}</div>
                        <button className='submit' onClick={() => deleteTask(task.id)}>DELETE</button>
                    </a>
                ))}
            </div>
        </div>
    )

}
export default Home