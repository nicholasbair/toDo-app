/*
TODO:
    1. Prevent creation of empty listItem
    2. When editing, change edit button to 'save'
*/

var taskInput = document.getElementById("new-task"), //new-task
    addButton = document.getElementsByTagName("button")[0], //first button
    incompleteTasksHolder = document.getElementById("incomplete-tasks"), //incomplete-tasks
    completedTasksHolder= document.getElementById("completed-tasks"), //completed-tasks
    createNewTaskElement = function(taskString) {
        //Create List Item
        var listItem = document.createElement("li"),
            checkBox = document.createElement("input"),
            label = document.createElement("label"),
            editInput = document.createElement("input"),
            editButton = document.createElement("button"),
            deleteButton = document.createElement("button");

        //Each element needs modifying
      checkBox.type = "checkbox";
      editInput.type = "text";
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
      label.innerText = taskString;

      //Each element needs appending
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      return listItem;
},

//Add a new task
addTask = function() {
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
},

//Edit an existing task
editTask = function() {
  var listItem = this.parentNode,
    editInput = listItem.querySelector("input[type=text"),
    label = listItem.querySelector("label"),
    containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
},

//Delete an existing task
deleteTask = function() {
  var listItem = this.parentNode,
    ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
},

//Mark a task as complete
taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
},

//Mark a task as incomplete
taskIncomplete = function() {
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
},

bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]"),
    editButton = taskListItem.querySelector("button.edit"),
    deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
},

ajaxRequest = function() {
  console.log("AJAX request");
};

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
