import { pageLeftSlideAnimation } from './index.js';
const { log: l } = console;
const goBackBtn = document.querySelector('.go-back-btn');

const [currentPageInx, selectedPageInx] = [4, 3];

goBackBtn.addEventListener('click', () => {
    pageLeftSlideAnimation(currentPageInx, selectedPageInx);
});