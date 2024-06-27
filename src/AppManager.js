import { taskDomElement } from "./DOM.js";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { projectDomElement } from "./DOM.js";
import { reloadCurrentPage } from "./index.js";

const taskList = [];
const projects = ['home'];

export class Task {
    constructor(taskName, taskDes, date, project) {
        this.taskName = taskName;
        this.taskDes = taskDes;
        this.date = date;
        this.project = project;
        this.completed = false;
        this.index = taskList.length

    }
    addTaskToList() {
        taskList.push(this);
    }
}
export function getTodaysTasks() {
    let todayTaskCount = 0;
    const currentDate = format(new Date(), "MM/dd/yyyy");
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].date === currentDate) {
            todayTaskCount++;
            new taskDomElement(taskList[i].taskName, taskList[i].taskDes, taskList[i].project, taskList[i].date, taskList[i].index, taskList[i].completed).displayTodaysTasks();
        }
    }
    return todayTaskCount
}
export function getUpcomingTasks() {
    let upcomingTaskCount = 0;
    const currentDate = format(new Date(), "MM/dd/yyyy");
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].date !== currentDate && taskList[i].completed == false) {
            upcomingTaskCount++
            new taskDomElement(taskList[i].taskName, taskList[i].taskDes, taskList[i].project, taskList[i].date, taskList[i].index, taskList[i].completed).displayUpcomingTasks();

        }
    }
    return upcomingTaskCount
}

export function deleteTask(index) {
    taskList.splice(index, 1);
    reloadCurrentPage();
}

export function addProject(newProjectName) {
    projects.push(newProjectName);
}
export function deleteProject(projectName) {
    let index = projects.indexOf(projectName);
    projects.splice(index, 1);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].project === projectName) {
            taskList.splice(i, 1);
        }
    }
    reloadCurrentPage();
}
export function getProjects() {
    return projects;
}

export function getTasksInProject(projectName) {
    let projectTaskCount = 0;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].project === projectName && taskList[i].completed == false) {
            projectTaskCount++;
            new taskDomElement(taskList[i].taskName, taskList[i].taskDes, taskList[i].project, taskList[i].date, taskList[i].index).displayTasksInProject(projectName);
        }
    }
    return projectTaskCount
}

export function markTaskComplete(index) {
    taskList[index].completed = true;
}

export function editTask(taskName, taskDes, taskProject, taskDate, taskIndex) {
    taskList[taskIndex].taskName = taskName;
    taskList[taskIndex].taskDes = taskDes;
    taskList[taskIndex].project = taskProject;
    taskList[taskIndex].date = taskDate;
    reloadCurrentPage();
}