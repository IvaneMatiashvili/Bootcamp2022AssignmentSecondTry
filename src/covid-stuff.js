//@ts-check
import { globalValidationCounter, pageReload, pageTransitionAndNavigation, validator } from './index.js';

// Declare variables that will be frequently used



/**
 * @type {object}
 * @property {style}
 */

const covidStuffPage = document.querySelector('.third-page');
/**
 * @type {object}
 * @property {style}
 */

const questionsList = document.querySelector('.questions-list');
/**
 * @type {object}
 * @property {style}
 */

const workLocationForm = document.querySelector('.work-location-form');

/**
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */

const workLocation = document.querySelectorAll('.work-location');

/**
 * @type {object}
 * @property {style}
 */

const covidForm = document.querySelector('.covid-form');

/**
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const covid = document.querySelectorAll('.covid');

/**
 * @type {object}
 * @property {style}
 */
const covidDate = document.querySelector('.covid-date');

/**
 * @type {object}
 * @property {style}
 */

const vaccinateForm = document.querySelector('.vaccinate-form');

/**
 * 
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const vaccinated = document.querySelectorAll('.vaccinated');

/**
 * @type {object}
 * @property {style}
 */
const vaccinatedDate = document.querySelector('.vaccinated-date')


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

const covidStuffPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'flex');
    }
}
covidStuffPageReload();


const covidStuffPageLocalStorage = () => {

    checkAnswersLocalStorage(workLocation, 'work-Location');
    checkAnswersLocalStorage(covid, 'covid');

    covidDate.addEventListener('input', () => {
        localStorage.setItem("covid-date", `${covidDate.value.trim()}`);
    });

    covidDate.value = localStorage.getItem("covid-date");

    checkAnswersLocalStorage(vaccinated, 'vaccinated');

    vaccinatedDate.addEventListener('input', () => {
        localStorage.setItem("vaccinated-date", `${vaccinatedDate.value.trim()}`);
    });

    vaccinatedDate.value = localStorage.getItem("vaccinated-date");

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

covidStuffPageLocalStorage();


const covidStuffPageValidationCounter = new Array(5).fill(0);

const covidPageValidator = () => {
    let workLocationIndex = 5;
    covidPageInputLabelValidator(workLocation, questionsList, workLocationIndex, 'work-location', workLocationForm);

    let covidIndex = 6;
    covidPageInputLabelValidator(covid, questionsList, covidIndex, 'covid', covidForm);
    covidPageCheckAnswers(covid, covidForm);

    let covidDateIndex = 7;
    let covidDateValue = '';

    dateValidator(covidDate, covidDateIndex, covidDateValue, 'date');

    let vaccinatedIndex = 8;
    covidPageInputLabelValidator(vaccinated, questionsList, vaccinatedIndex, 'vaccinated', vaccinateForm);
    covidPageCheckAnswers(vaccinated, vaccinateForm);

    let vaccinatedDateIndex = 9;
    let vaccinatedDateValue = '';

    dateValidator(vaccinatedDate, vaccinatedDateIndex, vaccinatedDateValue, 'date');


    checkValidationCounterArrSum();
}


const covidPageInputLabelValidator = (element, elementList, index, elementType, elementForm) => {
    let clickCounter = 0;
    let elementValue = '';



    element.forEach(el => {

        if (el.checked) {
            clickCounter++;
            elementValue = el?.value.trim();
            validator(elementValue, elementList, index, elementType);
            clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');

            if (validator(elementValue, elementList, index, elementType) === true) {

                covidStuffPageValidationCounter[index - 5] = 1;
                checkValidationCounterArrSum();

            } else {

                covidStuffPageValidationCounter[index - 5] = 0;
                checkValidationCounterArrSum();
            }

            if (el.value === 'NO') {
                covidStuffPageValidationCounter[index - 5 + 1] = 1;
                checkValidationCounterArrSum();
            } else {
                covidStuffPageValidationCounter[index - 5 + 1] = 0;
                checkValidationCounterArrSum();

            }

        } else {
            el.addEventListener('click', () => {
                clickCounter++;
                elementValue = el?.value.trim();
                validator(elementValue, elementList, index, elementType);
                clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');

                if (validator(elementValue, elementList, index, elementType) === true) {

                    covidStuffPageValidationCounter[index - 5] = 1;
                    checkValidationCounterArrSum();


                } else {

                    covidStuffPageValidationCounter[index - 5] = 0;
                    checkValidationCounterArrSum();

                }


                if (el.value === 'NO') {
                    covidStuffPageValidationCounter[index - 5 + 1] = 1;
                    checkValidationCounterArrSum();
                } else {
                    covidStuffPageValidationCounter[index - 5 + 1] = 0;
                    checkValidationCounterArrSum();

                }

            })
        }
    })
}

const dateValidator = (element, elementIndex, elementValue, elementType) => {


    if (element?.value.trim() !== '') {
        elementValue = element.value.trim();
        validator(elementValue, element, elementIndex, elementType);

        if (validator(elementValue, element, elementIndex, elementType) === true) {

            covidStuffPageValidationCounter[elementIndex - 5] = 1;
            checkValidationCounterArrSum();

        } else {

            covidStuffPageValidationCounter[elementIndex - 5] = 0;
            checkValidationCounterArrSum();

        }
    } else {

        element?.addEventListener('input', () => {
            elementValue = element.value.trim();
            validator(elementValue, element, elementIndex, elementType);

            if (validator(elementValue, element, elementIndex, elementType) === true) {

                covidStuffPageValidationCounter[elementIndex - 5] = 1;
                checkValidationCounterArrSum();

            } else {

                covidStuffPageValidationCounter[elementIndex - 5] = 0;
                checkValidationCounterArrSum();

            }
        })
    }

    element?.addEventListener('input', () => {
        elementValue = element.value.trim();
        validator(elementValue, element, elementIndex, elementType);

        if (validator(elementValue, element, elementIndex, elementType) === true) {

            covidStuffPageValidationCounter[elementIndex - 5] = 1;
            checkValidationCounterArrSum();

        } else {

            covidStuffPageValidationCounter[elementIndex - 5] = 0;
            checkValidationCounterArrSum();

        }
    })

}

const checkValidationCounterArrSum = () => {
    if (covidStuffPageValidationCounter.reduce((a, b) => a + b, 0) === 5) {
        globalValidationCounter[2] = 1;

    } else {

        globalValidationCounter[2] = 0;

    }

}

const covidPageCheckAnswers = (element, elementForm) => {

    element?.forEach(el => {
        let inputDateForm = elementForm.nextElementSibling.nextElementSibling;
        let inputDate = inputDateForm.children[1];
        let inputDateError = elementForm.nextElementSibling.nextElementSibling.nextElementSibling;

        if (el.checked && el.value.trim() === 'YES') {

            inputDateForm.style.display = 'block';

            if (inputDate.value.trim().length < 10) {
                inputDateError.style.display = 'block';
            }

            inputDate.addEventListener('input', () => {
                if (inputDate.value.trim().length < 10) {

                    inputDateError.style.display = 'block';
                }
            })

        } else if (el.checked && el.value.trim() === 'NO') {
            inputDateForm.style.display = 'none';
            inputDateError.style.display = 'none';
        }

        el.addEventListener('click', () => {
            if (el.checked && el.value.trim() === 'YES') {
                inputDateForm.style.display = 'block';

                if (inputDate.value.trim().length < 10) {

                    inputDateError.style.display = 'block';
                }

                inputDate.addEventListener('input', () => {

                    if (inputDate.value.trim().length < 10) {

                        inputDateError.style.display = 'block';
                    }
                })
            } else {
                inputDateForm.style.display = 'none';
                inputDateError.style.display = 'none';
            }
        })

    })
}


covidPageValidator();



(/**
 * This "IIFE" function adds a `'click' event listener` to a third page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each third page navigation buttons 
 * @param {NodeListOf<Element>} btn
 */
    function addThirdPageNavBtnClickEventListener(btn) {
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
    })(thirdPageNavBtn);