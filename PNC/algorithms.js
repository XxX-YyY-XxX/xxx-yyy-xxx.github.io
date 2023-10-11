import {STATS} from "./typing.js";
import {cmp, chain, setattr, type} from "../univasset/scripts/basefunctions/index.js";

//#region Type Definitions
/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */

/**
 * @typedef UnitObject
 * @property {string} UnitObject.name
 * @property {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} UnitObject.class
 * @property {{[linkname: string]: [linkurl: string]}} UnitObject.reference
 * @property {string[]} UnitObject.fragments

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

//#region Constants
/** @type {HTMLDialogElement} */ const ALGO_MODAL = document.querySelector("#algo-modal");
/** @type {HTMLButtonElement} */ const ALGO_CLOSE = document.querySelector("#algo-modal button");

/** @type {HTMLDialogElement} */ const ALGO_SELECT = document.querySelector("#algo-select");
/** @type {HTMLDivElement} */ const ALGO_CHOICES = document.querySelector("#algo-select div");
/** @type {HTMLButtonElement} */ const ALGO_PICK = document.querySelector("#algo-select button");
ALGO_PICK.addEventListener("click", function() {
    ALGO_SELECT.close()
    console.log("Algorith selector closed.")
})
//#endregion

//#region Functions
/** @param {StatDict} object1 @param {StatDict} object2 @returns {StatDict} */
function combine(object1, object2) {
    const OUTPUT = new Map();
    for (const attribute of new Set(chain(object1.keys(), object2.keys())))
        OUTPUT.set(attribute, (object1.get(attribute) ?? 0) + (object2.get(attribute) ?? 0));
    return OUTPUT;
}

/** @param  {...number} items @returns {number?} */
function sum(...items) {
    switch (items.length) {
        case 0:
            return null;
        case 1:
            return items[0];
        default:
            var output = 0;
            for (const item of items)
                output += item;
            return output;
    }
}
//#endregion

//#region Base
/** @typedef {keyof MAINSTATS | keyof SUBSTATS} StatAttributes */
/** @typedef {Map<StatAttributes, number>} StatDict */
/** @typedef {STATS[keyof STATS]} StatNames */

const MAINSTATS = {
    hpflat: 1800,   hpperc: 12,
    atkflat: 54,    atkperc: 12,
    hashflat: 54,   hashperc: 12,
    pdefflat: 56,   pdefperc: 7.2,
    odefflat: 56,   odefperc: 7.2,

    crateperc: 8,
    cdmgperc: 16,
    ppenflat: 20,   ppenperc: 7.2,
    openflat: 12,   openperc: 7.2,

    regenflat: 720,
    hasteperc: 8,
    hboostperc: 4
}

const SUBSTATS = {
    hpflat: 1080,   hpperc: 7.2,
    atkflat: 32,    atkperc: 7.2,
    hashflat: 32,   hashperc: 7.2,
    pdefflat: 33,   pdefperc: 4.3,
    odefflat: 33,   odefperc: 3.3,

    crateperc: 4.8,
    cdmgperc: 9.6,
    ppenflat: 12,
    openflat: 12,

    dodgeperc: 3.9,
    regenflat: 432,
    hasteperc: 4.8,
    resflat: 30,
    dboostperc: 3.9,
    dreducperc: 3.9,
    hboostperc: 2.4
}

class Algorithm {
    /** @type {StatDict} */ SET2;
    /** @type {number} */ SIZE;

    /** @type {[StatAttributes, StatAttributes]} */ #substat;
    /** @type {StatAttributes} */ #mainstat;

    constructor() {
        this.#substat = new Array(2);
    }

    /** @param {StatAttributes?} attribute @returns {StatDict} */
    mainstat(attribute = null) {
        if (attribute) this.#mainstat = attribute;
        return new Map([[this.#mainstat, MAINSTATS[this.#mainstat]]]);
    }

    /** @param {number} position @param {StatAttributes?} attribute @returns {StatDict} */
    substat(position, attribute = null) {
        if (attribute) this.#substat[position] = attribute;
        const ATTR = this.#substat[position];
        return new Map([[ATTR, SUBSTATS[ATTR]]]);
    }

    /** @returns {StatDict} */
    get stats() {

        const OUT = combine(this.SET2, this.mainstat()) ;

        {
            console.log(this.#substat)
            const [first, second] = this.#substat;
            OUT.set(first, (OUT.get(first) ?? 0) + SUBSTATS[first]);
            OUT.set(second, (OUT.get(second) ?? 0) + (SUBSTATS[second] ?? 0));
        }

        return OUT;
    }

    get html() {
        const OUTPUT = document.createElement("div");
        OUTPUT.classList.add("algo-block");
        //add symbol
        //add mainstat
        //add substat
        //add remove
        return OUTPUT;
    }
}

class SingleBlock extends Algorithm {
    SET2 = new Map();
    SIZE = 1;

    get html() {
        return super.html
    }
}

class DoubleBlock extends Algorithm {
    SIZE = 2;

    get html() {
        return super.html
    }
}
//#endregion

//#region Offense
/** @typedef {"atkflat"|"atkperc"|"hashflat"|"hashperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"} OffenseMainstat */
/** @typedef {"hpflat"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"odefflat"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dboostperc"} OffenseSubstat*/

class Offense extends DoubleBlock {
    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super.mainstat(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat1(attribute = null) {
        return super.substat(0, attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat2(attribute = null) {
        return super.substat(1, attribute);
    }
}

class OffenseBlock extends SingleBlock {
    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat(attribute = null) {
        return super.substat(0, attribute);
    }
}

class FeedForward extends Offense {
    SET2 = new Map([["atkperc", 15]]);
}

class Progression extends Offense {
    SET2 = new Map([["hashperc", 15]]);
}

class Stack extends Offense {
    SET2 = new Map([["hashperc", 15]]);
}

class Deduction extends Offense {
    SET2 = new Map([["aspdflat", 30]]);
}

class DataRepair extends Offense {
    SET2 = new Map([["resflat", 30]]);
}

class MLRMatrix extends Offense {
    SET2 = new Map([["dboostperc", 5]]);
}

class LimitValue extends Offense {
    SET2 = new Map([["dboostperc", 5]]);
}

class LowerLimit extends Offense {
    SET2 = new Map();
}
//#endregion

//#region Stability
/** @typedef {"hpflat"|"hpperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"regenflat"} StabilityMainstat */
/** @typedef {"hpflat"|"hpperc"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dreducperc"} StabilitySubstat */

class Stability extends DoubleBlock {
    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super.substat(0, attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super.substat(1, attribute);
    }
}

class StabilityBlock extends SingleBlock {
    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat(attribute) {
        return super.substat(0, attribute);
    }
}

class Perception extends Stability {
    SET2 = new Map([["hpperc", 15]]);
}

class Rationality extends Stability {
    SET2 = new Map([["pdefperc", 15]]);
}

class Connection extends Stability {
    SET2 = new Map([["resflat", 50]]);
}

class Iteration extends Stability {
    SET2 = new Map([["lashperc", 5]]);
}

class Reflection extends Stability {
    SET2 = new Map([["lashperc", 5]]);
}

class Encapsulate extends Stability {
    SET2 = new Map([["dreducperc", 5]]);
}

class Resolve extends Stability {
    SET2 = new Map([["dreducperc", 5]]);
}

class Overflow extends Stability {
    SET2 = new Map();
}
//#endregion

//#region Special
/** @typedef {"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"hasteperc"|"hboostperc"} SpecialMainstat */
/** @typedef {"hpflat"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"hboostperc"} SpecialSubstat*/

class Special extends DoubleBlock {
    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super.substat(0, attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super.substat(1, attribute);
    }
}

class SpecialBlock extends SingleBlock {
    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat(attribute) {
        return super.substat(0, attribute);
    }
}

class Paradigm extends Special {
    SET2 = new Map([["aspdflat", 30]]);
}

class Cluster extends Special {
    SET2 = new Map([["crateperc", 10]]);
}

class Convolution extends Special {
    SET2 = new Map([["cdmgperc", 20]]);
}

class Stratagem extends Special {
    SET2 = new Map([["dodgeperc", 8]]);
}

class DeltaV extends Special {
    SET2 = new Map([["hasteperc", 10]]);
}

class Exploit extends Special {
    SET2 = new Map([["hasteperc", 10]]);
}

class LoopGain extends Special {
    SET2 = new Map([["hboostperc", 7.5]]);
}

class SVM extends Special {
    SET2 = new Map([["hboostperc", 7.5]]);
}

class Inspiration extends Special {
    SET2 = new Map();
}
//#endregion

//#region Interface
const MAX_SIZE = 6;
const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal #Offense > .algo-grid"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal #Stability > .algo-grid"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal #Special > .algo-grid")
}
const ALGO_SETS = {
    Offense: [OffenseBlock, FeedForward, Progression, Stack, Deduction, DataRepair, MLRMatrix, LimitValue, LowerLimit],
    Stability: [StabilityBlock, Perception, Rationality, Connection, Iteration, Reflection, Encapsulate, Resolve, Overflow],
    Special: [SpecialBlock, Paradigm, Cluster, Convolution, Stratagem, DeltaV, Exploit, LoopGain, SVM, Inspiration]
}

class AlgoGrid {
    #grid;
    /** @type {Algorithm[]} */ #algorithms;

    #closedgrid;

    /** @param {"Offense" | "Stability" | "Special"} fieldtype @param {number} size */
    constructor(fieldtype, size) {
        this.#grid = GRIDS[fieldtype];
        this.#algorithms = [];
        this.#closedgrid = MAX_SIZE - size;

        this.type = fieldtype
    }

    display() {
        this.#algorithms.sort(cmp({key: x => x.SIZE, reverse: true}));
        const ALGO_SIZE = sum(...this.#algorithms.map(x => x.SIZE)) ?? 0;

        this.#grid.append(...this.#algorithms.map(x => x.html));

        for (let index = 0; index < (MAX_SIZE - (this.#closedgrid + ALGO_SIZE)); index++) {
            const BUTTON = document.createElement("button");
            BUTTON.type = "button";
            BUTTON.classList.add("algo-empty")
            BUTTON.addEventListener("click", () => {
                ALGO_CHOICES
                ALGO_SELECT.showModal()
                console.log(this.type, index)
            })
            this.#grid.appendChild(BUTTON);
        }

        for (let index = 0; index < this.#closedgrid; index++) this.#grid.appendChild(setattr(document.createElement("div"), {classList: {add: ["algo-close"]}}))            
    }

    /** @returns {StatDict} */
    get stats() {
        switch (this.#algorithms.length) {
            case 0:
                return new Map();
            default:
                return this.#algorithms.map(x => x.stats).reduce(combine);
        }
    }
}

export class AlgoField{
    #name;
    #basestat;

    #algogrids;
    /** @type {StatDict} */ #stats;

    get [STATS.HEALTH]() {
        return this.#basestat.hp * (this.#stats.get("hpperc") ?? 0) + (this.#stats.get("hpflat") ?? 0);
    }

    get [STATS.ATTACK]() {
        return this.#basestat.atk * (this.#stats.get("atkperc") ?? 0) + (this.#stats.get("atkflat") ?? 0);
    }

    get [STATS.HASHRATE]() {
        return this.#basestat.hash * (this.#stats.get("hashperc") ?? 0) + (this.#stats.get("hashflat") ?? 0);
    }

    get [STATS.PDEFENSE]() {
        return this.#basestat.pdef * (this.#stats.get("pdefperc") ?? 0) + (this.#stats.get("pdefflat") ?? 0);
    }

    get [STATS.ODEFENSE]() {
        return this.#basestat.odef * (this.#stats.get("odefperc") ?? 0) + (this.#stats.get("odefflat") ?? 0);
    }

    get [STATS.ATKSPD]() {
        return this.#stats.get("aspdflat") ?? 0;
    }

    get [STATS.CRITRATE]() {
        return this.#stats.get("crateperc") ?? 0;
    }

    get [STATS.CRITDMG]() {
        return this.#stats.get("cdmgperc") ?? 0;
    }

    get [STATS.PPENETRATE]() {
        return this.#basestat.ppen * (this.#stats.get("ppenperc") ?? 0) + (this.#stats.get("ppenflat") ?? 0);
    }

    get [STATS.OPENETRATE]() {
        return this.#basestat.open * (this.#stats.get("openperc") ?? 0) + (this.#stats.get("openflat") ?? 0);
    }

    get [STATS.DODGE]() {
        return this.#stats.get("dodgeperc") ?? 0;
    }

    get [STATS.POSTHEAL]() {
        return this.#stats.get("regenflat") ?? 0;
    }

    get [STATS.HASTE]() {
        return this.#stats.get("hasteperc") ?? 0;
    }

    get [STATS.DEBUFFRES]() {
        return this.#stats.get("resflat") ?? 0;
    }

    get [STATS.BACKLASH]() {
        return this.#stats.get("lashperc") ?? 0;
    }

    get [STATS.DMGBOOST]() {
        return this.#stats.get("dboostperc") ?? 0;
    }

    get [STATS.DMGREDUCE]() {
        return this.#stats.get("dreducperc") ?? 0;
    }

    get [STATS.HEALBOOST]() {
        return this.#stats.get("hboostperc") ?? 0;
    }

    /** @param {UnitObject} unit @param {function(): void} onclose */
    constructor(unit, onclose = () => {}) {
        this.#name = unit.name;
        this.#basestat = unit.base;

        this.#stats = new Map();
        this.#onClose = onclose;

        const LAYOUT = {
            "Guard": "465",
            "Sniper": "645",
            "Warrior": "654",
            "Specialist": "546",
            "Medic": unit.name === "Imhotep" ? "546" : "456"
        }[unit.class];

        this.#algogrids = [
            new AlgoGrid("Offense", Number(LAYOUT[0])),
            new AlgoGrid("Stability", Number(LAYOUT[1])),
            new AlgoGrid("Special", Number(LAYOUT[2]))
        ];

    }

    show() {
        ALGO_MODAL.firstElementChild.textContent = this.#name;
        for (const GRID of this.#algogrids) GRID.display()

        ALGO_CLOSE.addEventListener("click", () => this.#close())

        ALGO_MODAL.showModal()

    }

    #onClose;
    #close() {
        this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);
        this.#onClose();

        ALGO_MODAL.close()

        ALGO_CLOSE.removeEventListener("click", this.#close);

        ALGO_MODAL.firstElementChild.textContent = "";
        for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
    }
}
//#endregion

console.log("Algorithm.name:", Algorithm.name, type(Algorithm.name))
console.log("Algorithm.prototype.constructor.name:", Algorithm.prototype.constructor.name, type(Algorithm.prototype.constructor.name))

var a = new Algorithm()
console.log("a.constructor:", a.constructor, type(a.constructor))
console.log("a.constructor.name:", a.constructor.name, type(a.constructor.name))
console.log("Object.getPrototypeOf(a):", Object.getPrototypeOf(a), type(Object.getPrototypeOf(a)))

/* Failed
    a.constructor.toString().match(/function\s*(\w+)/)                  null
    Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]    Object
*/