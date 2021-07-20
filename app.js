const endpoint = "https://api.github.com/users/john";

fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const h1 = document.createElement("h1");
    h1.innerText = `User who wants to share something with us is: ${data.name}`;
    document.body.appendChild(h1);

    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `<label>Type in any key and see what happens: <input type="text" id="case-up"/></label>`;
    const p = document.createElement("p");
    document.body.appendChild(p);

    div.addEventListener("keyup", (event) => {
      event.preventDefault();
      p.textContent += `${event.code}`;
      // document.querySelector("input").style.backgroundColor = "lightblue"; could add as well
      const caseUp = document.querySelector("#case-up");
      caseUp.value = caseUp.value.toUpperCase();
    })

    const randomText = document.createElement("p");
    randomText.innerText = "Here is Johns profile image: ";
    document.body.appendChild(randomText);

    const img = document.createElement("img");
    img.setAttribute("src", data.avatar_url);
    img.setAttribute("alt", `${data.login} profile image`);
    img.width = "200";
    img.height = "200";
    document.body.appendChild(img);

    const a = document.createElement("a");
    a.setAttribute("href", data.html_url);
    a.innerText = "You are welcome to visit Johns GitHub page";
    document.body.appendChild(a);

    document.body.style.textAlign = "center";
    document.body.style.backgroundColor = "#E8E1CE";

    console.log(data);

  })
  .catch((error) => {
    console.error(error);
  })