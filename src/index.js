import { startBtn } from './start-page.js';
const { log: l } = console;
const pages = document.querySelectorAll('.pages');
const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');
let rightPageTransition = document.querySelector('.transition');

export const pageRightSlideAnimation = (btn) => {
    if (btn === startBtn) {
        let currentPage = btn.parentNode.parentNode;
        rightPageTransition = currentPage;
        [currentPage.style.display, currentPage.nextElementSibling.style.display, rightPageTransition.style.display] = ['none', 'flex', 'block']; 
    }
    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    rightPageTransition.classList.add("is-active");
    rightPageTransition.classList.add("animation");
    setTimeout(() => {
        rightPageTransition.classList.remove('is-active');
        [leftSide.style.height, rightSide.style.height] = ['100%', '100%'];
    }, 5);
}