import {spoilerSummary, image, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import TextStyle from '../../univasset/scripts/htmlfunctions/textstyle.js';
import Embed from '../../univasset/scripts/htmlfunctions/linkembed.js';
import List from '../../univasset/scripts/htmlfunctions/lists.js'
import * as SC from '../../univasset/scripts/specialchars.js';

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.map(x => String(x).padStart(5, "0")).join("+")}">${text}</a>`
}//#endregion

export const dTag = {
    ASST: {name: "Assistant", description: "Unit shown in your home screen."},
    ALGO: {name: "Algorithms", description: "Equipments in this game."},
    TIER: {name: "TierList", description: "Power ratings of doll units."},
    DOLL: {name: "Dolls", description: "Collectible units of this game."},
    MISC: {name: "Miscellaneous", description: "Queries with no specific tag as of yet."},
    PRIME: {name: "TopicPrimer", description: "Write-ups that should answer majority of the questions."},
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
        question: `How do I change what weapon Jiangyu holds in her L2D`,
        answer: `Shoulder tap.`,   // https://old.reddit.com/r/GFLNeuralCloud/comments/17jqslr/weekly_professors_lounge_october_30_2023/k7sr357/
        tags: [dTag.ASST]
    },
    {
        id: 1,
        question: `Which algorithms should I decompose?`,
        answer: `Purple algos, blue algos if you're lazy, trash single slot algos.`,
        tags: [dTag.ALGO]
    },
    {
        id: 2,
        question: `How many pulls can I get per month?`,
        answer: `${image("https://i.imgur.com/WoonBbq.png", "Discord: .rolls")}`,
        tags: [dTag.MISC]
    },
    {
        id: 0,
        question: ``,
        answer: ``,
        tags: []
    },
].slice(0, -1);