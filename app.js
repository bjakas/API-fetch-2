// v.2. Table layout

const endpoint = 'https://api.github.com/search/users?q=';

const inputElement = document.querySelector('[data-search-input]');
const resultElementHeader = document.querySelector('[data-search-table-header]');
const resultElement = document.querySelector('[data-search-result]');
const loadingElement = document.querySelector('[data-loading]');
const errorElement = document.querySelector('[data-error]');

resultElementHeader.style.opacity = "0";

inputElement.addEventListener('keyup', (event) => {
  const username = event.target.value;
  loadingElement.innerText = "Please wait while data is loading...";

  console.log("Data is loading...")

  fetch(endpoint + username)
    .then(response => { // check if response is ok and console either outcome
      if (response.ok) {
        console.log("Success!");
        return response.json();
      } else {
        console.error("Not successful");
      };
    })
    .then(data => {
      loadingElement.innerHTML = '';

      for (let i = 0; i < data.items.length; i++) { // i < data.items.length

        const item = data.items[i];
        const itemNumber = i; // starts at 1

        resultElementHeader.style.opacity = "1";

        const itemElement = document.createElement('tr');

        itemElement.innerHTML = `
        <tr>
        <td><span>${itemNumber + 1}. </span></td>
        <td><img class="avatar" src="${item.avatar_url}"></td>
        <td><a href="${item.html_url}">${item.login}</a></td>
        <td><span>${item.id}</span></td>
        </tr>
       `
        resultElement.appendChild(itemElement);

        console.log(item.login, item.html_url); // we can console log user name and url or whatever we need
      }
    })
    .catch((error) => {
      console.error("This is the error that occured:", error); // error in console
      //alert('Error!')
      errorElement.innerText = "There has been an error while retrieving data."; // error message shown to page visitor 
      resultElement.innerText = "";
      resultElementHeader.innerText = "";
    });
});

/*

* v.1. with lists

const endpoint = 'https://api.github.com/search/users?q=';

const inputElement = document.querySelector('[data-search-input]');
const resultElement = document.querySelector('[data-search-result]');

inputElement.addEventListener('keyup', (event) => {
  const username = event.target.value;
  resultElement.innerText = "Please wait while data is loading...";
  console.log("Data is loading...")

  fetch(endpoint + username)
    .then(response => { // check if response is ok and console either outcome
      if (response.ok) {
        console.log("Success!");
        return response.json();
      } else {
        console.error("Not successful");
      };
    })
    .then(data => {
      resultElement.innerHTML = '';

      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        const itemElement = document.createElement('div');

        itemElement.innerText = `User name: ${item.login}, user url: ${item.html_url}`;
        resultElement.appendChild(itemElement);
        console.log(item.login, item.html_url); // we can console log user name and url or whatever we need
      }
    })
    .catch((error) => {
      console.error("This is the error that occured:", error); // error in console
      //alert('Error!')
      resultElement.innerText = "There has been an error while retrieving data."; // error message shown to page visitor
    });
});

*/