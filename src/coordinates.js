//@ts-check
import { globalValidationCounter, pageReload, pageTransitionAndNavigation, validator } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const phone = document.querySelector('.phone');

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

const coordinatesPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'flex');
    }
}
coordinatesPageReload();


const coordinatesPageLocalStorage = () => {

    firstName.addEventListener('input', () => {
        localStorage.setItem("first-name", `${firstName.value.trim()}`);
    });

    firstName.value = localStorage.getItem("first-name");

    lastName.addEventListener('input', () => {
        localStorage.setItem("last-name", `${lastName.value.trim()}`);

    });

    lastName.value = localStorage.getItem("last-name");

    email.addEventListener('input', () => {
        localStorage.setItem("email", `${email.value.trim()}`);

    });

    email.value = localStorage.getItem("email");

    phone.addEventListener('input', () => {
        localStorage.setItem("phone", `${phone.value.trim()}`);

    });

    phone.value = localStorage.getItem("phone");

}

coordinatesPageLocalStorage();

const coordinatesPageValidationCounter = new Array(4).fill(0);

const coordinatesPageValidator = () => {

    let firstNameValue = firstName.value.trim();
    let firstNameIndex = 0;

    validator(firstNameValue, firstName, firstNameIndex, 'name');

    if (validator(firstNameValue, firstName, firstNameIndex, 'name') === true) {
        coordinatesPageValidationCounter[0] = 1;
    } else {
        coordinatesPageValidationCounter[0] = 0;
    }

    firstName.addEventListener('input', () => {
        firstNameValue = firstName.value.trim();
        validator(firstNameValue, firstName, firstNameIndex, 'name');

        if (validator(firstNameValue, firstName, firstNameIndex, 'name') === true) {
            coordinatesPageValidationCounter[0] = 1;
        } else {

            coordinatesPageValidationCounter[0] = 0;
        }

        checkValidationCounterArrSum();
    });

    let lastNameValue = lastName.value.trim()
    let lastNameIndex = 1;

    validator(lastNameValue, lastName, lastNameIndex, 'name');

    if (validator(lastNameValue, lastName, lastNameIndex, 'name') === true) {
        coordinatesPageValidationCounter[1] = 1;
    } else {
        coordinatesPageValidationCounter[1] = 0;
    }

    lastName.addEventListener('input', () => {
        lastNameValue = lastName.value.trim()
        validator(lastNameValue, lastName, lastNameIndex, 'name');

        if (validator(lastNameValue, lastName, lastNameIndex, 'name') === true) {
            coordinatesPageValidationCounter[1] = 1;

        } else {
            coordinatesPageValidationCounter[1] = 0;
        }

        checkValidationCounterArrSum()
    });

    let emailValue = email.value.trim()
    let emailIndex = 2;

    validator(emailValue, email, emailIndex, 'email');

    if (validator(emailValue, email, emailIndex, 'email') === true) {
        coordinatesPageValidationCounter[2] = 1;
    } else {
        coordinatesPageValidationCounter[2] = 0;
    }

    email.addEventListener('input', () => {
        emailValue = email.value.trim()
        validator(emailValue, email, emailIndex, 'email');

        if (validator(emailValue, email, emailIndex, 'email') === true) {
            coordinatesPageValidationCounter[2] = 1;
        } else {
            coordinatesPageValidationCounter[2] = 0;
        }

        checkValidationCounterArrSum()
    });

    let phoneValue = phone.value.trim()
    let phoneIndex = 3;

    validator(phoneValue, phone, phoneIndex, 'phone');

    if (validator(phoneValue, phone, phoneIndex, 'phone') === true) {
        coordinatesPageValidationCounter[3] = 1;
    } else {
        coordinatesPageValidationCounter[3] = 0;
    }

    phone.addEventListener('input', () => {
        let phoneValue = phone.value.trim()
        let index = 3;
        validator(phoneValue, phone, phoneIndex, 'phone');

        if (validator(phoneValue, phone, phoneIndex, 'phone') === true) {
            coordinatesPageValidationCounter[3] = 1;
        } else {
            coordinatesPageValidationCounter[3] = 0;
        }

        checkValidationCounterArrSum();
    });

    checkValidationCounterArrSum();
}

const checkValidationCounterArrSum = () => {
    if (coordinatesPageValidationCounter.reduce((a, b) => a + b, 0) === 4) {
        globalValidationCounter[0] = 1;
    } else {
        globalValidationCounter[0] = 0;
    }

}

coordinatesPageValidator();


(/**
 * This "IIFE" function adds a `'click' event listener` to a first page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each first page navigation buttons 
 * @param {NodeListOf<Element>} btn
 */
    function addFirstPageNavBtnClickEventListener(btn) {

        btn.forEach((el, inx) => {
            if (inx > currentPageInx) {
                el.addEventListener('click', () => {
                    let sum = 0;
                    const selectedPageInx = inx;

                    globalValidationCounter.forEach((elm, idx) => {
                        if (idx < selectedPageInx) {
                            sum += elm;
                        }
                    })

                    if (sum === selectedPageInx) {

                        pageTransitionAndNavigation(currentPageInx, selectedPageInx);

                        localStorage.setItem('page-reload', `${selectedPageInx}`);
                    }
                });
            }
        })
    })(firstPageNavBtn);
