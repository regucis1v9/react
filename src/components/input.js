import React from 'react';

function Input(props) {
  const { type } = props; 
  const { id } = props; 
  return (
    <div className='inputBox'>
      <input className='input' type={type} id={id}></input>
      <p className='errorMsg' id={id+"Error"}></p>
    </div>

  );
}

export default Input;