import {brJoin, nestElements} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<UnitObject[]} */ const UNIT_PROMISE = Async.getJSON("../units.json");

/** @type {HTMLInputElement} */ const INVERSION = document.querySelector("input");
document.querySelector("input").addEventListener("input", function(event) {
    const INPUT_VALUE = this.value.toLowerCase();
    if (INPUT_VALUE)
        TBODY.replaceChildren(...UNIT_LIST.filter(x => x.viable(INPUT_VALUE)).map(x => x.ROW));
    else
        TBODY.replaceChildren(...UNIT_LIST.map(x => x.ROW));
});

class Units {
    #NAME;
    #REFERENCE;
    #FRAGMENTS;

    ROW;

    /** @param {UnitObject} unit */
    constructor(unit) {
        this.#NAME = unit.name.toLowerCase();
        const REF = Object.keys(unit.reference).filter(x => x);
        this.#REFERENCE = REF.map(x => x.toLowerCase());
        this.#FRAGMENTS = unit.fragments.map(x => x.toLowerCase());

        this.ROW = document.createElement("tr");
        this.ROW.append(
            setattr(document.createElement("td"), {textContent: unit.name}),
            setattr(document.createElement("td"), {appendChild: [brJoin(REF.map(x => setattr(document.createElement("a"), {textContent: x, href: unit.reference[x]})))]}),
            setattr(document.createElement("td"), {appendChild: [brJoin(unit.fragments)]})
        )
    }

    /** @param {string} value */
    viable(value) {
        const FOUND = (
            this.#NAME.includes(value)
            || this.#REFERENCE.some(x => x.includes(value))
            || this.#FRAGMENTS.some(x => x.includes(value))
        );
        return INVERSION.checked !== FOUND;
    }
}

const UNIT_LIST = (await UNIT_PROMISE).slice(0, -1).map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");
const HEADER_VALUES = ["Doll Name", "Reference", "Fragment Locations"];
HEADER_TR.append(...HEADER_VALUES.map(x => setattr(document.createElement("th"), {textContent: x})));

const TBODY = setattr(document.createElement("tbody"), {append: UNIT_LIST.map(x => x.ROW)});
const TABLE = setattr(document.createElement("table"), {classList: {add: ["freeze-col", "freeze-row"]}, append: [THEAD, TBODY]});
setattr(document.querySelector("#table"), {classList: {add: ["func_table"]}, appendChild: [TABLE]});