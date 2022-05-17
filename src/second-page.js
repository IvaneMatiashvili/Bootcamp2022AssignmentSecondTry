import { pageRightSlideAnimation } from './index.js';
const { log: l } = console;
const secondPageNavBtn = document.querySelectorAll('.second-page-nav');
const currentPageInx = 1;

secondPageNavBtn.forEach((el, inx) => {
    if (inx > 1) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
        });
    }
})