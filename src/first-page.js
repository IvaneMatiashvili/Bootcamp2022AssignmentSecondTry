import { pageRightSlideAnimation } from './index.js';
const { log: l } = console;
const firstPageNavBtn = document.querySelectorAll('.first-page-nav');
const currentPageInx = 0;

firstPageNavBtn.forEach((el, inx) => {
    if (inx > currentPageInx) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
        });
    }
})
