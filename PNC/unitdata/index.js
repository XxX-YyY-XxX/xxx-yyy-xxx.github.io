import {brJoin} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {cmp, setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

const UNIT_PROMISE = Async.getJSON("../units.json")
    .then((/** @type {UnitObject[]} */obj) => obj.filter(x => !x.tags.includes("Unreleased")).sort(cmp({key: x => x.id})).map(x => new Units(x)));

/** @type {HTMLInputElement} */ const NOT = document.querySelector('input[type="checkbox"]');
NOT.addEventListener("change", function(event) {
    const INPUT_VALUE = TEXT.value.toLowerCase();
    if (INPUT_VALUE)    TBODY.replaceChildren(...UNIT_LIST.filter(x => x.viable(INPUT_VALUE)).map(x => x.ROW));
});
/** @type {HTMLInputElement} */ const TEXT = document.querySelector('input[type="text"]');
TEXT.addEventListener("input", function(event) {
    const INPUT_VALUE = TEXT.value.toLowerCase();
    if (INPUT_VALUE)    TBODY.replaceChildren(...UNIT_LIST.filter(x => x.viable(INPUT_VALUE)).map(x => x.ROW));
    else                TBODY.replaceChildren(...UNIT_LIST.map(x => x.ROW));
});

class Units {
    static HEADERS = ["Doll Name", "References", "Fragment Locations"];

    #SEARCH_VALUES;

    ROW;

    /** @param {UnitObject} unit */
    constructor(unit) {
        const REF = Object.keys(unit.reference).filter(x => x);

        this.#SEARCH_VALUES = [unit.name, ...REF, ...unit.fragments].map(x => x.toLowerCase());

        this.ROW = document.createElement("tr");
        this.ROW.append(
            setattr(document.createElement("td"), {textContent: unit.name}),
            setattr(document.createElement("td"), {appendChild: [brJoin(REF.map(x => setattr(document.createElement("a"), {textContent: x, href: unit.reference[x]})))]}),
            setattr(document.createElement("td"), {appendChild: [brJoin(unit.fragments)]})
        )
    }

    /** @param {string} value */
    viable(value) {
        return NOT.checked !== this.#SEARCH_VALUES.some(x => x.includes(value));
    }
}

const UNIT_LIST = await UNIT_PROMISE;
document.querySelector("thead > tr").append(...Units.HEADERS.map(x => setattr(document.createElement("th"), {textContent: x})));
const TBODY = setattr(document.querySelector("tbody"), {append: UNIT_LIST.map(x => x.ROW)});