import {tableSort, brJoin, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";
import {zip, cmp, setattr} from "../univasset/scripts/basefunctions/index.js"

/** @type {UnitObject[]} */ var UNITS = Async.getJSON('./units.json');

//#region Class Declarations
class Units {
    name;
    class;

    #hp; #armahp;
    get hp() {
        var output = this.#hp;
        if (POTB_BUTTON.checked) output += this.#hp * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahp;
        if (BOND_BUTTON.checked && this.#intistats.includes("Code Robustness")) output += 1320;
        return Math.floor(output);
    }

    #atk; #armaatk;
    get atk() {
        var output = this.#atk;
        if (POTB_BUTTON.checked) output += this.#atk * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaatk;
        if (BOND_BUTTON.checked && this.#intistats.includes("Power Connection")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#atk * 0.22 + 38}[this.class] ?? 0;
        return Math.floor(output);
    }

    #hash; #armahash;
    get hash() {
        var output = this.#hash;
        if (POTB_BUTTON.checked) output += this.#hash * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahash;
        if (BOND_BUTTON.checked && this.#intistats.includes("Neural Activation")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#hash * 0.22 + 38}[this.class] ?? 0;
        return Math.floor(output);
    }

    #pdef; #armapdef;
    get pdef() {
        var output = this.#pdef;
        if (POTB_BUTTON.checked) output += this.#pdef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armapdef;
        if (BOND_BUTTON.checked && this.#intistats.includes("Shield of Friendship")) output += 55;
        return Math.floor(output);
    }

    #odef; #armaodef;
    get odef() {
        var output = this.#odef;
        if (POTB_BUTTON.checked) output += this.#odef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaodef;
        return Math.floor(output);
    }

    aspd;

    #crate;
    get crate() {
        var output = this.#crate;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Strike")) output += 8;
        if (SPEC_BUTTON.checked) output += {"Sniper": 9}[this.class] ?? 0;
        return output;
    }

    #cdmg = 50;
    get cdmg() {
        var output = this.#cdmg;
        if (BOND_BUTTON.checked && this.#intistats.includes("Victorious Inspiration")) output += 12;
        if (SPEC_BUTTON.checked) output += {"Sniper": 18}[this.class] ?? 0;
        return output;
    }

    #ppen; #armappen;
    get ppen() {
        var output = this.#ppen;
        if (POTB_BUTTON.checked) output += this.#ppen * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armappen;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#ppen * 0.07 + 65}[this.class] ?? 0;
        return Math.floor(output);
    }

    #open; #armaopen;
    get open() {
        var output = this.#open;
        if (POTB_BUTTON.checked) output += this.#open * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaopen;
        return Math.floor(output);
    }

    #dodge;
    get dodge() {
        var output = this.#dodge;
        if (BOND_BUTTON.checked && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        return output;
    }

    #regen; #potregen;
    get regen() {
        var output = this.#regen;
        if (POTB_BUTTON.checked) output += this.#potregen;
        return output;
    }

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

        const BASE = stat_object.base;
        this.#hp = BASE.hp;
        this.#atk = BASE.atk;
        this.#hash = BASE.hash;
        this.#pdef = BASE.pdef;
        this.#odef = BASE.odef;
        this.aspd = BASE.aspd;
        this.#crate = BASE.crate;
        this.#ppen = BASE.ppen;
        this.#open = BASE.open;
        this.#dodge = BASE.dodge;
        this.#regen = BASE.regen;

        const POT = stat_object.potential;
        //this.#potatk = POT.atk;
        //this.#pothash = POT.hash;
        //this.#potpdef = POT.pdef;
        //this.#potodef = POT.odef;
        //this.#potppen = POT.ppen;
        //this.#potopen = POT.open;
        this.#potregen = POT.regen;

        const STAT = "atk"
        console.log(
            this.name, "Attack:",
            Math.floor(BASE[STAT] * 0.61) === POT[STAT],
            POT[STAT] / BASE[STAT]
        )

        const ARMA = stat_object.arma;
        //this.#hasarma = ARMA.icon === `./assets/images/arma/${this.name.replace(" ", "")}.png`;
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;

        this.#intistats = stat_object.intimacy;

        const TD_NAME = document.createElement("td");
        //if (this.#hasarma) {
        //    const IMAGE = setattr(document.createElement("img"), {alt: `${this.name} arma.`, src: ARMA.icon});
        //    const SPAN = setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}})
        //    TD_NAME.appendChild(SPAN);
        //} else {
        //    TD_NAME.textContent = this.name;
        //}

        const IMAGE = document.createElement("img");
        IMAGE.addEventListener("load", () => {
            console.log(this.name, "has arma.")
            this.#hasarma = true;
            setattr(IMAGE, {loading: "lazy", alt: `${this.name} arma.`});
            TD_NAME.appendChild(setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}}));
        });
        IMAGE.addEventListener("error", () => {
            console.log(this.name, "has no arma.")
            this.#hasarma = false;
            TD_NAME.textContent = this.name;
        });
        IMAGE.src = `./assets/images/arma/${this.name.replace(" ", "")}.png`;

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
        const TD_REGEN = document.createElement("td");
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
            TD_REGEN.textContent = this.regen;
            TD_HASTE.textContent = `${this.haste}%`;
            TD_DBOOST.textContent = `${this.dboost}%`;
            TD_DREDUC.textContent = `${this.dreduc}%`;
            TD_HBOOST.textContent = `${this.hboost}%`;
        }
        this.updateStat()

        this.row = document.createElement("tr");
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
            TD_REGEN,
            TD_HASTE,
            setattr(document.createElement("td"), {textContent: this.res}),
            setattr(document.createElement("td"), {textContent: `${this.lash}%`}),
            TD_DBOOST,
            TD_DREDUC,
            TD_HBOOST
        )

        //#privatefield cannot be called dynamically, use exec/eval instead

        /* function loadImage (url, timeoutOrCallback, maybeCallback) {
            let timeout;
            let callback;

            switch (typeof timeoutOrCallback) {
                case "number":
                    timeout = timeoutOrCallback;
                    if (typeof maybeCallback === 'function') callback = maybeCallback;
                    break;
                case "function":
                    callback = timeoutOrCallback;
                    break;
            }

            const promise = callback
              ? undefined
              : new Promise(resolve => void (callback = resolve));
          
            const onlyRunOnce = {once: true};
            let timerId = 0;
            let done = false;
          
            if (typeof timeout === 'number') {
              timerId = setTimeout(() => {
                done = true;
                callback(false);
              }, timeout);
            }
          
            const img = new Image();
          
            img.addEventListener('load', () => {
              if (done) return;
              clearTimeout(timerId);
              done = true;
              callback(true);
            }, onlyRunOnce);
        } */
        
        /* function imageExists(url) {
            return new Promise(resolve => {
                var img = new Image()
                img.addEventListener('load', () => resolve(true))
                img.addEventListener('error', () => resolve(false))
                img.src = url
            })
            }
            
            const url = 'http://www.google.com/images/srpr/nav_logo14.png'
            imageExists(url)
            .then(ok => console.log(`RESULT: exists=${ok}`))
            //                    => RESULT: exists=true */
    }
}

//class Algorithms {
//    
//}
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
/** @type {HTMLInputElement} */ const POTB_BUTTON = document.querySelector(`#bonus [value="PotB"]`);

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
 * @property {{[linkname: string]: [linkurl: string]}} UnitObject.reference
 * @property {string[]} UnitObject.fragments Where to obtain unit fragments.

 * @property {Object} UnitObject.base
 * @property {number} UnitObject.base.hp
 * @property {number} UnitObject.base.atk
 * @property {number} UnitObject.base.hash
 * @property {number} UnitObject.base.pdef
 * @property {number} UnitObject.base.odef
 * @property {number} UnitObject.base.aspd
 * @property {number} UnitObject.base.crate
 * @property {number} UnitObject.base.ppen
 * @property {number} UnitObject.base.open
 * @property {number} UnitObject.base.dodge
 * @property {number} UnitObject.base.regen

 * @property {Object} UnitObject.potential Potential Breakthrough
 * @property {number} UnitObject.potential.hp
 * @property {number} UnitObject.potential.atk
 * @property {number} UnitObject.potential.hash
 * @property {number} UnitObject.potential.pdef
 * @property {number} UnitObject.potential.odef
 * @property {number} UnitObject.potential.ppen
 * @property {number} UnitObject.potential.open
 * @property {number} UnitObject.potential.regen

 * @property {Object} UnitObject.arma Arma Inscripta
 * @property {string} UnitObject.arma.icon Link to arma emblem.
 * @property {number} UnitObject.arma.hp
 * @property {number} UnitObject.arma.atk
 * @property {number} UnitObject.arma.hash
 * @property {number} UnitObject.arma.pdef
 * @property {number} UnitObject.arma.odef
 * @property {number} UnitObject.arma.ppen
 * @property {number} UnitObject.arma.open

 * @property {[IntimacyStats, IntimacyStats, IntimacyStats]} UnitObject.intimacy Intimacy */

/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */
//#endregion

