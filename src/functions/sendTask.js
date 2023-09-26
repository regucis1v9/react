export function handleFormData(formData) {
  // Clear any previous error messages
  clearErrorMessages();

  // Prepare the data to be sent to the server
  const dataToSend = {
    title: formData.title,
    description: formData.description,
    due_date: formData.date,
  };

  // Send the data to the API endpoint
  fetch('http://localhost/regnars/api/postTask.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
}
// Helper function to clear error messages
function clearErrorMessages() {
  let titleError = document.getElementById("titleError");
  titleError.textContent = "";
  let descriptionError = document.getElementById("descriptionError");
  descriptionError.textContent = "";
  let dateError = document.getElementById("dateError");
  dateError.textContent = "";
}
