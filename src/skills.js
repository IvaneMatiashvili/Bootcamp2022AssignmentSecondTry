//@ts-check
import pageTransitionAndNavigation from './index.js';

// Declare variables that will be frequently used

/**
 * @type {Element}
 */

const experienceGenerator = document.querySelector('.experience-generator');
const skills = document.querySelector('.skills');
const experience = document.querySelector('.experience');
const addSkillsBtn = document.querySelector('.add-skills');

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
                    pageTransitionAndNavigation(currentPageInx, selectedPageInx);
                });
            }
        })
    })(secondPageNavBtn);

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

}
getSkillsData();


let skillsList = new Array();

const addSkills = () => {

    let informationAboutExperience = document.createElement('li');

    let languageContainer = document.createElement('div');
    languageContainer.classList.add('language-container');

    let language = document.createElement('p');
    languageContainer.appendChild(language);

    let yearsOfExperience = document.createElement('p');
    yearsOfExperience.classList.add('years-of-experience');

    let removeBtnCircle = document.createElement('div');
    removeBtnCircle.classList.add('remove-btn-circle');

    let removeLngBtn = document.createElement('span');
    removeLngBtn.classList.add('remove-language-btn');

    removeBtnCircle.appendChild(removeLngBtn);

    language.textContent = skills.value.trim();

    let forEachResult = 0;

    skillsList?.forEach(el => {
        if (el === language.textContent) forEachResult = 1;
    })

    if (forEachResult !== 1) {

        skillsList.push(language.textContent);

        yearsOfExperience.textContent = `Years of Experience: ${experience.value.trim()}`;;
        informationAboutExperience.classList.add('skills-experience');

        informationAboutExperience.appendChild(languageContainer);
        informationAboutExperience.appendChild(yearsOfExperience);
        informationAboutExperience.appendChild(removeBtnCircle);

        experienceGenerator.appendChild(informationAboutExperience);

        removeLanguage(removeBtnCircle, informationAboutExperience, language.textContent);

    }
}

const removeLanguage = (removeBtn, languageAndExperience, language) => {
    removeBtn.addEventListener('click', () => {
        languageAndExperience.remove();
        skillsList = skillsList.filter(el => el !== language);
    })
}

addSkillsBtn.addEventListener('click', addSkills);