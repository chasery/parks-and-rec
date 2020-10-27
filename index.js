function getParks(message) {
  // A function to GET a list of Parks from the National Parks Service
  console.log(message);
}

function watchForm() {
  // A function to watch for user input
  $("#jsGetParks").submit((e) => {
    e.preventDefault();
    getParks("hi");
  });
}

$(watchForm);
