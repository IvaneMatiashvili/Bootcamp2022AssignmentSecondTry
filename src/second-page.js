import { pageRightSlideAnimation, pageLeftSlideAnimation } from './index.js';
const { log: l } = console;
const secondPageNavBtn = document.querySelectorAll('.second-page-nav');
const currentPageInx = 1;

(function addSecondPageNavBtnClickEventListener(btn) {
    btn.forEach((el, inx) => {
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
})(secondPageNavBtn);