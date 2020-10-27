"use strict";

let apiKey = "UR79rgRkUGyrjxqVx8HMS7Lt6Vwb0CR0ZakY0LGc";
let parksEndpoint = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  // A function for taking in a params object and returning a query stirng
  const queryItems = Object.keys(params).map((key) => {
    if (key === "stateCode") {
      let stateList = params[key].join(",");
      return `stateCode=${stateList}`;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join("&");
}

function getParks(state) {
  // A function to GET a list of Parks from the National Parks Service
  let params = {
    stateCode: state,
    api_key: apiKey,
  };
  let queryString = formatQueryParams(params);
  console.log(queryString);
  let url = parksEndpoint + "?" + queryString;

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
    let state = $("#jsStateSelect").val();
    getParks(state);
  });
}

$(watchForm);
