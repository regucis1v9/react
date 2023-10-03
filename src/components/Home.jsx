import React from 'react';
import { useState, useEffect}  from 'react';

function Home(){

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost/api/function.php')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log('Error fetching data:', error))
    }, [])
    console.log(data)


    return (
        <div className="main">
            <div className="taskBox">
                {data.map((task) =>(
                    <div className="task">
                        <div className="taskTitle">{task.title}</div>
                        <div className="taskDescription">{task.description}</div>
                        <div className="taskDueDate"><b>Due date:</b> {task.due_date}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default Home