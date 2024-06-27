import { getUpcomingTasks } from './AppManager';
import { newTaskDisplay } from './DOM';
import plusIcon from './plus-circle.svg';



export function loadUpcomingPage() {
    const upcomingBtnSelect = document.querySelector('#upcoming-select');
    upcomingBtnSelect.style.display = 'inline';
    const homeBtnSelect = document.querySelector('#home-select');
    const projectsBtnSelect = document.querySelector('#projects-select');
    homeBtnSelect.style.display = 'none';
    projectsBtnSelect.style.display = 'none';
    const content = document.querySelector('#content');
    const upcomingHeader = document.createElement('div');
    upcomingHeader.setAttribute('class', 'page-header');
    const upcomingTitle = document.createElement('h1');
    upcomingTitle.textContent = "UPCOMING TO DO";
    const taskCountDisplay = document.createElement('span');
    const taskList = document.createElement('div');
    taskList.id = "task-list";
    const newTaskDisplayHandler = newTaskDisplay();
    const newTaskBtn = document.createElement('button');
    const newTaskBtnIcon = document.createElement('img');
    newTaskBtnIcon.src = plusIcon;
    const newTaskBtnText = document.createElement('div');
    newTaskBtnText.textContent = "New Task";
    newTaskBtn.setAttribute('class', 'new-task-btn');
    newTaskBtn.addEventListener('click', function () {
        const newTaskDisplay = newTaskDisplayHandler.getNewTaskDisplay();
        content.appendChild(newTaskDisplay)
    });
    content.appendChild(upcomingHeader);
    upcomingHeader.appendChild(upcomingTitle);
    upcomingHeader.appendChild(taskCountDisplay);
    content.appendChild(taskList);
    content.appendChild(newTaskBtn);
    newTaskBtn.appendChild(newTaskBtnIcon);
    newTaskBtn.appendChild(newTaskBtnText);
    let taskCount = getUpcomingTasks();
    taskCountDisplay.textContent = taskCount + " TASKS";
    upcomingHeader.appendChild(taskCountDisplay);
}

