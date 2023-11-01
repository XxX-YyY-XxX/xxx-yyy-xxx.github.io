import {spoilerSummary, image, table, link, tooltip, getID} from '../univasset/scripts/htmlfunctions/htmlfunctions.js';
import TextStyle from '../univasset/scripts/htmlfunctions/textstyle.js';
import Embed from '../univasset/scripts/htmlfunctions/linkembed.js';
import List from '../univasset/scripts/htmlfunctions/lists.js'

//#region Special Characters
const lessEqual = '≤';
const star = '★';
const tm = '™️';
//🍰
//#endregion

export const dTag = {
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