
export function handleFormData(formData) {
  clearErrorMessages()
  
}



function clearErrorMessages() {
  let titleError = document.getElementById("titleError");
  titleError.textContent = "";
  let descriptionError = document.getElementById("descriptionError");
  descriptionError.textContent = "";
  let dateError = document.getElementById("dateError");
  dateError.textContent = "";
}