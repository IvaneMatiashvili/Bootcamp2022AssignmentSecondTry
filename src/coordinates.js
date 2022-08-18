//@ts-check
import { pageTransitionAndNavigation, validator } from './index.js';

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


const coordinatesPageValidator = () => {

    let firstNameValue = firstName.value.trim();
    let firstNameIndex = 0;

    validator(firstNameValue, firstName, firstNameIndex, 'name');

    firstName.addEventListener('input', () => {
        firstNameValue = firstName.value.trim();
        validator(firstNameValue, firstName, firstNameIndex, 'name');
    });

    let lastNameValue = lastName.value.trim()
    let lastNameIndex = 1;

    validator(lastNameValue, lastName, lastNameIndex, 'name');

    lastName.addEventListener('input', () => {
        lastNameValue = lastName.value.trim()
        validator(lastNameValue, lastName, lastNameIndex, 'name');
    });

    let emailValue = email.value.trim()
    let emailIndex = 2;

    validator(emailValue, email, emailIndex, 'email');

    email.addEventListener('input', () => {
        emailValue = email.value.trim()
        validator(emailValue, email, emailIndex, 'email');
    });

    let phoneValue = phone.value.trim()
    let phoneIndex = 3;

    validator(phoneValue, phone, phoneIndex, 'phone');

    phone.addEventListener('input', () => {
        let phoneValue = phone.value.trim()
        let index = 3;
        validator(phoneValue, phone, phoneIndex, 'phone');
    });
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
                    const selectedPageInx = inx;
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(firstPageNavBtn);
