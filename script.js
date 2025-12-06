var input = document.getElementById("task-input");
var addBtn = document.getElementById("add-btn");
var list = document.getElementById("task-list");
var ding = new Audio("ding.mp3");
var storageKey = "todo-box-tasks";

function saveTasks() {
  var items = list.querySelectorAll(".task-item");
  var data = [];
  items.forEach(function (it) {
    data.push({
      text: it.querySelector(".task-label").textContent,
      done: it.classList.contains("done")
    });
  });
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function createTaskElement(text, done) {
  var li = document.createElement("li");
  li.className = "task-item";
  if (done) li.classList.add("done");

  var left = document.createElement("div");
  left.className = "left-box";

  var label = document.createElement("div");
  label.className = "task-label";
  label.textContent = text;

  left.addEventListener("click", function () {
    var wasDone = li.classList.contains("done");
    li.classList.toggle("done");
    if (!wasDone) {
      ding.currentTime = 0;
      ding.play();
    }
    saveTasks();
  });

  var del = document.createElement("button");
  del.className = "delete-btn";
  del.textContent = "✕";
  del.addEventListener("click", function (e) {
    e.stopPropagation();
    list.removeChild(li);
    saveTasks();
  });

  left.appendChild(label);
  li.appendChild(left);
  li.appendChild(del);
  return li;
}

function addTask() {
  var text = input.value.trim();
  if (!text) return;
  list.appendChild(createTaskElement(text, false));
  input.value = "";
  saveTasks();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function loadTasks() {
  var raw = localStorage.getItem(storageKey);
  if (!raw) return;
  JSON.parse(raw).forEach(function (t) {
    list.appendChild(createTaskElement(t.text, t.done));
  });
}

loadTasks();
