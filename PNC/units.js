import {tableSort, initializeHTML, brJoin, radioGroup, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async, setAttr} from "../univasset/scripts/externaljavascript.js";
import {zip, cmp} from "../univasset/scripts/basefunctions/index.js"

const STAT = document.querySelector("#stats"), DATA = document.querySelector("#data");
radioGroup(document.querySelector("#button"), "tables",
    [initializeHTML("h2", {textContent: "Stats"}), "stat", function(x) {STAT.style.display = x.checked ? "block" : "none"}],
    [initializeHTML("h2", {textContent: "Others"}), "data", function(x) {DATA.style.display = x.checked ? "block" : "none"}]
);

/** @type {{}[]} */ const UNITS = (await Async.getJSON('./units.json')).slice(0, -1);
const INTIMACY_STATS = {
    "Code Robustness": ["hp", 1320],
    "Power Connection": ["atk", 55],
    "Neural Activation": ["hash", 55],
    "Shield of Friendship": ["pdef", 55],
    "Coordinated Strike": ["crate", 8],
    "Victorious Inspiration": ["cdmg", 12],
    "Risk Evasion Aid": ["dodge", -1],
    "Mechanical Celerity": ["haste", 8],
    "Coordinated Formation": ["dboost", 5],
    "Through Fire and Water": ["reduc", 5],
}

//#region Statistics Table
class Units {
    //#region Variables
    /** @type {string} */ name;
    /** @type {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} */ #class;

    #hp; #armahp;
    /** @returns {number} */
    get hp() {
        var output = this.#hp;
        if (this.#hasarma && this.#arma) output += this.#armahp;
        return output;
    }

    #atk; #armaatk;
    /** @returns {number} */
    get atk() {
        var output = this.#atk;
        if (this.#hasarma && this.#arma) output += this.#armaatk;
        return output;
    }

    #hash; #armahash;
    /** @returns {number} */
    get hash() {
        var output = this.#hash;
        if (this.#hasarma && this.#arma) output += this.#armahash;
        return output;
    }

    #pdef; #armapdef;
    /** @returns {number} */
    get pdef() {
        var output = this.#pdef;
        if (this.#hasarma && this.#arma) output += this.#armapdef;
        return output;
    }

    #odef; #armaodef;
    /** @returns {number} */
    get odef() {
        var output = this.#odef;
        if (this.#hasarma && this.#arma) output += this.#armaodef;
        return output;
    }

    /** @type {number} */ aspd;
    /** @type {number} */ crate;

    #ppen; #armappen;
    /** @returns {number} */
    get ppen() {
        var output = this.#ppen;
        if (this.#hasarma && this.#arma) output += this.#armappen;
        return output;
    }

    #open; #armaopen;
    /** @returns {number} */
    get open() {
        var output = this.#open;
        if (this.#hasarma && this.#arma) output += this.#armaopen;
        return output;
    }

    /** @type {number} */ dodge;
    /** @type {number} */ regen;

    /** @type {string} */ #icon;

    #arma = false;
    #hasarma;

    row;
    #updateStat;
    //#endregion

    constructor(stat_object) {
        //#region Assignment
        this.name = stat_object.name;
        this.#class = stat_object.class;

        this.#hp = stat_object.hp;
        this.#atk = stat_object.atk;
        this.#hash = stat_object.hash;
        this.#pdef = stat_object.pdef;
        this.#odef = stat_object.odef;
        this.aspd = stat_object.aspd;
        this.crate = stat_object.crate;
        this.#ppen = stat_object.ppen;
        this.#open = stat_object.open;
        this.dodge = stat_object.dodge;
        this.regen = stat_object.regen;

        const ARMA = stat_object.arma;
        this.#icon = ARMA.icon;
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;
        //#endregion

        this.#hasarma = /\.\/assets\/images\/arma\/\S+\.png/.test(this.#icon);

        //#region HTML Elements
        this.row = document.createElement("tr");

        const TD_NAME = document.createElement("td");
        TD_NAME.append(this.name);
        if (this.#hasarma) {
            const IMAGE = document.createElement("img");
            setAttr(IMAGE, {alt: `${this.name} arma.`, src: this.#icon})
            IMAGE.classList.add("arma");
            TD_NAME.appendChild(IMAGE);
        }

        const TD_HP = initializeHTML("td", {textContent: this.hp});
        const TD_ATK = initializeHTML("td", {textContent: this.atk});
        const TD_HASH = initializeHTML("td", {textContent: this.hash});
        const TD_PDEF = initializeHTML("td", {textContent: this.pdef});
        const TD_ODEF = initializeHTML("td", {textContent: this.odef});
        const TD_PPEN = initializeHTML("td", {textContent: this.ppen});
        const TD_OPEN = initializeHTML("td", {textContent: this.open});

        this.#updateStat = () => {
            TD_HP.textContent = this.hp;
            TD_ATK.textContent = this.atk;
            TD_HASH.textContent = this.hash;
            TD_PDEF.textContent = this.pdef;
            TD_ODEF.textContent = this.odef;
            TD_PPEN.textContent = this.ppen;
            TD_OPEN.textContent = this.open;
        }
 
        this.row.append(
            TD_NAME,
            TD_HP,
            TD_ATK,
            TD_HASH,
            TD_PDEF,
            TD_ODEF,
            initializeHTML("td", {textContent: this.aspd}),
            initializeHTML("td", {textContent: `${this.crate}%`}),
            TD_PPEN,
            TD_OPEN,
            initializeHTML("td", {textContent: `${this.dodge}%`}),
            initializeHTML("td", {textContent: this.regen})
        )
        //#endregion

        console.log(this["name"], this["#icon"]);
    }
}

function updateTable() {
    TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));
}

const UNIT_LIST = UNITS.map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");

const TBODY = document.createElement("tbody");
TBODY.append(...UNIT_LIST.map(unit => unit.row))

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

/** @param {MouseEvent} event */
function sortMethod(event) {
    /** @type {DOMStringMap} */ const DATA = this.dataset;
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
function* returnType() {yield "string"; while (true) yield "number"};
for (const [NAME, KEY, TYPE] of zip(HEADER_NAMES, HEADER_KEYS, returnType())) {
    const TH = document.createElement("th");
    TH.textContent = NAME;
    TH.addEventListener("click", sortMethod, true);
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