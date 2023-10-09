import React from 'react';
import { useState, useEffect}  from 'react';

function Home(){

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Initialize with a default value
    const [totalPages, setTotalPages] = useState(1); 

    useEffect(() => {
        fetch('http://localhost/regnars/api/function.php')
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
    const handleCustomItemsPerPageChange = (event) => {
      const customItemsPerPage = parseInt(event.target.value, 10); // Parse the custom value to an integer
      setItemsPerPage(customItemsPerPage);
      setCurrentPage(1); // Reset to the first page when changing items per page
      calculateTotalPages(data.length, customItemsPerPage);
    };
    
      
        const calculateTotalPages = (dataLength, itemsPerPage) => {
          const newTotalPages = Math.ceil(dataLength / itemsPerPage);
          setTotalPages(newTotalPages);
        };
      
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayedData = data.slice(startIndex, endIndex);
      
        useEffect(() => {
          calculateTotalPages(data.length, itemsPerPage);
        }, [data, itemsPerPage]); 
      
        const renderPaginationButtons = () => {
          const buttons = [];
          for (let i = 1; i <= totalPages; i++) {
            buttons.push(
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={currentPage === i ? 'activePage pageInput' : 'pageInput margin10'}
              >
                {i}
              </button>
            );
          }
          return buttons;
        };  


    return (
        <div className="main">
            <div className="taskBox">
              {/* Dropdown to select items per page */}
        <label htmlFor="itemsPerPage">Items Per Page:</label>
          <input type="number" id="customItemsPerPage" className='pageInput' value={itemsPerPage} onChange={handleCustomItemsPerPageChange} min="1" // Optionally, you can set a minimum value
          />
              <table border="1">
                <tr>
                  <th className='row1'>#</th>
                  <th className='row1'>Title</th>
                  <th className='row1' >Description</th>
                  <th className='row1' >Done?</th>
                  <th  className='row1'>Due Date</th>
                  <th  className='row1'>Edit</th>
                  <th  className='row1'>Remove</th>
                </tr>
                  {displayedData.map((task) =>(
                  <tr className='row' id={task.id} key={task.id}>
                    <th>{task.id}</th>
                    <th>{task.title}</th>
                    <th>{task.description}</th>
                    <th>{task.status}</th>
                    <th>{task.due_date}</th>
                    <th><a href={"http://localhost:3000/task?id=" + task.id} className='tableButton'>EDIT</a></th>
                    <th><button className='tableButton' onClick={() => deleteTask(task.id)}>DELETE</button></th>
                  </tr>
                  ))}
              </table>

              <div className="pagination">
                {renderPaginationButtons()}
              </div>
            </div>
        </div>
    )

}
export default Home