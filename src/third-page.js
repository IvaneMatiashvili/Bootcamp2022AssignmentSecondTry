import { pageTransitionAndNavigation } from './index.js';
const { log: l } = console;
const thirdPageNavBtn = document.querySelectorAll('.third-page-nav');
const currentPageInx = 2;

(function addThirdPageNavBtnClickEventListener(btn) {
    btn.forEach((el, inx) => {
        if (inx !== currentPageInx) {
            el.addEventListener('click', () => {
                const selectedPageInx = inx;
                pageTransitionAndNavigation(currentPageInx, selectedPageInx);
            });
        }
    })
})(thirdPageNavBtn);