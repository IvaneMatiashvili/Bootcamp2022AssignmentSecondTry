//@ts-check
import { pageReload, pageTransitionAndNavigation } from './index.js';

// Declare variables that will be frequently used



/**
 * @type {object}
 * @property {style}
 */
const startQuestionnairePage = document.querySelector('.start-page');

/**
 * @type {object}
 * @property {style}
 */
const submitPage = document.querySelector('.last-page');

/**
 * @type {object}
 * @property {style}
 */
const thanksPage = document.querySelector('.thanks');

/**
 * @type {object}
 * @property {style}
 */
const submit = document.querySelector('.submit');


/**
 * With this variable, we have access to the go-back button 
 * @type {object}
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

const submitPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'block');
    }
}
submitPageReload();

submit.addEventListener('click', () => {

    submitPage.style.display = 'none';
    thanksPage.style.display = 'block';

    setTimeout(function () {
        thanksPage.style.display = 'none';
        startQuestionnairePage.style.display = 'block';

        localStorage.setItem('page-reload', `-1`);
    }, 3000)

});

(/**
 * This "IIFE" function adds a `'click' event listener` to a go-back button and
 * executes a 'pageTransitionAndNavigation' function for go-back button
 * @param {Element} btn
 */
    function addGoBackBtnClickEventListener(btn) {
        btn.addEventListener('click', () => {
            pageTransitionAndNavigation(currentPageInx, selectedPageInx);

            localStorage.setItem('page-reload', `${selectedPageInx}`);
        });
    })(goBackBtn);