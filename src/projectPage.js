import { getProjects } from './AppManager';
import { newProjectDisplay } from './DOM';
import { projectDomElement } from './DOM';
import plusIcon from './plus-circle.svg';


//Need to update- just copied the other page layout
export function loadProjectPage() {
    const projectsBtnSelect = document.querySelector('#projects-select');
    projectsBtnSelect.style.display = 'inline';
    const homeBtnSelect = document.querySelector('#home-select');
    const upcomingBtnSelect = document.querySelector('#upcoming-select');
    homeBtnSelect.style.display = 'none';
    upcomingBtnSelect.style.display = 'none';
    const content = document.querySelector('#content');
    const projectHeader = document.createElement('div');
    projectHeader.setAttribute('class', 'page-header');
    const projectTitle = document.createElement('h1');
    projectTitle.textContent = "PROJECTS";
    const projectList = document.createElement('div');
    projectList.id = "project-list";
    const newProjectDisplayHandler = newProjectDisplay();
    const newProjectBtn = document.createElement('button');
    const newProjectBtnText = document.createElement('div');
    newProjectBtnText.textContent = "New Project";
    newProjectBtn.setAttribute('class', 'new-task-btn');
    const newTaskBtnIcon = document.createElement('img');
    newTaskBtnIcon.src = plusIcon;
    newProjectBtn.addEventListener('click', function () {
        const newProjectDisplay = newProjectDisplayHandler.getNewProjectDisplay();
        content.appendChild(newProjectDisplay)
    });
    content.appendChild(projectHeader);
    projectHeader.appendChild(projectTitle);
    content.appendChild(projectList);
    newProjectBtn.appendChild(newTaskBtnIcon);
    newProjectBtn.appendChild(newProjectBtnText);
    content.appendChild(newProjectBtn);
    displayProjects();
}
function displayProjects() {
    const projects = getProjects();
    projects.forEach((projectName) => new projectDomElement(projectName));
}