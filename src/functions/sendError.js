import { useState } from 'react';

export function sendError(formData) {

  console.log('empty fields')

  let titleError = document.getElementById("titleError");
  let descriptionError = document.getElementById("descriptionError");
  let dateError = document.getElementById("dateError");

  if(formData.title === ""){
    titleError.textContent = "Fill out the title.";
  }else{
    titleError.textContent = "";
  }
  if(formData.description === ""){
    descriptionError.textContent = "Fill out the title.";
  }else{

    descriptionError.textContent = "";
  }
  if(formData.date === ""){
    dateError.textContent = "Fill out the title.";
  }else{
    dateError.textContent = "";
  }
}
export default sendError