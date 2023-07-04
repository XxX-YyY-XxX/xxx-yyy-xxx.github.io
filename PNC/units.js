import {tableSort, initializeHTML, brJoin, radioGroup, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async, setAttr} from "../univasset/scripts/externaljavascript.js";
import {zip, cmp} from "../univasset/scripts/basefunctions/index.js"

/** @type {Promise<UnitObject[]>} */ const UNIT_PROMISE = Async.getJSON('./units.json');

//#region Radio Buttons
const STAT = document.querySelector("#stats"), DATA = document.querySelector("#data");
radioGroup(document.querySelector("#button"), "tables",
    [initializeHTML("h2", {textContent: "Stats"}), "stat", function(x) {STAT.style.display = x.checked ? "block" : "none"}],
    [initializeHTML("h2", {textContent: "Others"}), "data", function(x) {DATA.style.display = x.checked ? "block" : "none"}]
);
//#endregion

//#region Statistics Table
class Units {
    //#region Variables
    name;
    class;

    #hp; #armahp;
    get hp() {
        var output = this.#hp;
        if (this.#arma && this.#hasarma) output += this.#armahp;
        if (this.#intimacy && this.#intistats.includes("Code Robustness")) output += 1320;
        return output;
    }

    #atk; #armaatk;
    get atk() {
        var output = this.#atk;
        if (this.#arma && this.#hasarma) output += this.#armaatk;
        if (this.#intimacy && this.#intistats.includes("Power Connection")) output += 55;
        return output;
    }

    #hash; #armahash;
    get hash() {
        var output = this.#hash;
        if (this.#arma && this.#hasarma) output += this.#armahash;
        if (this.#intimacy && this.#intistats.includes("Neural Activation")) output += 55;
        return output;
    }

    #pdef; #armapdef;
    get pdef() {
        var output = this.#pdef;
        if (this.#arma && this.#hasarma) output += this.#armapdef;
        if (this.#intimacy && this.#intistats.includes("Shield of Friendship")) output += 55;
        return output;
    }

    #odef; #armaodef;
    get odef() {
        var output = this.#odef;
        if (this.#arma && this.#hasarma) output += this.#armaodef;
        return output;
    }

    aspd;

    #crate;
    get crate() {
        var output = this.#crate;
        if (this.#intimacy && this.#intistats.includes("Coordinated Strike")) output += 8;
        return output;
    }

    #cdmg = 50;
    get cdmg() {
        var output = this.#cdmg;
        if (this.#intimacy && this.#intistats.includes("Victorious Inspiration")) output += 12;
        return output;
    }

    #ppen; #armappen;
    get ppen() {
        var output = this.#ppen;
        if (this.#arma && this.#hasarma) output += this.#armappen;
        return output;
    }

    #open; #armaopen;
    get open() {
        var output = this.#open;
        if (this.#arma && this.#hasarma) output += this.#armaopen;
        return output;
    }

    #dodge;
    get dodge() {
        var output = this.#dodge;
        if (this.#intimacy && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        return output;
    }

    regen;

    #haste = 0;
    get haste() {
        var output = this.#haste;
        if (this.#intimacy && this.#intistats.includes("Mechanical Celerity")) output += 8;
        return output;
    }

    #dboost = 0;
    get dboost() {
        var output = this.#dboost;
        if (this.#intimacy && this.#intistats.includes("Coordinated Formation")) output += 5;
        return output;
    }

    #dreduc = 0;
    get dreduc() {
        var output = this.#dreduc;
        if (this.#intimacy && this.#intistats.includes("Through Fire and Water")) output += 5;
        return output;
    }

    #hboost = 0;
    get hboost() {
        var output = this.#hboost;
        if (this.#intimacy && this.#intistats.includes("Healing Bond")) output += 5;
        return output;
    }

    #arma = false;
    #hasarma;

    #intimacy = false;
    #intistats;

    row;
    updateStat;
    //#endregion

    /** @param {UnitObject} stat_object */
    constructor(stat_object) {
        //#region Assignment
        this.name = stat_object.name;
        this.class = stat_object.class;

        this.#hp = stat_object.hp;
        this.#atk = stat_object.atk;
        this.#hash = stat_object.hash;
        this.#pdef = stat_object.pdef;
        this.#odef = stat_object.odef;
        this.aspd = stat_object.aspd;
        this.#crate = stat_object.crate;
        this.#ppen = stat_object.ppen;
        this.#open = stat_object.open;
        this.#dodge = stat_object.dodge;
        this.regen = stat_object.regen;

        const ARMA = stat_object.arma;
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;

        this.#hasarma = /\.\/assets\/images\/arma\/\S+\.png/.test(ARMA.icon);

        this.#intistats = stat_object.intimacy;
        //#endregion

        //#region HTML Elements
        this.row = document.createElement("tr");

        const TD_NAME = document.createElement("td");
        if (this.#hasarma) {
            const IMAGE = document.createElement("img");
            setAttr(IMAGE, {alt: `${this.name} arma.`, src: ARMA.icon})

            const SPAN = document.createElement("span");
            SPAN.classList.add("arma");
            SPAN.append(this.name, IMAGE);
            TD_NAME.appendChild(SPAN);
        } else {
            TD_NAME.textContent = this.name;
        }

        const TD_HP = initializeHTML("td", {textContent: this.hp});
        const TD_ATK = initializeHTML("td", {textContent: this.atk});
        const TD_HASH = initializeHTML("td", {textContent: this.hash});
        const TD_PDEF = initializeHTML("td", {textContent: this.pdef});
        const TD_ODEF = initializeHTML("td", {textContent: this.odef});
        const TD_CRATE = initializeHTML("td", {textContent: `${this.crate}%`});
        const TD_PPEN = initializeHTML("td", {textContent: this.ppen});
        const TD_OPEN = initializeHTML("td", {textContent: this.open});
        const TD_DODGE = initializeHTML("td", {textContent: `${this.dodge}%`});

        this.updateStat = () => {
            TD_HP.textContent = this.hp;
            TD_ATK.textContent = this.atk;
            TD_HASH.textContent = this.hash;
            TD_PDEF.textContent = this.pdef;
            TD_ODEF.textContent = this.odef;
            TD_CRATE.textContent = `${this.crate}%`;
            TD_PPEN.textContent = this.ppen;
            TD_OPEN.textContent = this.open;
            TD_DODGE.textContent = `${this.dodge}%`;
        }
 
        this.row.append(
            TD_NAME,
            TD_HP,
            TD_ATK,
            TD_HASH,
            TD_PDEF,
            TD_ODEF,
            initializeHTML("td", {textContent: this.aspd}),
            TD_CRATE,
            TD_PPEN,
            TD_OPEN,
            TD_DODGE,
            initializeHTML("td", {textContent: this.regen})
        )
        //#endregion

        //#privatefield cannot be called dynamically, use exec/eval instead
    }
}

function updateTable() {
    TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));
}

const UNITS = (await UNIT_PROMISE).slice(0, -1);

const UNIT_LIST = UNITS.map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");

const TBODY = document.createElement("tbody");
TBODY.append(...UNIT_LIST.map(unit => unit.row))

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

/** @this {HTMLTableCellElement} @param {MouseEvent} event */
function sortMethod(event) {
    const DATA = this.dataset;
    switch (DATA.sort) {
        case "no":
        case "lo":
            DATA.sort = "hi";
            switch (DATA.type) {
                case "string":
                    UNIT_LIST.sort(cmp({key: x => x[DATA.key]}));
                    break;
                case "number":
                    UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: true}));
                    break;
            }
            break;
        case "hi":
            DATA.sort = "lo";
            switch (DATA.type) {
                case "string":
                    UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: true}));
                    break;
                case "number":
                    UNIT_LIST.sort(cmp({key: x => x[DATA.key]}));
                    break;
            }
            break;
    }
    updateTable();
}

const HEADER_NAMES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Phys Def", "Op Def", "Atk Spd", "Crit Rate", "Phys Pen", "Op Pen", "Dodge", "Regen"];
const HEADER_KEYS = ["name", "hp", "atk", "hash", "pdef", "odef", "aspd", "crate", "ppen", "open", "dodge", "regen"];
const HEADER_VALUES = [
    []
]
function* returnType() {yield "string"; while (true) yield "number"};
for (const [NAME, KEY, TYPE] of zip(HEADER_NAMES, HEADER_KEYS, returnType())) {
    const TH = document.createElement("th");
    setAttr(TH, {textContent: NAME, addEventListener: ["click", sortMethod, true]})
    setAttr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

const STAT_TABLE = document.querySelector("#stats > .table");
STAT_TABLE.classList.add("func_table");
STAT_TABLE.appendChild(TABLE);
//#endregion

//#region Others
const DATA_ARRAY = UNITS.map(x => [x.name, x.class, x.reference, x.fragments]);
DATA_ARRAY.unshift(["Doll Name", "Class", "Reference", "Fragments"]);
tableSort(
    document.querySelector("#data > .table"),
    DATA_ARRAY,
    [
        x => x,
        x => x,
        x => brJoin(Object.entries(x).map(([name, link]) => initializeHTML("a", {textContent: name, href: link}))),
        x => brJoin(x)
    ],
    {frzcol: true, frzhdr: true}
);
//#endregion

/**
 * @typedef {Object} UnitObject
 * @property {string} UnitObject.name
 * @property {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} UnitObject.class
 * @property {{[linkname: string]: string}} UnitObject.reference {linkname: linkurl}
 * @property {string[]} UnitObject.fragments Where to obtain unit fragments.
 * @property {number} UnitObject.hp
 * @property {number} UnitObject.atk
 * @property {number} UnitObject.hash
 * @property {number} UnitObject.pdef
 * @property {number} UnitObject.odef
 * @property {number} UnitObject.aspd
 * @property {number} UnitObject.crate
 * @property {number} UnitObject.ppen
 * @property {number} UnitObject.open
 * @property {number} UnitObject.dodge
 * @property {number} UnitObject.regen
 * @property {Object} UnitObject.arma
 * @property {string} UnitObject.arma.icon Link to arma emblem.
 * @property {number} UnitObject.arma.hp
 * @property {number} UnitObject.arma.atk
 * @property {number} UnitObject.arma.hash
 * @property {number} UnitObject.arma.pdef
 * @property {number} UnitObject.arma.odef
 * @property {number} UnitObject.arma.ppen
 * @property {number} UnitObject.arma.open
 * @property {[IntimacyStats, IntimacyStats, IntimacyStats]} UnitObject.intimacy */

/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */
/** @typedef {} Fragments */