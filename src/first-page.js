//@ts-check
import pageTransitionAndNavigation from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

/**
 * With this variable, we have access to the first page navigation buttons.
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 */
const firstPageNavBtn = document.querySelectorAll('.first-page-nav');


/**
 * current page index
 * 
 * @type {number}
 */
const currentPageInx = 0;

/**
 * 
 * start adding features
 * 
 */

const { log: l } = console;


(/**
 * This "IIFE" function adds a `'click' event listener` to a first page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each first page navigation buttons 
 * @param {NodeListOf<Element>} btn
 */
    function addFirstPageNavBtnClickEventListener(btn) {
        btn.forEach((el, inx) => {
            if (inx > currentPageInx) {
                el.addEventListener('click', () => {
                    const selectedPageInx = inx;
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(firstPageNavBtn);
