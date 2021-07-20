const endpoint = 'https://api.github.com/search/users?q=';

const inputElement = document.querySelector('[data-search-input]');
const resultElement = document.querySelector('[data-search-result]');

inputElement.addEventListener('keyup', (event) => {
  const username = event.target.value;

  fetch(endpoint + username)
    .then(response => response.json())
    .then(data => {
      resultElement.innerHTML = '';

      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        const itemElement = document.createElement('div');

        itemElement.innerText = item.html_url;
        resultElement.appendChild(itemElement);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Error!')
    });
});
