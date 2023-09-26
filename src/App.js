import React from 'react';
import './App.css';
import Input from './components/input';
import { handleFormData } from './functions/sendTask';
import { sendError } from './functions/sendError';

function App() {
  const handleSubmit = () => {

    const formData = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
        
    };
    if(formData.title != "" && formData.description != "" && formData.date != ""){
      handleFormData(formData);
    }else{
      sendError(formData);
    }
  };

  return (
    <form className="main">
      Task creation
      <div className="box">
        <Input type="text" id="title" placeholder="Title"/>
        <Input type="text" id="description" placeholder="Description"/>
        <Input type="date" id="date"/>
        <button type="button" className="submit" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>
    </form>
  );
}

export default App;
