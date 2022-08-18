//@ts-check
import { pageTransitionAndNavigation, validator } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */


const devtalksForm = document.querySelector('.devtalks-form');
const devtalk = document.querySelectorAll('.devtalk');
const textareaBlur = document.querySelectorAll('.textarea-blur');
const speakAboutDevtalks = document.querySelector('.speak-about-devtalks');
const userMessageAboutDevtalks = document.querySelector('.user-message-about-devtalks');
const tellUsSomething = document.querySelector('.tell-us-something');


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


const textareaOnBlur = () => {
    textareaBlur?.forEach(el => {

        el.style.paddingLeft = '2rem';
        el.style.paddingTop = '2rem';

        el.addEventListener("blur", () => {
            el.style.paddingLeft = '2rem';
            el.style.paddingTop = '2rem';
        });

        el.addEventListener("focusout", () => {
            el.style.paddingLeft = '2rem';
            el.style.paddingTop = '2rem';
        });
    })
}
textareaOnBlur();


const tellUsPageValidator = () => {
    let devtalksIndex = 10;
    tellUsPageInputLabelValidator(devtalk, devtalksIndex, 'work-location', devtalksForm);

    let userMessageAboutDevtalksIndex = 11;
    let userMessageAboutDevtalksValue = '';
    textAreaValidator(userMessageAboutDevtalks, userMessageAboutDevtalksIndex, userMessageAboutDevtalksValue);

    let tellUsSomethingIndex = 12;
    let tellUsSomethingValue = '';
    textAreaValidator(tellUsSomething, tellUsSomethingIndex, tellUsSomethingValue);

}


const tellUsPageInputLabelValidator = (element, index, elementType, elementForm) => {
    let clickCounter = 0;
    let elementValue = '';

    element.forEach(el => {

        if (el.checked) {
            clickCounter++;
            elementValue = el?.value.trim();
            validator(elementValue, elementForm, index, elementType);
            clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');
        } else {
            el.addEventListener('click', () => {
                clickCounter++;
                elementValue = el?.value.trim();
                validator(elementValue, elementForm, index, elementType);
                clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');
            })
        }
    })
}

const textAreaValidator = (element, elementIndex, elementValue) => {
    elementValue = element.value.trim();
    validator(elementValue, element, elementIndex, 'textarea');

    element?.addEventListener('input', () => {
        elementValue = element.value.trim();
        validator(elementValue, element, elementIndex, 'textarea');
    })
}

tellUsPageValidator();


const tellUsPageCheckAnswers = () => {
    devtalk?.forEach(el => {

        let textarea = speakAboutDevtalks;
        let textareaError = speakAboutDevtalks.nextElementSibling;

        if (el.checked && el.value.trim() === 'YES') {

            textarea.style.display = 'block';

            if (userMessageAboutDevtalks.value.trim().length < 1) {
                textareaError.style.display = 'block';
            }

            userMessageAboutDevtalks.addEventListener('input', () => {
                if (userMessageAboutDevtalks.value.trim().length < 1) {

                    textareaError.style.display = 'block';
                }
            })

        } else if (el.checked && el.value.trim() === 'NO') {

            textarea.style.display = 'none';
            textareaError.style.display = 'none';
        }

        el.addEventListener('click', () => {
            if (el.checked && el.value.trim() === 'YES') {
                textarea.style.display = 'block';

                if (userMessageAboutDevtalks.value.trim().length < 1) {
                    textareaError.style.display = 'block';
                }

                userMessageAboutDevtalks.addEventListener('input', () => {
                    if (userMessageAboutDevtalks.value.trim().length < 1) {

                        textareaError.style.display = 'block';
                    }
                })

            } else {
                textarea.style.display = 'none';
                textareaError.style.display = 'none';
            }
        })

    })
}

tellUsPageCheckAnswers();

(/**
 * This "IIFE" function adds a `'click' event listener` to a fourth page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each fourth page navigation buttons 
 * @param {NodeListOf<Element>} btn
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