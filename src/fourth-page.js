import { pageRightSlideAnimation } from './index.js';
const { log: l } = console;
const fourthPageNavBtn = document.querySelectorAll('.fourth-page-nav');
const currentPageInx = 3;

fourthPageNavBtn.forEach((el, inx) => {
    if (inx > 3) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
        });
    }
})