import {spoilerSummary, image, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import TextStyle from '../../univasset/scripts/htmlfunctions/textstyle.js';
import Embed from '../../univasset/scripts/htmlfunctions/linkembed.js';
import List from '../../univasset/scripts/htmlfunctions/lists.js'

//#region Special Characters
const lessEqual = '≤';
const star = '★';
const tm = '™️';
//🍰
//#endregion

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.map(x => String(x).padStart(5, "0")).join("+")}">${text}</a>`
}//#endregion

/** @type {{[tag: string]: {name: string, description: string}}} */ export const dTag = {
    LORE: {name: 'Story/Lore', description: 'Main meat of the series.'},
};

/**
 * @typedef Card
 * @property {number} Card.id
 * @property {string} Card.questions
 * @property {string} Card.answers
 * @property {dTag[keyof dTag][]} Card.tags
 */

/** @type {Card[]} */ export const cardData = [
    {
        id: 0,
        questions: `q1`,
        answers: `a1`,
        tags: []
    },
    {
        id: 1,
        questions: `q2`,
        answers: `a2`,
        tags: []
    },
    {
        id: 2,
        questions: `q3`,
        answers: `a3`,
        tags: []
    },
    {
        id: 0,
        questions: ``,
        answers: ``,
        tags: []
    },
].slice(0, -1);