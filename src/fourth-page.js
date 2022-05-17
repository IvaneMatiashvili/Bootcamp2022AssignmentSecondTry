import { pageRightSlideAnimation, pageLeftSlideAnimation } from './index.js';
const { log: l } = console;
const fourthPageNavBtn = document.querySelectorAll('.fourth-page-nav');
const currentPageInx = 3;

fourthPageNavBtn.forEach((el, inx) => {
    if (inx > currentPageInx) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageRightSlideAnimation(currentPageInx, selectedPageInx);
        });
    } else if (inx < currentPageInx) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageLeftSlideAnimation(currentPageInx, selectedPageInx);
        });
    }
})