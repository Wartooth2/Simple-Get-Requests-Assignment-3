'use strict';
function getDogPic(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  if (responseJson.status == "error") {
    alert('That breed wasn\'t found, please try another.');
  } else {

    let sectionURL = responseJson.message.split("/");
    let breedName = sectionURL[4];
    $('.results').append(`<h3>${breedName}</h3>`);

    // append image
    $('.results').append(
      `<img src="${responseJson.message}" class="results-img" width="200" height="auto">`
    );
    // finally display the previously hidden results section
    $('.results').removeClass('hidden');
  }
}

function watchUserInput() {
  $('form').submit(event => {
    event.preventDefault();
    let dogBreed = $('input[name="dogBreed"]').val();
    getDogPic(dogBreed);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchUserInput();
});