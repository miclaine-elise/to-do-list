import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { addProject, getTasksInProject, Task, deleteTask, getProjects, markTaskComplete, deleteProject, editTask } from "./AppManager";
import { reloadCurrentPage } from './index';
import deleteIcon from './close-circle.svg';
import calendarIcon from './calendar.svg';
import editIcon from './pencil.svg';
import saveIcon from './content-save.svg';

export class taskDomElement {
    constructor(taskName, taskDes, project, date, index, completed) {
        this.completed = completed;
        this.completedBtn = document.createElement('button');
        this.completedBtn.setAttribute('class', 'task-checkbox');
        this.container = document.createElement('div');
        this.container.id = 'task-' + project + '-' + index;
        this.container.setAttribute('class', 'task');
        this.taskNameContainer = document.createElement('div');
        this.taskNameContainer.classList.add('task-name-container');
        this.taskName = document.createElement('span');
        this.taskName.textContent = taskName;
        this.taskName.setAttribute('class', 'task-name');
        this.taskNameInput = document.createElement('input');
        this.taskNameInput.type = 'text';
        this.taskDesContainer = document.createElement('div');
        this.taskDesContainer.classList.add('task-des-container');
        this.taskDes = document.createElement('span');
        this.taskDes.textContent = taskDes;
        this.taskDes.setAttribute('class', 'task-des');
        this.taskProjectContainer = document.createElement('div');
        this.taskProjectContainer.classList.add('task-project-container');
        this.project = document.createElement('span');
        this.project.textContent = '#' + project;
        this.project.setAttribute('class', 'task-project');
        this.taskDateContainer = document.createElement('div');
        this.taskDateContainer.classList.add('task-date-container');
        this.dateText = document.createElement('span');
        this.dateIcon = document.createElement('img');
        this.dateIcon.src = calendarIcon;
        this.dateText.textContent = format(date, 'MM/dd');
        this.date = date;
        this.deleteBtn = document.createElement('img');
        this.deleteBtn.src = deleteIcon;
        this.deleteBtn.classList.add('delete-btn');
        this.index = index;
        this.taskManageBtns = document.createElement('div');
        this.taskManageBtns.classList.add('task-manage-btns');
        this.editBtn = document.createElement('img');
        this.editBtn.src = editIcon;
        this.editBtn.classList.add('edit-btn');
        this.addCompletedEventListener();
        this.displayCompleteTasks();
        this.addDeleteEventListener();
        this.addEditTaskListener();
        // this.appendTask();

        // const taskList = document.querySelector('#task-list');
        // taskList.appendChild(this.container);
        // this.container.appendChild(this.completedBtn);
        // this.container.appendChild(this.taskNameContainer);
        // this.taskNameContainer.appendChild(this.taskName);
        // this.container.appendChild(this.taskDesContainer);
        // this.taskDesContainer.appendChild(this.taskDes);
        // this.container.appendChild(this.taskProjectContainer);
        // this.taskProjectContainer.appendChild(this.project);
        // this.container.appendChild(this.taskDateContainer);
        // this.taskDateContainer.appendChild(this.dateIcon);
        // this.taskDateContainer.appendChild(this.dateText);
        // this.container.appendChild(this.taskManageBtns);
        // this.taskManageBtns.appendChild(this.deleteBtn);
        // this.taskManageBtns.appendChild(this.editBtn);
    }
    displayTodaysTasks() {
        const taskList = document.querySelector('#task-list');
        taskList.appendChild(this.container);
        this.appendTasks();
        this.taskDateContainer.style.display = "none";
    }
    displayUpcomingTasks() {
        const taskList = document.querySelector('#task-list');
        taskList.appendChild(this.container);
        this.appendTasks();

    }
    displayTasksInProject(projectName) {
        const project = document.querySelector('#project-' + projectName);
        const taskList = project.querySelector('#task-list');
        taskList.appendChild(this.container);
        this.appendTasks();
        this.editBtn.style.display = 'none';
    }
    appendTasks() {
        this.container.appendChild(this.completedBtn);
        this.container.appendChild(this.taskNameContainer);
        this.taskNameContainer.appendChild(this.taskName);
        this.container.appendChild(this.taskDesContainer);
        this.taskDesContainer.appendChild(this.taskDes);
        this.container.appendChild(this.taskProjectContainer);
        this.taskProjectContainer.appendChild(this.project);
        this.container.appendChild(this.taskDateContainer);
        this.taskDateContainer.appendChild(this.dateIcon);
        this.taskDateContainer.appendChild(this.dateText);
        this.container.appendChild(this.taskManageBtns);
        this.taskManageBtns.appendChild(this.deleteBtn);
        this.taskManageBtns.appendChild(this.editBtn);
    }
    displayCompleteTasks() {
        let thisTask = this;
        let completedBtn = this.completedBtn;
        let taskName = this.taskName;
        let taskDes = this.taskDes;
        let taskProject = this.project;
        if (thisTask.completed == true) {
            completedBtn.style.backgroundColor = '#AF6868';
            taskName.classList.add('strike');
            taskDesContainer.remove();
            taskProjectContainer.remove();
        }
    }
    addCompletedEventListener() {
        let completedBtn = this.completedBtn;
        let taskName = this.taskName;
        let taskDes = this.taskDes;
        let taskDate = this.taskDateContainer;
        let taskProject = this.project;
        let taskIndex = this.index;
        completedBtn.addEventListener('click', function () {
            completedBtn.style.backgroundColor = '#AF6868';
            taskName.classList.add('strike');
            taskDes.remove();
            taskProject.remove();
            taskDate.remove();
            markTaskComplete(taskIndex);
        })
    }
    addDeleteEventListener() {
        let deleteBtn = this.deleteBtn;
        let taskIndex = this.index;
        deleteBtn.addEventListener('click', function () {
            deleteTask(taskIndex);
        })
    }
    addEditTaskListener() {
        let editBtn = this.editBtn;
        let thisTask = this;
        let thisIndex = this.index;
        editBtn.addEventListener('click', function () {
            thisTask.editTaskDisplay();
        })
    }
    editTaskDisplay() {
        let thisTask = this;
        this.editBtn.style.display = 'none';
        const saveBtn = document.createElement('img');
        saveBtn.classList.add('save-btn');
        saveBtn.src = saveIcon;
        saveBtn.style.display = "inline";
        this.taskName.style.display = 'none';
        const taskNameInput = document.createElement('input');
        taskNameInput.type = 'text';
        taskNameInput.placeholder = this.taskName.textContent;
        this.taskDes.style.display = 'none';
        const taskDesInput = document.createElement('input');
        taskDesInput.type = 'text';
        taskDesInput.placeholder = this.taskDes.textContent;

        this.project.style.display = 'none';
        const taskProjectInput = document.createElement('select');
        const projects = getProjects();
        projects.forEach(function (element) {
            let projectOption = document.createElement('option');
            projectOption.value = element;
            projectOption.textContent = element;
            taskProjectInput.appendChild(projectOption);
        });

        this.taskDateContainer.style.display = 'inline';
        this.dateIcon.style.display = 'none';
        this.dateText.style.display = 'none';
        const taskDateInput = document.createElement('input');
        taskDateInput.type = 'date';
        taskDateInput.value = format(this.date, 'yyyy-MM-dd');
        this.taskManageBtns.appendChild(saveBtn);
        this.taskNameContainer.appendChild(taskNameInput);
        this.taskDesContainer.appendChild(taskDesInput);
        this.taskProjectContainer.appendChild(taskProjectInput);
        this.taskDateContainer.appendChild(taskDateInput);
        let taskIndex = this.index;
        saveBtn.addEventListener('click', function () {
            //I dont really like how I did this but having trouble coming up with a cleaner solution
            let editedTaskName;
            let editedTaskDes;
            let editedProject = taskProjectInput.value;
            let editedDate = format(taskDateInput.value, "MM/dd/yyyy");
            if (taskNameInput.value) {
                editedTaskName = taskNameInput.value;
            } else {
                editedTaskName = taskNameInput.placeholder;
            }
            if (taskDesInput.value !== '') {
                editedTaskDes = taskDesInput.value;
            } else {
                editedTaskDes = taskDesInput.placeholder;
            }
            editTask(editedTaskName, editedTaskDes, editedProject, editedDate, taskIndex);
        })
    }
}

export function newTaskDisplay() {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.id = "new-task-container";
    const newTaskForm = document.createElement('form');

    const newTaskNameContainer = document.createElement('div');
    newTaskNameContainer.id = "new-task-name-container";
    const newTaskNameLabel = document.createElement('label');
    const newTaskNameInput = document.createElement('input');
    newTaskNameLabel.setAttribute('for', "task-name");
    newTaskNameInput.type = "text";
    newTaskNameInput.name = "task-name";
    newTaskNameInput.id = "task-name";
    newTaskNameInput.placeholder = "Task Name";

    const newTaskDesContainer = document.createElement('div');
    newTaskDesContainer.id = "new-task-des-container";
    const newTaskDesLabel = document.createElement('label');
    const newTaskDesInput = document.createElement('input');
    newTaskDesLabel.setAttribute('for', "task-description");
    newTaskDesInput.type = "text";
    newTaskDesInput.name = "task-description";
    newTaskDesInput.id = "task-description";
    newTaskDesInput.placeholder = 'Description';

    const dateProjectContainer = document.createElement('div');
    dateProjectContainer.id = 'date-project';
    const newTaskDateInput = document.createElement('input');
    const newTaskDateLabel = document.createElement('label');
    newTaskDateLabel.setAttribute('for', 'task-date');
    newTaskDateInput.type = 'date';
    newTaskDateInput.id = 'new-task-date';
    newTaskDateInput.name = 'task-date';
    newTaskDateInput.value = format(new Date(), 'yyyy-MM-dd');
    const newTaskProjectInput = document.createElement('select');
    const newTaskProjectLabel = document.createElement('label');
    newTaskProjectLabel.setAttribute('for', 'task-project');
    newTaskProjectInput.name = 'task-project';
    newTaskProjectInput.id = "new-task-project";
    const projects = getProjects();
    projects.forEach(function (element) {
        let projectOption = document.createElement('option');
        projectOption.value = element;
        projectOption.textContent = element;
        newTaskProjectInput.appendChild(projectOption);
    });


    const submitTaskContainer = document.createElement('div');
    submitTaskContainer.id = 'submit-task';
    const submitTaskBtn = document.createElement('button');
    submitTaskBtn.textContent = "Add Task";
    submitTaskBtn.type = "submit";
    submitTaskBtn.id = 'submit-task-btn';
    const cancelTaskBtn = document.createElement('button');
    cancelTaskBtn.textContent = "Cancel";
    cancelTaskBtn.id = "cancel-task-btn"

    newTaskContainer.appendChild(newTaskForm);
    newTaskForm.appendChild(newTaskNameContainer);
    newTaskNameContainer.appendChild(newTaskNameLabel);
    newTaskNameContainer.appendChild(newTaskNameInput);
    newTaskForm.appendChild(newTaskDesContainer);
    newTaskDesContainer.appendChild(newTaskDesLabel);
    newTaskDesContainer.appendChild(newTaskDesInput);
    newTaskForm.appendChild(dateProjectContainer);
    dateProjectContainer.appendChild(newTaskDateInput);
    dateProjectContainer.appendChild(newTaskDateLabel);
    dateProjectContainer.appendChild(newTaskProjectInput);
    dateProjectContainer.appendChild(newTaskProjectLabel);
    newTaskForm.appendChild(submitTaskContainer);
    submitTaskContainer.appendChild(submitTaskBtn);
    submitTaskContainer.appendChild(cancelTaskBtn);

    submitTaskBtn.addEventListener('click', function (event) {
        event.preventDefault();
        let newTaskName = newTaskNameInput.value;
        let newTaskDes = newTaskDesInput.value;
        let date = format(newTaskDateInput.value, "MM/dd/yyyy");
        let project = newTaskProjectInput.value;
        let newTask = new Task(newTaskName, newTaskDes, date, project);
        newTask.addTaskToList(newTask);
        let index = newTask.index;
        reloadCurrentPage();
    });
    cancelTaskBtn.addEventListener('click', function () {
        reloadCurrentPage();
    });
    const getNewTaskDisplay = () => newTaskContainer;

    return { getNewTaskDisplay }
}

export class projectDomElement {
    constructor(projectName) {
        this.project = projectName;
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'project-container');
        this.container.id = 'project-' + projectName;
        this.projectName = document.createElement('span');
        this.projectName.textContent = '#' + projectName;
        this.projectName.setAttribute('class', 'project-name');
        this.taskList = document.createElement('div');
        this.taskList.id = 'task-list';
        this.deleteProjectBtn = document.createElement('img');
        this.deleteProjectBtn.src = deleteIcon;
        this.deleteProjectBtn.classList.add('delete-project-btn');
        this.projectHeader = document.createElement('div');
        this.projectHeader.classList.add('project-header');
        this.appendProject();
        this.displayTaskListenerHandler(this.project);
        this.addDeleteProjectEventListener();
    }
    appendProject() {
        const projectList = document.querySelector('#project-list');
        projectList.appendChild(this.container);
        this.container.appendChild(this.projectHeader);
        this.projectHeader.appendChild(this.projectName);
        this.projectHeader.appendChild(this.deleteProjectBtn);
        this.container.appendChild(this.taskList);
    }
    displayTaskListenerHandler(project) {
        const thisClass = this;
        addListener();
        function getTasks() {
            getTasksInProject(project);
            removeListener();
        }
        function addListener() {
            hideTasksInProject();
            thisClass.projectName.addEventListener('mousedown', getTasks);
        }
        function removeListener() {
            thisClass.projectName.removeEventListener('mousedown', getTasks);
            thisClass.projectName.addEventListener('mousedown', addListener);
        }
        function hideTasksInProject() {
            while (thisClass.taskList.firstChild) {
                thisClass.taskList.removeChild(thisClass.taskList.lastChild);
            }
        }
    };
    addDeleteProjectEventListener() {
        let deleteProjectBtn = this.deleteProjectBtn;
        let projectName = this.projectName;
        deleteProjectBtn.addEventListener("click", function () {
            console.log()
            deleteProject(projectName);
        })
    }
}

export function newProjectDisplay() {
    const newProjectContainer = document.createElement('div');
    newProjectContainer.id = "new-project-container";
    const newProjectForm = document.createElement('form');
    const newProjectNameContainer = document.createElement('div');
    const newProjectNameLabel = document.createElement('label');
    const newProjectNameInput = document.createElement('input');
    newProjectNameLabel.setAttribute('for', "task-name");
    newProjectNameInput.type = "text";
    newProjectNameInput.name = "project-name";
    newProjectNameInput.id = "project-name";
    newProjectNameInput.placeholder = 'Project Name';


    const submitProjectContainer = document.createElement('div');
    submitProjectContainer.id = 'submit-project';
    const submitProjectBtn = document.createElement('button');
    submitProjectBtn.id = 'submit-project-btn';
    submitProjectBtn.textContent = "Add Project";
    submitProjectBtn.type = "submit";
    const cancelProjectBtn = document.createElement('button');
    cancelProjectBtn.textContent = "Cancel";

    newProjectContainer.appendChild(newProjectForm);
    newProjectForm.appendChild(newProjectNameContainer);
    newProjectNameContainer.appendChild(newProjectNameLabel);
    newProjectNameContainer.appendChild(newProjectNameInput);
    newProjectForm.appendChild(submitProjectContainer);
    submitProjectContainer.appendChild(submitProjectBtn);
    submitProjectContainer.appendChild(cancelProjectBtn);

    submitProjectBtn.addEventListener('click', function (event) {
        event.preventDefault();
        let newProjectName = newProjectNameInput.value;
        addProject(newProjectName);
        reloadCurrentPage();
    });
    cancelProjectBtn.addEventListener('click', function () {
        reloadCurrentPage();
    });
    const getNewProjectDisplay = () => newProjectContainer;

    return { getNewProjectDisplay }
}