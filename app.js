function apiPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data is loading...");
      reject("There has been an error.");
    }, 2000);
  });
}

const endpoint = "https://api.github.com/users/john";

document.body.style.textAlign = "center";
document.body.style.backgroundColor = "#E8E1CE";


apiPromise()
  .then((data) => {
    const loadingText = document.querySelector("[data-reply]");
    loadingText.innerText = data;
    // console.log(data); // "Data is printing..."
  })
  .catch((error) => {
    loadingText.innerText = error;

    console.error(error);
  })

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