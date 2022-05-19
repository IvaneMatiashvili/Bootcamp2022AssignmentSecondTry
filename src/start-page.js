import { pageTransitionAndNavigation } from './index.js';
const startBtn = document.querySelector('.start-questionnaire');
const { log: l } = console;

const [currentPageInx, selectedPageInx] = [-1, 0];

(function addStartBtnClickEventListener(btn){
    btn.addEventListener('click', () => {
        pageTransitionAndNavigation(currentPageInx, selectedPageInx);
    })
})(startBtn);

