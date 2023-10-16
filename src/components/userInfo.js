const setInfo = (role, id) => {

  
    // Update the values in localStorage
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
  };
  
  export default setInfo;