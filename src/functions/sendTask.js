import { useState } from 'react';

export function handleFormData(formData) {

  console.log('Title:', formData.title);
  console.log('Description:', formData.description);
  console.log('Date:', formData.date);

  let titleError = document.getElementById("titleError");
  titleError.textContent = "";
  let descriptionError = document.getElementById("descriptionError");
  descriptionError.textContent = "";
  let dateError = document.getElementById("dateError");
  dateError.textContent = "";

  fetch('../../backend/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: formData.date,
      title: formData.title,
      description: formData.description,
    }),
  })
}

export default handleFormData