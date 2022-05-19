import { pageTransitionAndNavigation } from './index.js';
const { log: l } = console;
const firstPageNavBtn = document.querySelectorAll('.first-page-nav');
const currentPageInx = 0;

(function addFirstPageNavBtnClickEventListener(btn) {
    btn.forEach((el, inx) => {
        if (inx > currentPageInx) {
            el.addEventListener('click', () => {
                const selectedPageInx = inx;
                pageTransitionAndNavigation(currentPageInx, selectedPageInx);
            });
        }
    })
})(firstPageNavBtn);
