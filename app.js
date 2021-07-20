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
    const loadingText = document.querySelector("[data-task-list]");
    loadingText.innerText = data;
    // console.log(data); // "Data is loading..."
  })
  .catch((error) => {
    const loadingText = document.querySelector("[data-task-list]");
    loadingText.innerText = error;
    // console.error(error); "There has been an error..."
  })



class Task {
  constructor(title) {
    this.title = title;
    this.isDone = false;
    this.isDeleted = false;
  }

  createElement() {
    const taskElement = document.createElement("div");
    taskElement.innerHTML = `<label><input type="checkbox" />${this.title}<button>X</button></label>`;

    const removeButton = taskElement.querySelector("button");
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.isDeleted = true;
      taskElement.remove();
    });

    const checkboxElement = taskElement.querySelector("input[type='checkbox']");
    checkboxElement.toggleAttribute("checked", this.isDone);
    checkboxElement.addEventListener("change", (event) => {
      event.preventDefault();
      this.isDone = event.target.checked;
    });

    return taskElement;
  }
}

const taskForm = document.querySelector("[data-task-form]");
const titleInput = taskForm.querySelector("[name=title]");

class TaskList {
  constructor() {
    this.taskListElement = document.querySelector("[data-task-list]");
    this.tasks = [];
  }

  refresh() {
    this.taskListElement.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (!task.isDeleted) {
        this.taskListElement.appendChild(task.createElement());
      }
    }
  }
}

const taskList = new TaskList();



const endpoint = "https://api.github.com/users/john";


fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    taskForm.addEventListener("keyup", (event) => {
      event.preventDefault();
      const task = new Task(data.login);

      taskList.tasks.push(task);
      taskList.refresh();
      console.log(data);
    });

  })
  .catch((error) => {
    console.error(error);
  });