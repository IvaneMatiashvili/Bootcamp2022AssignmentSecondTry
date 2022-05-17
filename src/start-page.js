import { pageRightSlideAnimation } from './index.js';
const { log: l } = console;
const startBtn = document.querySelector('.start-questionnaire');

const [currentPageInx, selectedPageInx] = [-1, 0];

startBtn.addEventListener('click', () => {
    pageRightSlideAnimation(startBtn, currentPageInx, selectedPageInx);
});