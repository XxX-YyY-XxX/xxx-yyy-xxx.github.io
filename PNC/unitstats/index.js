import {nestElements} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {zip, cmp, setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";
import {AlgoField} from "./algorithms.js";
import {STATS} from "./typing.js";

/** @type {Promise<UnitObject[]>} */ const UNIT_PROMISE = Async.getJSON("../units.json");

//#region Type Definitions
/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */

/**
 * @typedef UnitObject
 * @property {string} UnitObject.name
 * @property {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} UnitObject.class

 * @property {object} UnitObject.base
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

 * @property {object} UnitObject.arma
 * @property {number} UnitObject.arma.hp
 * @property {number} UnitObject.arma.atk
 * @property {number} UnitObject.arma.hash
 * @property {number} UnitObject.arma.pdef
 * @property {number} UnitObject.arma.odef
 * @property {number} UnitObject.arma.ppen
 * @property {number} UnitObject.arma.open

 * @property {[IntimacyStats, IntimacyStats, IntimacyStats]} UnitObject.intimacy
*/
//#endregion

//#region Constant Declarations
/** @type {HTMLInputElement} */ const ARMA_BUTTON = document.querySelector(`#bonus [value="Arma"]`);
/** @type {HTMLInputElement} */ const BOND_BUTTON = document.querySelector(`#bonus [value="Bond"]`);
/** @type {HTMLInputElement} */ const SPEC_BUTTON = document.querySelector(`#bonus [value="Spec"]`);
/** @type {HTMLInputElement} */ const POTB_BUTTON = document.querySelector(`#bonus [value="PotB"]`);
/** @type {HTMLInputElement} */ const ALGO_BUTTON = document.querySelector(`#bonus [value="Algo"]`);

const CLASS_BUTTONS = {
    /** @type {HTMLInputElement} */ Guard: document.querySelector('#classes [value="Guard"]'),
    /** @type {HTMLInputElement} */ Sniper: document.querySelector('#classes [value="Sniper"]'),
    /** @type {HTMLInputElement} */ Warrior: document.querySelector('#classes [value="Warrior"]'),
    /** @type {HTMLInputElement} */ Specialist: document.querySelector('#classes [value="Specialist"]'),
    /** @type {HTMLInputElement} */ Medic: document.querySelector('#classes [value="Medic"]')
}
//#endregion

/**
 * 
 * @param {IntimacyStats} bond 
 */
function bondstats(bond) {
    switch (bond) {
        case 'Code Robustness':         return "HP";
        case 'Power Connection':        return "ATTACK";
        case 'Neural Activation':       return "HASH";
        case 'Shield of Friendship':    return "PDEF";
        case 'Coordinated Strike':      return "CRATE";
        case 'Victorious Inspiration':  return "CDMG";
        case 'Risk Evasion Aid':        return "DODGE";
        case 'Mechanical Celerity':     return "HASTE";
        case 'Coordinated Formation':   return "DBOOST";
        case 'Through Fire and Water':  return "DREDUC";
        case 'Healing Bond':            return "HBOOST";
    }
}

//#region Class Declarations
class Units {
    name;
    class;

    #hp; #armahp;
    get [STATS.HEALTH]() {
        var output = this.#hp;
        if (POTB_BUTTON.checked) output += this.#hp * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahp;
        if (BOND_BUTTON.checked && this.#intistats.includes("Code Robustness")) output += 1320;
        if (SPEC_BUTTON.checked && ["Guard", "Warrior", "Specialist"].includes(this.class)) output += this.#hp * 0.21 + 1200;
        if (ALGO_BUTTON.checked) output += this.#algofield.hp;
        return Math.trunc(output);
    }

    #atk; #armaatk;
    get [STATS.ATTACK]() {
        var output = this.#atk;
        if (POTB_BUTTON.checked) output += this.#atk * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaatk;
        if (BOND_BUTTON.checked && this.#intistats.includes("Power Connection")) output += 55;
        if (SPEC_BUTTON.checked && ["Sniper", "Warrior", "Specialist"].includes(this.class)) output += this.#atk * 0.22 + 38;
        if (ALGO_BUTTON.checked) output += this.#algofield.atk;
        return Math.trunc(output);
    }

    #hash; #armahash;
    get [STATS.HASHRATE]() {
        var output = this.#hash;
        if (POTB_BUTTON.checked) output += this.#hash * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahash;
        if (BOND_BUTTON.checked && this.#intistats.includes("Neural Activation")) output += 55;
        if (SPEC_BUTTON.checked && ["Sniper", "Warrior", "Specialist", "Medic"].includes(this.class)) output += this.#hash * 0.22 + 38;
        if (ALGO_BUTTON.checked) output += this.#algofield.hash;
        return Math.trunc(output);
    }

    #pdef; #armapdef;
    get [STATS.PDEFENSE]() {
        var output = this.#pdef;
        if (POTB_BUTTON.checked) output += this.#pdef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armapdef;
        if (BOND_BUTTON.checked && this.#intistats.includes("Shield of Friendship")) output += 55;
        if (SPEC_BUTTON.checked && ["Guard", "Medic"].includes(this.class)) output += this.#pdef * 0.21 + 31;
        if (ALGO_BUTTON.checked) output += this.#algofield.pdef;
        return Math.trunc(output);
    }

    #odef; #armaodef;
    get [STATS.ODEFENSE]() {
        var output = this.#odef;
        if (POTB_BUTTON.checked) output += this.#odef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaodef;
        if (SPEC_BUTTON.checked && ["Guard", "Medic"].includes(this.class)) output += this.#odef * 0.21 + 31;
        if (ALGO_BUTTON.checked) output += this.#algofield.odef;
        return Math.trunc(output);
    }

    #aspd;
    get [STATS.ATKSPD]() {
        var output = this.#aspd;
        if (ALGO_BUTTON.checked) output += this.#algofield.aspd;
        return output;
    }

    #crate;
    get [STATS.CRITRATE]() {
        var output = this.#crate;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Strike")) output += 8;
        if (SPEC_BUTTON.checked && ["Sniper", "Warrior"].includes(this.class)) output += 9;
        if (ALGO_BUTTON.checked) output += this.#algofield.crate;
        return Math.round(output, 1);
    }

    #cdmg = 50;
    get [STATS.CRITDMG]() {
        var output = this.#cdmg;
        if (BOND_BUTTON.checked && this.#intistats.includes("Victorious Inspiration")) output += 12;
        if (SPEC_BUTTON.checked && ["Sniper"].includes(this.class)) output += 18;
        if (ALGO_BUTTON.checked) output += this.#algofield.cdmg;
        return Math.round(output, 1);
    }

    #ppen; #armappen;
    get [STATS.PPENETRATE]() {
        var output = this.#ppen;
        if (POTB_BUTTON.checked) output += this.#ppen * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armappen;
        if (SPEC_BUTTON.checked && ["Sniper"].includes(this.class)) output += this.#ppen * 0.07 + 65;
        if (ALGO_BUTTON.checked) output += this.#algofield.ppen;
        return Math.trunc(output);
    }

    #open; #armaopen;
    get [STATS.OPENETRATE]() {
        var output = this.#open;
        if (POTB_BUTTON.checked) output += this.#open * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaopen;
        if (ALGO_BUTTON.checked) output += this.#algofield.open;
        return Math.trunc(output);
    }

    #dodge;
    get [STATS.DODGE]() {
        var output = this.#dodge;
        if (BOND_BUTTON.checked && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        if (ALGO_BUTTON.checked) output += this.#algofield.dodge;
        return output;
    }

    #regen;
    get [STATS.POSTHEAL]() {
        var output = this.#regen;
        if (POTB_BUTTON.checked) output += {"Guard": 3584, "Sniper": 1084, "Warrior": 3301, "Specialist": 1485, "Medic": 1075}[this.class];
        if (ALGO_BUTTON.checked) output += this.#algofield.regen;
        return output;
    }

    #haste = 0;
    get [STATS.HASTE]() {
        var output = this.#haste;
        if (BOND_BUTTON.checked && this.#intistats.includes("Mechanical Celerity")) output += 8;
        if (SPEC_BUTTON.checked) output += {"Guard": 20, "Specialist": 25, "Medic": 15}[this.class] ?? 0;
        if (ALGO_BUTTON.checked) output += this.#algofield.haste;
        return Math.round(output, 1);
    }

    #res = 0;
    get [STATS.DEBUFFRES]() {
        var output = this.#res;
        if (SPEC_BUTTON.checked && ["Guard", "Warrior"].includes(this.class)) output += 150;
        if (ALGO_BUTTON.checked) output += this.#algofield.res;
        return output;
    }

    #lash = 0;
    get [STATS.BACKLASH]() {
        var output = this.#lash;
        if (ALGO_BUTTON.checked) output += this.#algofield.lash;
        return output;
    }

    #dboost = 0;
    get [STATS.DMGBOOST]() {
        var output = this.#dboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Formation")) output += 5;
        if (ALGO_BUTTON.checked) output += this.#algofield.dboost;
        return output;
    }

    #dreduc = 0;
    get [STATS.DMGREDUCE]() {
        var output = this.#dreduc;
        if (BOND_BUTTON.checked && this.#intistats.includes("Through Fire and Water")) output += 5;
        if (ALGO_BUTTON.checked) output += this.#algofield.dreduc;
        return output;
    }

    #hboost = 0;
    get [STATS.HEALBOOST]() {
        var output = this.#hboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Healing Bond")) output += 5;
        if (SPEC_BUTTON.checked && ["Medic"].includes(this.class)) output += 9;
        if (ALGO_BUTTON.checked) output += this.#algofield.hboost;
        return Math.round(output, 1);
    }

    /** @type {boolean} */ #hasarma;
    #intistats;
    #algofield;

    row;
    updateStat;

    /** @param {UnitObject} stat_object */
    constructor(stat_object) {
        this.#algofield = new AlgoField(stat_object, () => this.updateStat());

        this.name = stat_object.name;
        this.class = stat_object.class;

        const BASE = stat_object.base;
        this.#hp = BASE.hp;
        this.#atk = BASE.atk;
        this.#hash = BASE.hash;
        this.#pdef = BASE.pdef;
        this.#odef = BASE.odef;
        this.#aspd = BASE.aspd;
        this.#crate = BASE.crate;
        this.#ppen = BASE.ppen;
        this.#open = BASE.open;
        this.#dodge = BASE.dodge;
        this.#regen = BASE.regen;

        const ARMA = stat_object.arma;
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;

        this.#intistats = stat_object.intimacy;
        switch (this.#intistats.length) {
            case 0:
                console.warn(this.name, "lacks data: Intimacy");
                break;
            case 3:
                console.log(this.name, ...this.#intistats.map(bondstats));
                break;
            default:
                console.warn(this.name, this.#intistats.length)
                break;
        }

        const TD_NAME = document.createElement("td");
        TD_NAME.addEventListener("click", () => this.#algofield.show());

        const IMAGE = document.createElement("img");
        IMAGE.addEventListener("load", () => {
            setattr(IMAGE, {loading: "lazy", alt: `${this.name} arma.`});
            const SPAN = setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}});
            TD_NAME.appendChild(SPAN);
            this.#hasarma = true;
        });
        IMAGE.addEventListener("error", () => {
            TD_NAME.textContent = this.name;
            this.#hasarma = false;
        });
        IMAGE.src = `../assets/images/arma/${this.name.replace(" ", "")}.png`;

        const TD_HP = document.createElement("td");
        const TD_ATK = document.createElement("td");
        const TD_HASH = document.createElement("td");
        const TD_PDEF = document.createElement("td");
        const TD_ODEF = document.createElement("td");
        const TD_ASPD = document.createElement("td");
        const TD_CRATE = document.createElement("td");
        const TD_CDMG = document.createElement("td");
        const TD_PPEN = document.createElement("td");
        const TD_OPEN = document.createElement("td");
        const TD_DODGE = document.createElement("td");
        const TD_REGEN = document.createElement("td");
        const TD_HASTE = document.createElement("td");
        const TD_DEBUFF = document.createElement("td");
        const TD_LASH = document.createElement("td");
        const TD_DBOOST = document.createElement("td");
        const TD_DREDUC = document.createElement("td");
        const TD_HBOOST = document.createElement("td");

        this.updateStat = () => {
            TD_HP.textContent = this[STATS.HEALTH];
            TD_ATK.textContent = this[STATS.ATTACK];
            TD_HASH.textContent = this[STATS.HASHRATE];
            TD_PDEF.textContent = this[STATS.PDEFENSE];
            TD_ODEF.textContent = this[STATS.ODEFENSE];
            TD_ASPD.textContent = this[STATS.ATKSPD];
            TD_CRATE.textContent = `${this[STATS.CRITRATE]}%`;
            TD_CDMG.textContent = `${this[STATS.CRITDMG]}%`;
            TD_PPEN.textContent = this[STATS.PPENETRATE];
            TD_OPEN.textContent = this[STATS.OPENETRATE];
            TD_DODGE.textContent = `${this[STATS.DODGE]}%`;
            TD_REGEN.textContent = this[STATS.POSTHEAL];
            TD_HASTE.textContent = `${this[STATS.HASTE]}%`;
            TD_DEBUFF.textContent = this[STATS.DEBUFFRES];
            TD_LASH.textContent = `${this[STATS.BACKLASH]}%`;
            TD_DBOOST.textContent = `${this[STATS.DMGBOOST]}%`;
            TD_DREDUC.textContent = `${this[STATS.DMGREDUCE]}%`;
            TD_HBOOST.textContent = `${this[STATS.HEALBOOST]}%`;
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
            TD_ASPD,
            TD_CRATE,
            TD_CDMG,
            TD_PPEN,
            TD_OPEN,
            TD_DODGE,
            TD_REGEN,
            TD_HASTE,
            TD_DEBUFF,
            TD_LASH,
            TD_DBOOST,
            TD_DREDUC,
            TD_HBOOST
        )

        for (const BUTTON of [ARMA_BUTTON, POTB_BUTTON, ALGO_BUTTON, SPEC_BUTTON, BOND_BUTTON]) BUTTON.addEventListener("change", this.updateStat);

        const UNIT_ROW = this.row;
        CLASS_BUTTONS[this.class].addEventListener("change", function(event) {
            UNIT_ROW.classList.toggle("hidden", !this.checked);
        });

        //#privatefield cannot be called dynamically, use exec/eval instead
    }
}
//#endregion

//#region Function Declarations
// function updateTable() {
//     const SHOWN_CLASS = Object.values(CLASS_BUTTONS).filter(x => x.checked).map(x => x.value);
//     TBODY.replaceChildren(...UNIT_LIST.filter(x => SHOWN_CLASS.includes(x.class)).map(x => x.row));
// }
// for (const INPUT of Object.values(CLASS_BUTTONS)) INPUT.addEventListener("change", updateTable);

/** @this {HTMLTableCellElement} @param {MouseEvent} event */
function sortMethod(event) {
    const DATA = this.dataset;
    switch (DATA.sort) {
        case "no":
        case "lo":
            DATA.sort = "hi";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: DATA.type === "number"}));
            break;
        case "hi":
            DATA.sort = "lo";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: DATA.type === "string"}));
            break;
    }
    // updateTable();
    TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));

}
//#endregion

const UNIT_LIST = (await UNIT_PROMISE).slice(0, -1).map(x => new Units(x));

const [THEAD, HEADER_TR] = nestElements("thead", "tr");

const TBODY = document.createElement("tbody");
// updateTable()
TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, ["name", ...Object.values(STATS)], (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = document.createElement("th");
    setattr(TH, {textContent: NAME, addEventListener: ["click", sortMethod, true]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

const STAT_TABLE = document.querySelector("#table");
STAT_TABLE.classList.add("func_table");
STAT_TABLE.appendChild(TABLE);