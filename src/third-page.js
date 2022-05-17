import { pageRightSlideAnimation, pageLeftSlideAnimation } from './index.js';
const { log: l } = console;
const thirdPageNavBtn = document.querySelectorAll('.third-page-nav');
const currentPageInx = 2;

thirdPageNavBtn.forEach((el, inx) => {
    if (inx > currentPageInx) {
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
        });
    } else if(inx < currentPageInx){
        el.addEventListener('click', () => {
            const selectedPageInx = inx;
            pageLeftSlideAnimation(el, currentPageInx, selectedPageInx);
        });
    }
})