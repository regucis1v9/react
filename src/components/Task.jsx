import React from 'react';
import { useState, useEffect}  from 'react';


function Task(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');

    console.log(id)
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost/regnars/api/getByID.php?id=${id}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log('Error fetching data:', error))
    }, [])



    return (
        <div className="main">
            <div className="taskBox">
                {data.map((task) =>(
                    <a href={`/task?id=${task.id}`} key={task.id} className="task" id ={task.id}>
                        <div className="taskTitle">{task.title}</div>
                        <div className="taskDescription">{task.description}</div>
                        <div className="taskDueDate"><b>Due date:</b> {task.due_date}</div>
                    </a>
                ))}
            </div>
        </div>
    )

}

export default Task