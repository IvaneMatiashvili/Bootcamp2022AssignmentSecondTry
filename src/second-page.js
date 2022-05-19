import { pageTransitionAndNavigation } from './index.js';
const { log: l } = console;
const secondPageNavBtn = document.querySelectorAll('.second-page-nav');
const currentPageInx = 1;

(function addSecondPageNavBtnClickEventListener(btn) {
    btn.forEach((el, inx) => {
        if (inx !== currentPageInx) {
            el.addEventListener('click', () => {
                const selectedPageInx = inx;
                pageTransitionAndNavigation(currentPageInx, selectedPageInx);
            });
        }
    })
})(secondPageNavBtn);