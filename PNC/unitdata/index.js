import {brJoin, nestElements} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<UnitObject[]} */ const UNIT_PROMISE = Async.getJSON("../units.json");

/** @type {HTMLInputElement} */ const INVERSION = document.querySelector('input[type="checkbox"]');
document.querySelector('input[type="text"]').addEventListener("input", function(event) {
    const INPUT_VALUE = this.value.toLowerCase();
    if (INPUT_VALUE)
        TBODY.replaceChildren(...UNIT_LIST.filter(x => x.viable(INPUT_VALUE)).map(x => x.ROW));
    else
        TBODY.replaceChildren(...UNIT_LIST.map(x => x.ROW));
});

class Units {
    static HEADERS = [
        "Doll Name",
        "References",
        "Fragment Locations"
    ];

    #SEARCH_VALUES;

    ROW;

    /** @param {UnitObject} unit */
    constructor(unit) {
        const REF = Object.keys(unit.reference).filter(x => x);

        this.#SEARCH_VALUES = [
            unit.name,
            ...REF,
            ...unit.fragments
        ].map(x => x.toLowerCase());

        this.ROW = document.createElement("tr");
        this.ROW.append(
            setattr(document.createElement("td"), {textContent: unit.name}),
            setattr(document.createElement("td"), {appendChild: [brJoin(REF.map(x => setattr(document.createElement("a"), {textContent: x, href: unit.reference[x]})))]}),
            setattr(document.createElement("td"), {appendChild: [brJoin(unit.fragments)]})
        )
    }

    /** @param {string} value */
    viable(value) {
        return INVERSION.checked !== this.#SEARCH_VALUES.some(x => x.includes(value));
    }
}

const UNIT_LIST = (await UNIT_PROMISE).slice(0, -1).map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");
HEADER_TR.append(...Units.HEADERS.map(x => setattr(document.createElement("th"), {textContent: x})));

const TBODY = setattr(document.createElement("tbody"), {append: UNIT_LIST.map(x => x.ROW)});
const TABLE = setattr(document.createElement("table"), {classList: {add: ["freeze-col", "freeze-row"]}, append: [THEAD, TBODY]});
setattr(document.querySelector("#table"), {classList: {add: ["func_table"]}, appendChild: [TABLE]});