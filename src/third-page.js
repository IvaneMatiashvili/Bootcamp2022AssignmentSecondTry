//@ts-check
import { pageTransitionAndNavigation } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

/**
 * With this variable, we have access to the third page navigation buttons
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 */
const thirdPageNavBtn = document.querySelectorAll('.third-page-nav');

/**
 * current page index
 * @type {number}
 */
const currentPageInx = 2;

/**
 * 
 * start adding features
 * 
 */

const { log: l } = console;

(/**
 * This "IIFE" function adds a `'click' event listener` to a third page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each third page navigation buttons 
 * @param {NodeListOf<Element>} thirdPageNavBtn
 */
    function addThirdPageNavBtnClickEventListener(btn) {
        btn.forEach((el, inx) => {
            if (inx !== currentPageInx) {
                el.addEventListener('click', () => {
                    const selectedPageInx = inx;
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(thirdPageNavBtn);