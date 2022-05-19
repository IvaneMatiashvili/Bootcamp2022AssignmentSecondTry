//@ts-check
import { pageTransitionAndNavigation } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

/**
 * With this variable, we have access to the go-back button 
 * @type {HTMLElement}
 * @property {style}
 */
const goBackBtn = document.querySelector('.go-back-btn');

/**
 * current page index
 * @type {Array.<number>}
 */
const [currentPageInx, selectedPageInx] = [4, 3];

/**
 * 
 * start adding features
 * 
 */

const { log: l } = console;

(/**
 * This "IIFE" function adds a `'click' event listener` to a go-back button and
 * executes a 'pageTransitionAndNavigation' function for go-back button
 * @param {NodeListOf<Element>} goBackBtn
 */
    function addGoBackBtnClickEventListener(btn) {
        btn.addEventListener('click', () => {
            pageTransitionAndNavigation(currentPageInx, selectedPageInx);
        });
    })(goBackBtn);