function getParks() {
  // A function to GET a list of Parks from the National Parks Service
  let apiKey = "UR79rgRkUGyrjxqVx8HMS7Lt6Vwb0CR0ZakY0LGc";
  let baseUrl = "https://developer.nps.gov/api/v1";
  let endpointUrl = "/parks";
  let url = baseUrl + endpointUrl + `?api_key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
}

function watchForm() {
  // A function to watch for user input
  $("#jsGetParks").submit((e) => {
    e.preventDefault();
    getParks();
  });
}

$(watchForm);
