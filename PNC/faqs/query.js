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
export function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.map(x => String(x).padStart(5, "0")).join("+")}">${text}</a>`
}//#endregion

/** @type {{[tag: string]: {name: string, description: string}}} */ export const dTag = {
    LORE: {name: 'Story/Lore', description: 'Main meat of the series.'},
};

export const cardData = [
    {
        id: 0,
        questions: ``,
        answers: ``,
        tags: []
    },
];