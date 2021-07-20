document.body.style.textAlign = "center";
document.body.style.backgroundColor = "#E8E1CE";

function apiPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data is loading...");
      reject("There has been an error...");
    }, 2000);
  });
}


apiPromise()
  .then((data) => {
    const loadingText = document.querySelector("[data-reply]");
    loadingText.innerText = data;
    // console.log(data); // "Data is loading..."
  })
  .catch((error) => {
    const loadingText = document.querySelector("[data-reply]");
    loadingText.innerText = error;
    // console.error(error); "There has been an error..."
  })


const endpoint = "https://api.github.com/users/john";


fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const dataForm = document.querySelector("[data-form]");
    const input = document.querySelector("input");

    input.addEventListener("keyup", (event) => {
      event.preventDefault();
      const p = document.createElement("p");
      document.body.appendChild(p);
      p.textContent += `${data.login}`;

    })

  })
  .catch((error) => {
    console.error(error);
  });
