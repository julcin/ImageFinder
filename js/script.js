"use strict";

const form = document.querySelector("#search-form");

form.addEventListener("submit", e => {
  e.preventDefault();
  //searchbox value
  const keyword = e.target[0].value;
  const number = e.target[1].value;

  //sending request to api with keyword from searchbox as parameter
  //and setting header with authorization key
  //read more about API at https://unsplash.com/documentation
  fetch(
    `https://api.unsplash.com/search/photos/?query=${keyword}&per_page=${number}`,
    {
      headers: {
        Authorization: "Client-ID _nljZlZE2dNQlnThC-THfGmtcgkjEOiL0u5j2ke6ERA",
      },
    }
  )
    .then(response => response.json())
    .then(data => {
      displayResult(keyword);

      //selecting only data needed form api reponse
      const images = data.results.map(item => {
        return {
          alt: item.alt_description,
          url: item.urls.regular,
        };
      });

      displayimages(images);

      //clearing search box
      e.target[0].value = "";
    })
    .catch(e => console.log(e));
});

function displayResult(keyword) {
  const resultContainer = document.querySelector("#result-container");
  //removing previous result if there is any
  if (resultContainer.firstChild) {
    resultContainer.firstChild.remove();
  }
  //creating search result text
  const title = document.createElement("h2");
  title.appendChild(document.createTextNode(`Images found for "${keyword}":`));
  resultContainer.appendChild(title);
}

function displayimages(images) {
  const galeryContianer = document.querySelector("#image-container");

  //clearing previous image results
  while (galeryContianer.firstChild) {
    galeryContianer.firstChild.remove();
  }

  //filling gallery container with elements from maped data
  for (let imageData of images) {
    const image = document.createElement("img");
    image.src = imageData.url;
    image.alt = imageData.alt;

    const imageLink = document.createElement("a");
    imageLink.target = "_blank";
    imageLink.href = imageData.url;
    imageLink.appendChild(image);

    const imageContainer = document.createElement("div");
    imageContainer.appendChild(imageLink);

    galeryContianer.appendChild(imageContainer);
  }
}
