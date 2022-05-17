import { pageRightSlideAnimation } from './index.js';
const { log: l } = console;
export const startBtn = document.querySelector('.start-questionnaire');

startBtn.addEventListener("click", () => {
    pageRightSlideAnimation(startBtn);
});