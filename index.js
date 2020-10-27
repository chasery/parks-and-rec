"use strict";

let apiKey = "UR79rgRkUGyrjxqVx8HMS7Lt6Vwb0CR0ZakY0LGc";
let parksEndpoint = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  // A function for taking in a params object and returning a query stirng
  const queryItems = Object.keys(params).map((key) => {
    if (key === "stateCode") {
      return `${encodeURIComponent(key)}=${params[key].join(",")}`;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join("&");
}

function getParks(states, maxResults) {
  // A function to GET a list of Parks from the National Parks Service
  let params = {
    stateCode: states,
    limit: maxResults,
    api_key: apiKey,
  };
  let queryString = formatQueryParams(params);
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
    let states = $("#jsStateSelect").val();
    let maxResults = $("#jsMaxResults").val();
    getParks(states, maxResults);
  });
}

$(watchForm);
