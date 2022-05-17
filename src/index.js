const { log: l } = console;
let rightPageTransition = document.querySelector('.transition');
const pages = document.querySelectorAll('.pages');
const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');
const nextArrowBtn = document.querySelectorAll('.go-next');

export const pageRightSlideAnimation = (btn, currentPageInx, selectedPageInx) => {
    rightPageTransition = pages[currentPageInx + 1];
    pages[currentPageInx + 1].style.display = 'none';
    if (selectedPageInx === 0) {
        [pages[selectedPageInx + 1].style.display, rightPageTransition.style.display] = ['flex', 'block'];
    } else if (selectedPageInx === 4) {
        [pages[selectedPageInx + 1].style.display, rightPageTransition.style.display] = ['block', 'flex'];

    } else {
        [pages[selectedPageInx + 1].style.display, rightPageTransition.style.display] = ['flex', 'flex'];
    }
    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    rightPageTransition.classList.add("is-active");
    rightPageTransition.classList.add("animation");
    setTimeout(() => {
        rightPageTransition.classList.remove('is-active');
        [leftSide.style.height, rightSide.style.height] = ['100%', '100%'];
    }, 5);
}

nextArrowBtn.forEach((el, inx) => {
    el.addEventListener('click', () => {
        const [currentPageInx, selectedPageInx] = [inx, inx + 1];
        pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
    });
})