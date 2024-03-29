//@ts-check
import { globalValidationCounter, pageReload, pageTransitionAndNavigation, validator } from './index.js';

//Declare variables that will be frequently used



/**
 * @type {object}
 * @property {style}
 */
const tellUsPage = document.querySelector('.fourth-page ');

/**
 * @type {object}
 * @property {style}
 */
const devtalksForm = document.querySelector('.devtalks-form');

/**
 * @type {NodeListOf<object>}
 * @property {style}
 */
const devtalk = document.querySelectorAll('.devtalk');

/**
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 */
const textareaBlur = document.querySelectorAll('.textarea-blur');

/**
 * @type {object}
 * @property {style}
 */
const speakAboutDevtalks = document.querySelector('.speak-about-devtalks');

/**
 * @type {object}
 * @property {style}
 */
const userMessageAboutDevtalks = document.querySelector('.user-message-about-devtalks');

/**
 * @type {object}
 * @property {style}
 */
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


const tellUsPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'flex');
    }
}
tellUsPageReload();


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


const tellUsPageLocalStorage = () => {

    checkAnswersLocalStorage(devtalk, 'devtalk');

    userMessageAboutDevtalks.addEventListener('input', () => {
        localStorage.setItem("user-message-about-devtalk", `${userMessageAboutDevtalks.value.trim()}`);
    });

    userMessageAboutDevtalks.value = localStorage.getItem("user-message-about-devtalk");

    tellUsSomething.addEventListener('input', () => {
        localStorage.setItem("tell-us-something", `${tellUsSomething.value.trim()}`);
    });

    tellUsSomething.value = localStorage.getItem("tell-us-something");
}

const checkAnswersLocalStorage = (parentElement, name) => {

    parentElement?.forEach(el => {
        if (localStorage.getItem(name) && el.value.trim() === localStorage.getItem(name)) {
            el.checked = true;
        }
        el.addEventListener('click', () => {
            if (localStorage.getItem(name) && el.value.trim() === localStorage.getItem(name)) {
                el.checked = true;
            }
            if (el.checked) {
                localStorage.setItem(name, `${el.value.trim()}`);
            }
        });
    });
}

tellUsPageLocalStorage();


const tellUsPageValidationCounter = new Array(3).fill(0);


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


            if (validator(elementValue, elementForm, index, elementType) === true) {
                tellUsPageValidationCounter[index - 10] = 1;
                checkValidationCounterArrSum();
            } else {
                tellUsPageValidationCounter[index - 10] = 0;
                checkValidationCounterArrSum();
            }

            if (el.value === 'NO') {

                tellUsPageValidationCounter[index - 10 + 1] = 1;
                checkValidationCounterArrSum();

            } else {

                tellUsPageValidationCounter[index - 10 + 1] = 0;
                checkValidationCounterArrSum();

            }


        } else {
            el.addEventListener('click', () => {
                clickCounter++;
                elementValue = el?.value.trim();
                validator(elementValue, elementForm, index, elementType);
                clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');


                if (validator(elementValue, elementForm, index, elementType) === true) {
                    tellUsPageValidationCounter[index - 10] = 1;
                    checkValidationCounterArrSum();
                } else {
                    tellUsPageValidationCounter[index - 10] = 0;
                    checkValidationCounterArrSum();
                }

                if (el.value === 'NO') {

                    tellUsPageValidationCounter[index - 10 + 1] = 1;
                    checkValidationCounterArrSum();

                } else {

                    tellUsPageValidationCounter[index - 10 + 1] = 0;
                    checkValidationCounterArrSum();

                }

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

        if (validator(elementValue, element, elementIndex, 'textarea') === true) {
            tellUsPageValidationCounter[elementIndex - 10] = 1;
            checkValidationCounterArrSum();
        } else {
            tellUsPageValidationCounter[elementIndex - 10] = 0;
            checkValidationCounterArrSum();
        }
    })

    if (validator(elementValue, element, elementIndex, 'textarea') === true) {
        tellUsPageValidationCounter[elementIndex - 10] = 1;
        checkValidationCounterArrSum();
    }

    if (validator(elementValue, element, elementIndex, 'textarea') !== true) {
        tellUsPageValidationCounter[elementIndex - 10] = 0;
        checkValidationCounterArrSum();
    }

}


const checkValidationCounterArrSum = () => {
    if (tellUsPageValidationCounter.reduce((a, b) => a + b, 0) === 3) {
        globalValidationCounter[3] = 1;

    } else {

        globalValidationCounter[3] = 0;

    }
}

tellUsPageValidator();

const tellUsPageCheckAnswers = () => {
    let countLocalStorageInfo = 0;

    devtalk?.forEach(el => {

        let textarea = speakAboutDevtalks;
        let textareaError = speakAboutDevtalks.nextElementSibling;

        if (el.checked && el.value.trim() === 'YES') {

            textarea.style.display = 'block';
            countLocalStorageInfo++;

            if (userMessageAboutDevtalks.value.trim().length < 1) {
                textareaError.style.display = 'block';
            }

            userMessageAboutDevtalks.addEventListener('input', () => {
                if (userMessageAboutDevtalks.value.trim().length < 1) {

                    textareaError.style.display = 'block';
                }
            })

        } else if (el.checked && el.value.trim() === 'NO') {
            countLocalStorageInfo++;

            textarea.style.display = 'none';
            textareaError.style.display = 'none';

        } else if (countLocalStorageInfo < 1) {
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

                    if (inx > currentPageInx) {
                        let sum = 0;

                        globalValidationCounter.forEach((elm, idx) => {
                            if (idx < selectedPageInx) {
                                sum += elm;
                            }
                        })

                        if (sum === selectedPageInx) {

                            pageTransitionAndNavigation(currentPageInx, selectedPageInx);

                            localStorage.setItem('page-reload', `${selectedPageInx}`);
                        }
                    } else {

                        pageTransitionAndNavigation(currentPageInx, selectedPageInx);

                        localStorage.setItem('page-reload', `${selectedPageInx}`);
                    }
                });
            }
        })
    })(fourthPageNavBtn);