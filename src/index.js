import './style.css';
import './normalize.css';
import { loadHomePage } from "./homePage";
import { loadUpcomingPage } from "./upcomingPage";
import { loadProjectPage } from "./projectPage";
import scribbleIcon from "./scribble.svg";
import titleImg from './hellosunshine.svg'

const header = document.querySelector('#header');
const headerImg = document.createElement('img');
headerImg.src = titleImg;
header.appendChild(headerImg);
const homeBtn = document.querySelector('#home-btn');
const homeBtnSelect = document.querySelector('#home-select');
homeBtnSelect.src = scribbleIcon;
const upcomingBtn = document.querySelector('#upcoming-btn');
const upcomingBtnSelect = document.querySelector('#upcoming-select');
upcomingBtnSelect.src = scribbleIcon;
const projectsBtn = document.querySelector('#projects-btn');
const projectsBtnSelect = document.querySelector('#projects-select');
projectsBtnSelect.src = scribbleIcon;
const content = document.querySelector('#content');
let currentPage = "home";
reloadCurrentPage();
homeBtn.addEventListener('click', function () {
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    currentPage = "home";
    loadHomePage();
})

upcomingBtn.addEventListener('click', function () {
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }

    currentPage = "upcoming"
    loadUpcomingPage();
})

projectsBtn.addEventListener('click', function () {
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    currentPage = "projects"
    loadProjectPage();
})

export function reloadCurrentPage() {
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    switch (currentPage) {
        case 'home':
            loadHomePage();
            break;
        case 'upcoming':
            loadUpcomingPage();
            break;
        case 'projects':
            loadProjectPage();
            break;
    }
}
