//@ts-check
import pageTransitionAndNavigation from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

/**
 * With this variable, we have access to the second page navigation buttons
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 */
const secondPageNavBtn = document.querySelectorAll('.second-page-nav');

/**
 * current page index
 * @type {number}
 */
const currentPageInx = 1;

/**
 * 
 * start adding features
 * 
 */

const { log: l } = console;


(/**
 * This "IIFE" function adds a `'click' event listener` to a second page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each second page navigation buttons 
 * @param {NodeListOf<Element>} btn
 */
    function addSecondPageNavBtnClickEventListener(btn) {
        btn.forEach((el, inx) => {
            if (inx !== currentPageInx) {
                el.addEventListener('click', () => {
                    const selectedPageInx = inx;
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(secondPageNavBtn);