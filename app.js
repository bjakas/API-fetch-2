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
