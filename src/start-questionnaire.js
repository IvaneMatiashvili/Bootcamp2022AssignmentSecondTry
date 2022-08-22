//@ts-check
import { pageReload, pageTransitionAndNavigation } from './index.js';

// Declare variables that will be frequently used


/**
 * 
 * With this variable, we have access to the start-questionnaire.
 * 
 * @type {HTMLElement}
 * @property {style}
 * 
 */
const startBtn = document.querySelector('.start-questionnaire');

/**
 * 
 * current page index.
 * 
 * @type {Array.<number>}
 * 
 */
const [currentPageInx, selectedPageInx] = [-1, 0];

// start adding features


const { log: l } = console;

const startPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'block');
    }
}
startPageReload();

(/**
 *
 * This "IIFE" function adds a `'click' event listener` to a start-questionnaire' button and
 * executes a 'pageTransitionAndNavigation' function for start-questionnaire button.
 * 
 * @param {HTMLElement} btn
 * 
 */
    function addStartBtnClickEventListener(btn) {
        btn.addEventListener('click', () => {
            pageTransitionAndNavigation(currentPageInx, selectedPageInx);

            localStorage.setItem('page-reload', `${selectedPageInx}`);
        })
    })(startBtn);

