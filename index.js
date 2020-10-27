"use strict";

let apiKey = "UR79rgRkUGyrjxqVx8HMS7Lt6Vwb0CR0ZakY0LGc";
let parksEndpoint = "https://developer.nps.gov/api/v1/parks";

function formatAddress(addresses) {
  // A function returning an address string
  let address = "";
  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].type === "Physical") {
      address = `<address class="park__address">${addresses[i].line1} ${
        addresses[i].line2 ? `${addresses[i].line2} ` : ""
      }${addresses[i].line3 ? `${addresses[i].line3} ` : ""}${
        addresses[i].city
      }, ${addresses[i].stateCode} ${addresses[i].postalCode}</address>`;
    }
  }
  if (address) {
    return address;
  }
}

function renderResults(results) {
  // A function for displaying successful results
  let resultsContainer = $("#jsResults");
  resultsContainer.children("ul.parks").empty();
  $("#jsError").addClass("hidden");
  resultsContainer.removeClass("hidden");
  for (let i = 0; i < results.data.length; i++) {
    let address = formatAddress(results.data[i].addresses);
    resultsContainer.children("ul.parks").append(`
      <li class="park">
        <div class="park__header">
          <h3 class="park__name">${results.data[i].fullName}</h3>
          <a class="park__url" href="${results.data[i].url}" target="_blank">${results.data[i].url}</a>
        </div>
        ${address}
        <p class="park__description">${results.data[i].description}</p>
      </li>
    `);
  }
}

function rednerError(error) {
  // A function dedicated to render
  let errorContainer = $("#jsError");
  errorContainer.children("ul.parks").empty();
  $("#jsResults").addClass("hidden");
  errorContainer.removeClass("hidden");
  errorContainer.children("p").html(error.message);
}

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
      renderResults(json);
    })
    .catch((err) => {
      rednerError(err);
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
