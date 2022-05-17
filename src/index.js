const { log: l } = console;
const pages = document.querySelectorAll('.pages');
const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');
const nextArrowBtn = document.querySelectorAll('.go-next');

export const pageRightSlideAnimation = (currentPageInx, selectedPageInx) => {
    let rightPageTransition = document.querySelector('.transition');
    
    currentPageInx = currentPageInx + 1;
    selectedPageInx = selectedPageInx + 1;
    rightPageTransition = pages[currentPageInx];

    pages[currentPageInx].style.display = 'none';
    pages[selectedPageInx].classList.remove('left-animation');
    pages[selectedPageInx].classList.remove('right-animation');

    if (selectedPageInx === 1) {
        [pages[selectedPageInx].style.display, rightPageTransition.style.display] = ['flex', 'block'];
        [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    } else if (selectedPageInx === 5) {
        [pages[selectedPageInx].style.display, rightPageTransition.style.display] = ['block', 'flex'];
        [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    } else {
        [pages[selectedPageInx].style.display, rightPageTransition.style.display] = ['flex', 'flex'];
    }

    rightPageTransition.classList.add('right-is-active');
    rightPageTransition.classList.add('right-animation');

    setTimeout(() => {
        rightPageTransition.classList.remove('right-is-active');
        [leftSide.style.height, rightSide.style.height] = ['100%', '100%'];
    }, 5);
}

export const pageLeftSlideAnimation = (currentPageInx, selectedPageInx) => {
    let leftPageTransition = document.querySelector('.transition');

    currentPageInx = currentPageInx + 1;
    selectedPageInx = selectedPageInx + 1;
    leftPageTransition = pages[currentPageInx];

    pages[currentPageInx].style.display = 'none';
    pages[selectedPageInx].classList.remove('left-animation');
    pages[selectedPageInx].classList.remove('right-animation');

    if (selectedPageInx === 4) {
        [pages[selectedPageInx].style.display, leftPageTransition.style.display] = ['flex', 'block'];
        [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    } else if (selectedPageInx === 0) {
        [pages[selectedPageInx].style.display, leftPageTransition.style.display] = ['block', 'flex'];
        [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
    } else {
        [pages[selectedPageInx].style.display, leftPageTransition.style.display] = ['flex', 'flex'];
    }

    leftPageTransition.classList.add('left-is-active');
    leftPageTransition.classList.add('left-animation');
    
    setTimeout(() => {
        leftPageTransition.classList.remove('left-is-active');
        [leftSide.style.height, rightSide.style.height] = ['100%', '100%'];
    }, 5);
}

nextArrowBtn.forEach((el, inx) => {
    el.addEventListener('click', () => {
        const [currentPageInx, selectedPageInx] = [inx, inx + 1];
        pageRightSlideAnimation(el, currentPageInx, selectedPageInx);
    });
})