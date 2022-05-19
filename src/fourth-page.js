import { pageTransitionAndNavigation } from './index.js';
const { log: l } = console;
const fourthPageNavBtn = document.querySelectorAll('.fourth-page-nav');
const currentPageInx = 3;

(function addFourthPageNavBtnClickEventListener(btn) {
    btn.forEach((el, inx) => {
        if (inx !== currentPageInx) {
            el.addEventListener('click', () => {
                const selectedPageInx = inx;
                pageTransitionAndNavigation(currentPageInx, selectedPageInx);
            });
        }
    })
})(fourthPageNavBtn);