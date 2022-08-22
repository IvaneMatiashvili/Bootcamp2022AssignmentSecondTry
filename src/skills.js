//@ts-check
import { globalValidationCounter, pageReload, pageTransitionAndNavigation, validator } from './index.js';

// Declare variables that will be frequently used

/**
 * @type {Element}
 */

const experienceGenerator = document.querySelector('.experience-generator');
const skillsMassage = document.querySelector('.skills-message');
const skills = document.querySelector('.skills');
const experience = document.querySelector('.experience');
const addSkillsBtn = document.querySelector('.add-skills');
let localStorageSelectArr = new Array();

/**
 * 
 * With this variable, we have access to the second page navigation buttons.
 * @type {NodeListOf<HTMLElement>}
 * @property {style}
 * 
 */
const secondPageNavBtn = document.querySelectorAll('.second-page-nav');

/**
 * 
 * current page index.
 * 
 * @type {number}
 * 
 */
const currentPageInx = 1;

// start adding features

const { log: l } = console;

const skillsPageReload = () => {
    if (+localStorage.getItem('page-reload') === currentPageInx) {
        pageReload(currentPageInx, 'flex');
    }
}
skillsPageReload();


/**
 * @type{Array<{ id: number, title: string }> }
 */

let skillsResult = new Array();

async function getSkillsData() {

    const response = await fetch('https://bootcamp-2022.devtest.ge/api/skills');
    const responseData = await response.json();
    skillsResult = responseData;

    skillsResult.forEach((elm) => {
        let option = document.createElement('option');
        let node = document.createTextNode(elm.title);

        option.value = elm.title;
        option.appendChild(node);
        skills.appendChild(option);
    })


    if (JSON.parse(localStorage.getItem('select'))) {
        if (JSON.parse(localStorage.getItem('select')).length > 0) {
            skills.value = JSON.parse(localStorage.getItem('select'))[JSON.parse(localStorage.getItem('select')).length - 1].element;
        }
    }


}
getSkillsData();


let skillsList = new Array();
let languageInformation = new Object();


const addSkills = () => {

    let informationAboutExperience = document.createElement('li');

    let languageContainer = document.createElement('div');
    languageContainer.classList.add('language-container');

    let language = document.createElement('p');
    languageContainer.appendChild(language);

    let experienceContainer = document.createElement('div');

    let yearsOfExperience = document.createElement('p');
    yearsOfExperience.classList.add('years-of-experience');
    experienceContainer.appendChild(yearsOfExperience);

    let removeBtnCircle = document.createElement('div');
    removeBtnCircle.classList.add('remove-btn-circle');

    let removeLngBtn = document.createElement('span');
    removeLngBtn.classList.add('remove-language-btn');

    removeBtnCircle.appendChild(removeLngBtn);

    language.textContent = skills.value.trim();

    let LocalStorageSelect = JSON.parse(localStorage.getItem('select'));

    if (language.textContent.length < 1 && LocalStorageSelect.length > 0) {

        language.textContent = languageInformation.element;
        skills.value = language.textContent;
        experience.value = languageInformation.experience;
    }

    let forEachResult = 0;

    skillsList?.forEach(el => {
        if (el === language.textContent) forEachResult = 1;
    })

    if (forEachResult !== 1 && language.textContent !== '') {

        skillsList.push(language.textContent);
        skillsPageValidator();

        yearsOfExperience.textContent = `Years of Experience: ${experience.value.trim()}`;
        informationAboutExperience.classList.add('skills-experience');

        let localStorageArrElement = {
            element: language.textContent,
            experience: experience?.value.trim()
        };

        if (language.textContent?.length > 0) {

            localStorageSelectArr.push(localStorageArrElement);

            localStorage.setItem('select', JSON.stringify(localStorageSelectArr));
            JSON.parse(localStorage.getItem('select'));
        }

        informationAboutExperience.appendChild(languageContainer);
        informationAboutExperience.appendChild(experienceContainer);
        informationAboutExperience.appendChild(removeBtnCircle);

        experienceGenerator.appendChild(informationAboutExperience);

        removeLanguage(removeBtnCircle, informationAboutExperience, language.textContent);

    } else {
        skillsList?.forEach((el, idx) => {
            if (el === language.textContent) {
                experienceGenerator.children[idx + 3].style.backgroundColor = '#c9c9c9';
                setTimeout(() => {
                    experienceGenerator.children[idx + 3].style.backgroundColor = '#FFFFFF';
                }, 300)
            }
        })
    }
}

const removeLanguage = (removeBtn, languageAndExperience, language) => {
    removeBtn.addEventListener('click', () => {
        languageAndExperience.remove();
        skillsList = skillsList.filter(el => el !== language);

        let localStorageArr = JSON.parse(localStorage.getItem('select'));
        localStorageArr = localStorageArr.filter(elm => elm.element !== language);
        localStorage.setItem('select', JSON.stringify(localStorageArr));
        skillsPageValidator();
    })
}

const skillsPageValidator = () => {
    let skillsValue;
    skillsList.length === 0 ? skillsValue = "" : skillsValue = "At list one skill";
    let index = 4;
    validator(skillsValue, skills, index, 'skill');
    validator(skillsValue, experience, index, 'experience');

    if (validator(skillsValue, skills, index, 'skill') === true) {
        globalValidationCounter[1] = 1;
    } else {
        globalValidationCounter[1] = 0;
    }
}

skillsPageValidator();

const addSkillsFromLocalStorage = (languageInfo) => {
    languageInformation = languageInfo;
}

let getLocalStorageSelect = JSON.parse(localStorage.getItem('select'));

getLocalStorageSelect?.forEach(el => {
    addSkillsFromLocalStorage(el);

    addSkills();
})

addSkillsBtn.addEventListener('click', addSkills);



(/**
 *
 * This "IIFE" function adds a `'click' event listener` to a second page navigation buttons and
 * executes a 'pageTransitionAndNavigation' function for each second page navigation buttons.
 *  
 * @param {NodeListOf<Element>} btn
 * 
 */
    function addSecondPageNavBtnClickEventListener(btn) {
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
    })(secondPageNavBtn);
