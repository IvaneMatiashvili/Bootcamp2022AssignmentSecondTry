//@ts-check
import { pageTransitionAndNavigation } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

/**
 * With this variable, we have access to the fourth page navigation buttons
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 */
const fourthPageNavBtn = document.querySelectorAll('.fourth-page-nav');

/**
 * current page index
 * @type {number}
 */
const currentPageInx = 3;

/**
 * 
 * start adding features
 * 
 */

const { log: l } = console;

(/**
 * This "IIFE" function adds a `'click' event listener` to a fourth page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each fourth page navigation buttons 
 * @param {NodeListOf<Element>} fourthPageNavBtn
 */
    function addFourthPageNavBtnClickEventListener(btn) {
        btn.forEach((el, inx) => {
            if (inx !== currentPageInx) {
                el.addEventListener('click', () => {
                    const selectedPageInx = inx;
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(fourthPageNavBtn);