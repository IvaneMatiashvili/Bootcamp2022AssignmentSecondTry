//@ts-check
import { pageTransitionAndNavigation, validator } from './index.js';

/**
 * 
 * Declare variables that will be frequently used
 * 
 */

const questionsList = document.querySelector('.questions-list');

const workLocationForm = document.querySelector('.work-location-form');
const workLocation = document.querySelectorAll('.work-location');

const covidForm = document.querySelector('.covid-form');
const covid = document.querySelectorAll('.covid');
const covidDate = document.querySelector('.covid-date');

const vaccinateForm = document.querySelector('.vaccinate-form');
const vaccinated = document.querySelectorAll('.vaccinated');
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
        } else {
            el.addEventListener('click', () => {
                clickCounter++;
                elementValue = el?.value.trim();
                validator(elementValue, elementList, index, elementType);
                clickCounter > 0 ? elementForm.classList.remove('add-border') : elementForm.classList.add('add-border');
            })
        }
    })
}

const dateValidator = (element, elementIndex, elementValue, elementType) => {


    if (element?.value.trim() !== '') {
        elementValue = element.value.trim();
        validator(elementValue, element, elementIndex, elementType);
    } else {
        element?.addEventListener('input', () => {
            elementValue = element.value.trim();
            validator(elementValue, element, elementIndex, elementType);
        })
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
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(thirdPageNavBtn);