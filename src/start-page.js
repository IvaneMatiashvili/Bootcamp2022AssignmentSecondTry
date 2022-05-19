import { pageRightSlideAnimation } from './index.js';
const startBtn = document.querySelector('.start-questionnaire');
const { log: l } = console;

const [currentPageInx, selectedPageInx] = [-1, 0];

// make js file more functional 
(function addStartBtnClickEventListener(btn){
    btn.addEventListener('click', () => {
        pageRightSlideAnimation(currentPageInx, selectedPageInx);
    })
})(startBtn);

