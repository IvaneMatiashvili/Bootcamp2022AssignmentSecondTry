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


// Declare variables that will be frequently used

/**
 * 
 * With this variable, we have access to every page that has a '.pages' class.
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const pages = document.querySelectorAll('.pages');

/**
 * 
 * With this variable, we have access to the left side of every page that has a '.left-side' class.
 * 
 * @type {object}
 * @property {style}
 * 
 */
const leftSide = document.querySelector('.left-side');

/**
 * 
 * With this variable, we have access to the right side of every page that has a '.right-side' class.
 * 
 * @type {HTMLElement}
 * @property {style}
 * 
 */
const rightSide = document.querySelector('.right-side');

/**
 * 
 * With this variable, we have access to the right arrow buttons.
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const nextArrowBtn = document.querySelectorAll('.go-next');

/**
 * 
 * With this variable, we have access to the left arrow buttons.
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const goBackArrowBtn = document.querySelectorAll('.go-back');

const validationError = document.querySelectorAll('.validation-error');
const firstError = document.querySelectorAll('.first-error');
const secondError = document.querySelectorAll('.second-error');

export const globalValidationCounter = new Array(4).fill(0);


// start adding features

const { log: l } = console;

export const pageReload = (pageIndex, displayValue) => {

    if (localStorage.getItem('page-reload')) {

        if (+localStorage.getItem('page-reload') === pageIndex) {
            pages.forEach((el, idx) => {
                if (pageIndex + 1 === idx) {
                    el.style.display = displayValue;
                } else {
                    el.style.display = 'none';
                }
            })
        }
    }
}


/**
 * 
 * This function provides a pages slideshow and navigation features.
 * 
 * @param {number} currentPageInx - The index of the current page where the navigation button is located
 * @param {number} selectedPageInx - The index of the page that the customer wants to appear
 * 
 */
export const pageTransitionAndNavigation = (currentPageInx, selectedPageInx) => {

    /**
     * 
     * With this variable, we have access to an empty div element that has a '.transition' class.
     * 
     * @type {HTMLElement}
     * @property {style}
     * 
     */
    let PageTransitionAndNav = document.querySelector('.transition');

    /**
     * 
     * With this variable, we have access to an empty div element that has a '.selected-page-transition' class.
     * 
     * @type {HTMLElement}
     * @property {style}
     * 
     */
    let selectedPageTransitionAndNavigation = document.querySelector('.selected-page-transition');

    currentPageInx = currentPageInx + 1;
    selectedPageInx = selectedPageInx + 1;

    PageTransitionAndNav = pages[currentPageInx];
    pages[currentPageInx].style.display = 'none';

    selectedPageTransitionAndNavigation = pages[selectedPageInx];

    pages[selectedPageInx].classList.remove('left-animation');
    pages[selectedPageInx].classList.remove('right-animation');


    if (selectedPageInx > currentPageInx) {

        /**
         * 
         *If the selected page index is higher than the current page index, this means that we need to navigate right,
         *so this "IIFE" function provides slideshow and navigation features on the pages to the right.
         *
         */
        (function pageRightSlideAnimationAndNavigation() {

            switch (selectedPageInx) {

                case 1:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['flex', 'block'];
                    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
                    break;

                case 5:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['block', 'flex'];
                    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
                    break;

                default:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['flex', 'flex'];
            }

            PageTransitionAndNav.classList.add('right-animation');
            PageTransitionAndNav.classList.add('right-is-active');

            selectedPageTransitionAndNavigation.classList.add('selected-page-right-animation');
            selectedPageTransitionAndNavigation.classList.add('selected-page-right-animation-is-active');
        })();

    } else {

        /**
         * 
         *in the else statement the selected page index is less than the current page index, this means that we need to navigate left,
         *so this "IIFE" function provides slideshow and navigation features on the pages to the left.
         *
         */
        (function PageLeftSlideAnimationAndNavigation() {

            switch (selectedPageInx) {
                case 4:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['flex', 'block'];
                    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
                    break;

                case 0:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['block', 'flex'];
                    [leftSide.style.height, rightSide.style.height] = ['100vh', '100vh'];
                    break;

                default:
                    [pages[selectedPageInx].style.display, PageTransitionAndNav.style.display] = ['flex', 'flex'];
                    break;
            }

            PageTransitionAndNav.classList.add('left-animation');
            PageTransitionAndNav.classList.add('left-is-active');

            selectedPageTransitionAndNavigation.classList.add('selected-page-left-animation');
            selectedPageTransitionAndNavigation.classList.add('selected-page-left-animation-is-active');
        })();
    }

    setTimeout(() => {
        PageTransitionAndNav.classList.remove('right-is-active');
        PageTransitionAndNav.classList.remove('left-is-active');
        selectedPageTransitionAndNavigation.classList.remove('selected-page-right-animation-is-active');
        selectedPageTransitionAndNavigation.classList.remove('selected-page-left-animation-is-active');
    }, 5);

    setTimeout(() => {
        selectedPageTransitionAndNavigation.classList.remove('selected-page-right-animation');
        selectedPageTransitionAndNavigation.classList.remove('selected-page-left-animation');
        PageTransitionAndNav.style.display = 'none';
        [leftSide.style.height, rightSide.style.height] = ['100%', '100%'];
    }, 500);
}


/**
 * 
 * This function adds a `'click' event listener` to an arrow buttons and
 * executes a 'pageTransitionAndNavigation' function for each arrow buttons.
 * 
 * @param {NodeListOf<Element>} arrowBtn
 * 
 */
const addEventListenerForArrowButtons = (arrowBtn) => {

    arrowBtn.forEach((el, inx) => {
        el.addEventListener('click', () => {
            if (arrowBtn === nextArrowBtn) {
                const [currentPageInx, selectedPageInx] = [inx, inx + 1];
                if (globalValidationCounter[currentPageInx] === 1) {

                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);

                    localStorage.setItem('page-reload', `${selectedPageInx}`);

                }
            } else {
                const [currentPageInx, selectedPageInx] = [inx, inx - 1];
                pageTransitionAndNavigation(currentPageInx, selectedPageInx);

                localStorage.setItem('page-reload', `${selectedPageInx}`);

            }
        });
    })
}

addEventListenerForArrowButtons(nextArrowBtn);
addEventListenerForArrowButtons(goBackArrowBtn);


export const validator = (textValue, element, idx, elementType) => {
    switch (elementType) {
        case 'name':
            if (textValue.length < 1) {

                firstError[idx].style.display = 'block';
                secondError[idx].style.display = 'none';

                element.classList.add('error');

            } else if (textValue.length === 1) {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'block';

                element.classList.add('error');

            } else {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'none';

                element.classList.remove('error');
                return true;
            }
            break;

        case 'email':
            if (textValue === '') {
                firstError[idx].style.display = 'block';
                secondError[idx].style.display = 'none';

                element.classList.add('error');
            } else if (!emailValidator(textValue)) {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'block';

                element.classList.add('error');
            } else {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'none';

                element.classList.remove('error');
                return true;
            }
            break;

        case 'phone':
            if (textValue === '') {
                firstError[idx].style.display = 'block';
                secondError[idx].style.display = 'none';

                element.classList.add('error');
            } else if (!phoneValidator(textValue)) {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'block';

                element.classList.add('error');
            } else {
                firstError[idx].style.display = 'none';
                secondError[idx].style.display = 'none';

                element.classList.remove('error');
                return true;
            }

            break;

        case 'date':
            if (textValue.length < 10) {

                firstError[idx].style.display = 'block';
                element.classList.add('error');

            } else {
                firstError[idx].style.display = 'none';
                element.classList.remove('error');
                return true;
            }
            break;

        default:
            if (textValue === '') {
                firstError[idx].style.display = 'block';
                element.classList.add('error');
            } else {
                firstError[idx].style.display = 'none';
                element.classList.remove('error');
                return true;
            }
    }
}


const emailValidator = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const phoneValidator = (phone) => {
    if (phone.slice(0, 5) === "+9955" &&
        phone.length === 13 && !isNaN(+phone.substring(1))) {
        return true;
    } else {
        return false;
    }
}

