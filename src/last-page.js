import { pageLeftSlideAnimation } from './index.js';
const { log: l } = console;
const goBackBtn = document.querySelector('.go-back-btn');

const [currentPageInx, selectedPageInx] = [4, 3];

(function addGoBackBtnClickEventListener(btn) {
    btn.addEventListener('click', () => {
        pageLeftSlideAnimation(currentPageInx, selectedPageInx);
    });
})(goBackBtn);