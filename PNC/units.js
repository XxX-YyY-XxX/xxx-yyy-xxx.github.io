import {tableSort, brJoin, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";
import {zip, cmp, setattr} from "../univasset/scripts/basefunctions/index.js"

/** @type {UnitObject[]} */ var UNITS = Async.getJSON('./units.json');

//#region Class Declarations
// output value probably ceiling
// breakthrough growth probably variable
class Units {
    name;
    class;

    #hp; #armahp;
    get hp() {
        var output = this.#hp;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahp;
        if (BOND_BUTTON.checked && this.#intistats.includes("Code Robustness")) output += 1320;
        return output;
    }

    #atk; #armaatk;
    get atk() {
        var output = this.#atk;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaatk;
        if (BOND_BUTTON.checked && this.#intistats.includes("Power Connection")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#atk * 0.22 + 38}[this.class] || 0;
        return output;
    }

    #hash; #armahash;
    get hash() {
        var output = this.#hash;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahash;
        if (BOND_BUTTON.checked && this.#intistats.includes("Neural Activation")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#hash * 0.22 + 38}[this.class] || 0;
        return output;
    }

    #pdef; #armapdef;
    get pdef() {
        var output = this.#pdef;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armapdef;
        if (BOND_BUTTON.checked && this.#intistats.includes("Shield of Friendship")) output += 55;
        return output;
    }

    #odef; #armaodef;
    get odef() {
        var output = this.#odef;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaodef;
        return output;
    }

    aspd;

    #crate;
    get crate() {
        var output = this.#crate;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Strike")) output += 8;
        if (SPEC_BUTTON.checked) output += {"Sniper": 9}[this.class] || 0;
        return output;
    }

    #cdmg = 50;
    get cdmg() {
        var output = this.#cdmg;
        if (BOND_BUTTON.checked && this.#intistats.includes("Victorious Inspiration")) output += 12;
        if (SPEC_BUTTON.checked) output += {"Sniper": 18}[this.class] || 0;
        return output;
    }

    #ppen; #armappen;
    get ppen() {
        var output = this.#ppen;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armappen;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#ppen * 0.07 + 65}[this.class] || 0;
        return output;
    }

    #open; #armaopen;
    get open() {
        var output = this.#open;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaopen;
        return output;
    }

    #dodge;
    get dodge() {
        var output = this.#dodge;
        if (BOND_BUTTON.checked && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        return output;
    }

    regen;

    #haste = 0;
    get haste() {
        var output = this.#haste;
        if (BOND_BUTTON.checked && this.#intistats.includes("Mechanical Celerity")) output += 8;
        return output;
    }

    res = 0;
    lash = 0;

    #dboost = 0;
    get dboost() {
        var output = this.#dboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Formation")) output += 5;
        return output;
    }

    #dreduc = 0;
    get dreduc() {
        var output = this.#dreduc;
        if (BOND_BUTTON.checked && this.#intistats.includes("Through Fire and Water")) output += 5;
        return output;
    }

    #hboost = 0;
    get hboost() {
        var output = this.#hboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Healing Bond")) output += 5;
        return output;
    }

    #hasarma;
    #intistats;

    row;
    updateStat;

    /** @param {UnitObject} stat_object */
    constructor(stat_object) {
        this.name = stat_object.name;
        this.class = stat_object.class;

        // Base Stats
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

        // Arma Stats
        const ARMA = stat_object.arma;
        this.#hasarma = /\.\/assets\/images\/arma\/\S+\.png/.test(ARMA.icon);
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;

        this.#intistats = stat_object.intimacy;

        this.row = document.createElement("tr");

        const TD_NAME = document.createElement("td");
        if (this.#hasarma) {
            const IMAGE = setattr(document.createElement("img"), {alt: `${this.name} arma.`, src: ARMA.icon});
            const SPAN = setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}})
            TD_NAME.appendChild(SPAN);
        } else {
            TD_NAME.textContent = this.name;
        }

        const TD_HP = document.createElement("td");
        const TD_ATK = document.createElement("td");
        const TD_HASH = document.createElement("td");
        const TD_PDEF = document.createElement("td");
        const TD_ODEF = document.createElement("td");
        const TD_CRATE = document.createElement("td");
        const TD_CDMG = document.createElement("td");
        const TD_PPEN = document.createElement("td");
        const TD_OPEN = document.createElement("td");
        const TD_DODGE = document.createElement("td");
        const TD_HASTE = document.createElement("td");
        const TD_DBOOST = document.createElement("td");
        const TD_DREDUC = document.createElement("td");
        const TD_HBOOST = document.createElement("td");

        this.updateStat = () => {
            TD_HP.textContent = this.hp;
            TD_ATK.textContent = this.atk;
            TD_HASH.textContent = this.hash;
            TD_PDEF.textContent = this.pdef;
            TD_ODEF.textContent = this.odef;
            TD_CRATE.textContent = `${this.crate}%`;
            TD_CDMG.textContent = `${this.cdmg}%`;
            TD_PPEN.textContent = this.ppen;
            TD_OPEN.textContent = this.open;
            TD_DODGE.textContent = `${this.dodge}%`;
            TD_HASTE.textContent = `${this.haste}%`;
            TD_DBOOST.textContent = `${this.dboost}%`;
            TD_DREDUC.textContent = `${this.dreduc}%`;
            TD_HBOOST.textContent = `${this.hboost}%`;
        }
        this.updateStat()

        this.row.append(
            TD_NAME,
            TD_HP,
            TD_ATK,
            TD_HASH,
            TD_PDEF,
            TD_ODEF,
            setattr(document.createElement("td"), {textContent: this.aspd}),
            TD_CRATE,
            TD_CDMG,
            TD_PPEN,
            TD_OPEN,
            TD_DODGE,
            setattr(document.createElement("td"), {textContent: this.regen}),
            TD_HASTE,
            setattr(document.createElement("td"), {textContent: this.res}),
            setattr(document.createElement("td"), {textContent: `${this.lash}%`}),
            TD_DBOOST,
            TD_DREDUC,
            TD_HBOOST
        )

        //#privatefield cannot be called dynamically, use exec/eval instead
    }
}
//#endregion

//#region Function Declarations
/** @type {HTMLInputElement[]} */ const CLASS_BUTTONS = Array.from(document.querySelectorAll("#classes input"));
function updateTable() {
    const SHOWN_CLASS = CLASS_BUTTONS.filter(x => x.checked).map(x => x.value);
    TBODY.replaceChildren(...UNIT_LIST.filter(x => SHOWN_CLASS.includes(x.class)).map(x => x.row));
}
for (const INPUT of CLASS_BUTTONS) INPUT.addEventListener("change", updateTable);

/** @this {HTMLTableCellElement} @param {MouseEvent} event */
function sortMethod(event) {
    const DATA = this.dataset;
    switch (DATA.sort) {
        case "no":
        case "lo":
            DATA.sort = "hi";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: (DATA.type === "number")}));
            break;
        case "hi":
            DATA.sort = "lo";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: (DATA.type === "string")}));
            break;
    }
    updateTable();
}
//#endregion

UNITS = (await UNITS).slice(0, -1);

//#region Statistics Table
/** @type {HTMLInputElement} */ const ARMA_BUTTON = document.querySelector(`#bonus [value="Arma"]`);
/** @type {HTMLInputElement} */ const BOND_BUTTON = document.querySelector(`#bonus [value="Bond"]`);
/** @type {HTMLInputElement} */ const SPEC_BUTTON = document.querySelector(`#bonus [value="Spec"]`);

const UNIT_LIST = UNITS.map(x => new Units(x));
for (const UNIT of UNIT_LIST) {
    ARMA_BUTTON.addEventListener("change", () => UNIT.updateStat())
}

const [THEAD, HEADER_TR] = nestElements("thead", "tr");

const TBODY = document.createElement("tbody");
updateTable()

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

const HEADER_VALUES = [
    ["Doll Name",           "name"],
    ["Max HP",              "hp"],
    ["Attack",              "atk"],
    ["Hashrate",            "hash"],
    ["Physical Def",        "pdef"],
    ["Operand Def",         "odef"],
    ["Attack Speed",        "aspd"],
    ["Crit Rate",           "crate"],
    ["Crit Damage",         "cdmg"],
    ["Physical Pen",        "ppen"],
    ["Operand Pen",         "open"],
    ["Dodge Rate",          "dodge"],
    ["Post-battle Regen",   "regen"],
    ["Skill Haste",         "haste"],
    ["Debuff Resist",       "res"],
    ["Backlash",            "lash"],
    ["Damage Boost",        "dboost"],
    ["Injury Mitigation",   "dreduc"],
    ["Healing Effect",      "hboost"]
]
for (const [[NAME, KEY], TYPE] of zip(HEADER_VALUES, (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = document.createElement("th");
    setattr(TH, {textContent: NAME, addEventListener: ["click", sortMethod, true]})
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

const STAT_TABLE = document.querySelector("#stat > .table");
STAT_TABLE.classList.add("func_table");
STAT_TABLE.appendChild(TABLE);
//#endregion

//#region Others
const DATA_ARRAY = UNITS.map(x => [x.name, x.reference, x.fragments]);
DATA_ARRAY.unshift(["Doll Name", "Reference", "Fragments"]);
tableSort(
    document.querySelector("#data > .table"),
    DATA_ARRAY,
    [
        x => x,
        x => brJoin(Object.entries(x).map(([name, link]) => setattr(document.createElement("a"), {textContent: name, href: link}))),
        x => brJoin(x)
    ],
    {frzcol: true, frzhdr: true}
);
//#endregion

//#region Type Declarations
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
//#endregion

