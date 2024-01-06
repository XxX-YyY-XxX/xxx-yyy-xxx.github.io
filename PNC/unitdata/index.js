import {brJoin, nestElements} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<UnitObject[]} */ const UNIT_PROMISE = Async.getJSON("../units.json");

/** @type {HTMLInputElement} */ const INVERSION = null;
document.querySelector("input").addEventListener("input", function(event) {
    const INPUT_VALUE = this.value.toLowerCase();
    if (INPUT_VALUE)
        TBODY.replaceChildren(...UNIT_LIST.filter(x => x.viable(INPUT_VALUE)).map(x => x.row));
        // TBODY.replaceChildren(...UNIT_LIST.filter(x => x.name.toLowerCase().includes(INPUT_VALUE) || x.reference.some(x => x.toLowerCase().includes(INPUT_VALUE)) || x.frag_loc.some(x => x.toLowerCase().includes(INPUT_VALUE))).map(x => x.row));
    else
        TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));
});

class Units {
    #name;
    #reference;
    #frag_loc;

    row;

    /** @param {UnitObject} unit_object */
    constructor(unit_object) {
        this.#name = unit_object.name;
        this.#reference = Object.keys(unit_object.reference).filter(x => x);
        this.#frag_loc = unit_object.fragments;

        this.row = document.createElement("tr");
        this.row.append(
            setattr(document.createElement("td"), {textContent: this.#name}),
            setattr(document.createElement("td"), {appendChild: [brJoin(this.#reference.map(x => setattr(document.createElement("a"), {textContent: x, href: unit_object.reference[x]})))]}),
            setattr(document.createElement("td"), {appendChild: [brJoin(this.#frag_loc)]})
        )
    }

    viable(value) {
        const FOUND = (
            this.#name.toLowerCase().includes(value)
            || this.#reference.some(x => x.toLowerCase().includes(value))
            || this.#frag_loc.some(x => x.toLowerCase().includes(value))
        );
        // return INVERSION.checked ^ FOUND;
        return false ^ FOUND;
    }
}

const UNIT_LIST = (await UNIT_PROMISE).slice(0, -1).map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");
const HEADER_VALUES = ["Doll Name", "Reference", "Fragment Locations"];
HEADER_TR.append(...HEADER_VALUES.map(x => setattr(document.createElement("th"), {textContent: x})));

const TBODY = document.createElement("tbody");
TBODY.append(...UNIT_LIST.map(x => x.row));

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

const STAT_TABLE = document.querySelector("#table");
STAT_TABLE.classList.add("func_table");
STAT_TABLE.appendChild(TABLE);