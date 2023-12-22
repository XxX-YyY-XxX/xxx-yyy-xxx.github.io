import {spoilerSummary, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import {Embed, textStyle, img} from "../../univasset/scripts/html/index.js";
import List from '../../univasset/scripts/htmlfunctions/lists.js';
import * as SC from '../../univasset/scripts/specialchars.js';

//#region Constants
const IMG_ASSET = "../assets/images/faqs/"
//#endregion

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/EXI/faqs/?id=${ids.join("+")}">${text}</a>`
}
//#endregion

export const dTag = {
    MISC: {name: "Miscellaneous", description: "Cards with undecided tags."}
};

/**
 * @typedef Card
 * @property {number} Card.id
 * @property {string} Card.question
 * @property {string} Card.answer
 * @property {{name: string, description: string}[]} Card.tags
 */

/** @type {Card[]} */ export const cardData = [
    {
        id: 0,
        question: `dummy 1`,
        answer: ``,
        tags: [dTag.MISC]
    },
    {
        id: 1,
        question: `dummy 2`,
        answer: ``,
        tags: [dTag.MISC]
    },
    {
        id: 2,
        question: `dummy 3`,
        answer: ``,
        tags: [dTag.MISC]
    },
    {
        id: 0,
        question: ``,
        answer: ``,
        tags: []
    },
].slice(0, -1);

console.log(import.meta)