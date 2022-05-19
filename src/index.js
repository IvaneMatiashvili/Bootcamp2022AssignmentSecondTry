// @ts-check

/**
 * Welcome to index.js
 * 
 * @author Ivane Matishvili
 * 
 * @property {style} - Important to read: We use this because the document.querySelector method 
 * (or most of the other DOM methods we need to use to retrieve HTML elements)
 * is Element or null and the style property doesn't exist on the Element type.
 * HTML DOM style property already exists in DOM and returns a CSSStyleDeclaration object,
 * so we just connect the DOM style property and the Element.
 * If we want to use ts-check, we will be forced to utilize methods like this, otherwise, TS gives us errors.
 * 
 * This is the safest method to utilize DOM style property with ts-check in javascript.
 */

/**
 * With this variable, we have access to every page that has a '.pages' class
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */

const pages = document.querySelectorAll('.pages');

/**
 * With this variable, we have access to the left side of every page that has a '.left-side' class
 * @type {HTMLElement}
 * @property {style}
 * 
 */

const leftSide = document.querySelector('.left-side');

/**
 * With this variable, we have access to the right side of every page that has a '.right-side' class
 * @type {HTMLElement}
 * @property {style}
 * 
 */

const rightSide = document.querySelector('.right-side');

/**
 * With this variable, we have access to the right arrow buttons
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */

const nextArrowBtn = document.querySelectorAll('.go-next');

/**
 * With this variable, we have access to the left arrow buttons
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */

const goBackArrowBtn = document.querySelectorAll('.go-back');


const { log: l } = console;

/**
 * This function provides slideshow and navigation
 * features on the pages to the right
 * 
 * @param {number} currentPageInx - The index of the current page where the navigation button is located
 * @param {number} selectedPageInx - The index of the page that the customer wants to appear
 * 
 */

export const pageRightSlideAnimation = (currentPageInx, selectedPageInx) => {
    /**
     * With this variable, we have access to an empty div element that has a '.transition' class
     * @type {HTMLElement}
     * @property {style}
     */

    let rightPageTransition = document.querySelector('.transition');

    currentPageInx = currentPageInx + 1;
    selectedPageInx = selectedPageInx + 1;
    rightPageTransition = pages[currentPageInx];

    pages[currentPageInx].style.display = 'none';
    pages[selectedPageInx].classList.remove('left-animation');
    pages[selectedPageInx].classList.remove('right-animation');

    if (selectedPageInx === 1) {
        [pages[selectedPageInx]['style'].display, rightPageTransition.style.display] = ['flex', 'block'];
        [leftSide['style'].height, rightSide['style'].height] = ['100vh', '100vh'];
    } else if (selectedPageInx === 5) {
        [pages[selectedPageInx]['style'].display, rightPageTransition['style'].display] = ['block', 'flex'];
        [leftSide['style'].height, rightSide['style'].height] = ['100vh', '100vh'];
    } else {
        [pages[selectedPageInx]['style'].display, rightPageTransition['style'].display] = ['flex', 'flex'];
    }

    rightPageTransition.classList.add('right-is-active');
    rightPageTransition.classList.add('right-animation');

    setTimeout(() => {
        rightPageTransition.classList.remove('right-is-active');
        [leftSide['style'].height, rightSide['style'].height] = ['100%', '100%'];
    }, 5);
}

/**
 * This function provides slideshow and navigation
 * features on the pages to the left
 * 
 * @param {number} currentPageInx - The index of the current page where the navigation button is located
 * @param {number} selectedPageInx - The index of the page that the customer wants to appear
 * 
 */

export const pageLeftSlideAnimation = (currentPageInx, selectedPageInx) => {
    let leftPageTransition = document.querySelector('.transition');

    currentPageInx = currentPageInx + 1;
    selectedPageInx = selectedPageInx + 1;
    leftPageTransition = pages[currentPageInx];

    pages[currentPageInx]['style'].display = 'none';
    pages[selectedPageInx].classList.remove('left-animation');
    pages[selectedPageInx].classList.remove('right-animation');

    if (selectedPageInx === 4) {
        [pages[selectedPageInx]['style'].display, leftPageTransition['style'].display] = ['flex', 'block'];
        [leftSide['style'].height, rightSide['style'].height] = ['100vh', '100vh'];
    } else if (selectedPageInx === 0) {
        [pages[selectedPageInx]['style'].display, leftPageTransition['style'].display] = ['block', 'flex'];
        [leftSide['style'].height, rightSide['style'].height] = ['100vh', '100vh'];
    } else {
        [pages[selectedPageInx]['style'].display, leftPageTransition['style'].display] = ['flex', 'flex'];
    }

    leftPageTransition.classList.add('left-is-active');
    leftPageTransition.classList.add('left-animation');

    setTimeout(() => {
        leftPageTransition.classList.remove('left-is-active');
        [leftSide['style'].height, rightSide['style'].height] = ['100%', '100%'];
    }, 5);
}


/**
 * This function adds a `'click' event listener` to an arrow button and
 * executes a 'pageTransitionAndNavigation function' for each arrow buttons 
 * @param {NodeListOf<Element>} arrowBtn
 * 
 */

const addEventListenerForArrowButtons = (arrowBtn) => {

    arrowBtn.forEach((el, inx) => {
        el.addEventListener('click', () => {
            if (arrowBtn === nextArrowBtn) {
                const [currentPageInx, selectedPageInx] = [inx, inx + 1];
                pageRightSlideAnimation(currentPageInx, selectedPageInx);
            } else {
                const [currentPageInx, selectedPageInx] = [inx, inx - 1];
                pageLeftSlideAnimation(currentPageInx, selectedPageInx);

            }
        });
    })
}

addEventListenerForArrowButtons(nextArrowBtn);
addEventListenerForArrowButtons(goBackArrowBtn);
