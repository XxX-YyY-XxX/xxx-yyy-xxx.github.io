// import {table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import {Embed, textStyle, image, figure, details, anchor} from "../../univasset/scripts/html/index.js";
// import List from '../../univasset/scripts/htmlfunctions/lists.js';
// import {STAR, TM, LESSEQUAL} from '../../univasset/scripts/specialchars.js';

//#region Constants
const IMG_ASSET = "../assets/images/faqs/";
//#endregion

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return anchor(text, `./?id=${ids.join('+')}`, {mode: "history"});
}
//#endregion

const dtag = {
    MISC: {name: "Miscellaneous", description: "Cards with undecided tags."},
    RAND: {name: "tbd", description: "ggwp"}
};
window.tags = dtag;

window.cards = [
    {
        id: 0,
        question: `dummy 1`,
        answer: ``,
        tags: [dtag.MISC, dtag.RAND]
    },
    {
        id: 1,
        question: `dummy 2`,
        answer: `${getID("getid test", 10)}`,
        tags: [dtag.MISC]
    },
    {
        id: 2,
        question: `dummy 3`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 3,
        question: `dummy 4`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 4,
        question: `dummy 5`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 5,
        question: `dummy 1`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 6,
        question: `dummy 2`,
        answer: ``,
        tags: [dtag.MISC, dtag.RAND]
    },
    {
        id: 7,
        question: `dummy 3`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 8,
        question: `dummy 4`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 9,
        question: `dummy 5`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 10,
        question: `dummy 1`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 11,
        question: `dummy 2`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 12,
        question: `dummy 3`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 13,
        question: `dummy 4`,
        answer: ``,
        tags: [dtag.MISC]
    },
    {
        id: 14,
        question: `dummy 5`,
        answer: ``,
        tags: [dtag.MISC]
    },
    // {
    //     id: 0,
    //     question: ``,
    //     answer: ``,
    //     tags: []
    // },
];

// https://docs.google.com/document/d/1IalPz5JPc8-we4MiOsYhrMrOINifxW9d9Q6mTAqGoq8
// https://docs.google.com/spreadsheets/d/1DogyU3K7ZXw2qbhP1EhRXIAw5nCyIV5G5e-QWviBZME

// GFAnon GFL2 Beginner Guide - https://rentry.org/n384q94e