import { getTodaysTasks } from "./AppManager";
import { newTaskDisplay } from "./DOM";
import plusIcon from './plus-circle.svg';
import scribbleIcon from "./scribble.svg";

export function loadHomePage() {
    const homeBtnSelect = document.querySelector('#home-select');
    const upcomingBtnSelect = document.querySelector('#upcoming-select');
    const projectsBtnSelect = document.querySelector('#projects-select');
    homeBtnSelect.style.display = 'inline';
    upcomingBtnSelect.style.display = 'none';
    projectsBtnSelect.style.display = 'none';
    const content = document.querySelector('#content');
    const homeHeader = document.createElement('div');
    homeHeader.setAttribute('class', 'page-header');
    const homeTitle = document.createElement('h1');
    homeTitle.textContent = "TODAY'S TO DO";
    const taskCountDisplay = document.createElement('span');
    const taskList = document.createElement('div');
    taskList.id = "task-list";
    const newTaskDisplayHandler = newTaskDisplay();
    const newTaskBtn = document.createElement('button');
    const newTaskBtnIcon = document.createElement('img');
    newTaskBtnIcon.src = plusIcon;
    const newTaskBtnText = document.createElement('div');
    newTaskBtn.setAttribute('class', "new-task-btn");
    newTaskBtnText.textContent = "New Task";
    newTaskBtn.addEventListener('click', function () {
        const newTaskDisplay = newTaskDisplayHandler.getNewTaskDisplay();
        content.appendChild(newTaskDisplay)
    });

    content.appendChild(homeHeader);
    homeHeader.appendChild(homeTitle);
    content.appendChild(taskList);
    content.appendChild(newTaskBtn);
    newTaskBtn.appendChild(newTaskBtnIcon);
    newTaskBtn.appendChild(newTaskBtnText);
    let taskCount = getTodaysTasks();
    taskCountDisplay.textContent = taskCount + " TASKS";
    homeHeader.appendChild(taskCountDisplay);

}