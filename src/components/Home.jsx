import React from 'react';
import { useState, useEffect}  from 'react';

function Home(){


    const [data, setData] = useState([])
    
    const localRole = localStorage.getItem('role');
    const localID = localStorage.getItem('id');
    useEffect(() => {
        fetch(`http://localhost/regnars/api/get.php`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log('Error fetching data:', error))
    }, [])
    async function deleteTask(id) {
      const data = {
        id: id, // Use the id parameter directly
      };
    
      try {
        const response = await fetch(`http://localhost/regnars/api/deleteTask.php?id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
                  // <tr className='row' id={task.id} key={task.id}>
                  //   <th>{task.id}</th>
                  //   <th>{task.title}</th>
                  //   <th>{task.description}</th>
                  //   <th><a href={"http://localhost:3000/task?id=" + task.id} className='tableButton'>EDIT</a></th>
                  //   <th><button className='tableButton' onClick={() => deleteTask(task.id)}>DELETE</button></th>
                  // </tr>
                  <a className="blogBox" href={"http://localhost:3000/task?id=" + task.id}>
                    <h1>{task.title}</h1>
                    <div>{task.description}</div>
                  </a>
                  ))}
            </div>
        </div>
    )

}
export default Home