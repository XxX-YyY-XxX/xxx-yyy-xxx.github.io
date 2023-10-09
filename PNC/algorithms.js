import {STATS} from "./typing.js";
import {cmp, chain} from "../univasset/scripts/basefunctions/index.js";

/** @type {HTMLDialogElement} */ const ALGO_MODAL = document.querySelector("#algo-modal");
/** @type {HTMLButtonElement} */ const ALGO_CLOSE = document.querySelector("#algo-modal button");

/** @param {StatDict} object1 @param {StatDict} object2 @returns {StatDict} */
function combine(object1, object2) {
    const OUTPUT = new Map();
    for (const attribute of new Set(chain(object1.keys(), object2.keys())))
        OUTPUT.set(attribute, (object1.get(attribute) ?? 0) + (object2.get(attribute) ?? 0));
    return OUTPUT;
}

//#region Base
/** @typedef {keyof MAINSTATS | keyof SUBSTATS} StatAttributes */
/** @typedef {[StatAttributes, number]} StatInfo */
/** @typedef {STATS[keyof STATS]} StatNames */
/** @typedef {Map<StatAttributes, number>} StatDict */

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
    /** @type {StatInfo?} */ SET2;
    SIZE = 2;

    /** @type {[StatAttributes, StatAttributes]} */ #substat;
    /** @type {StatAttributes} */ #mainstat;

    constructor() {
        this.#substat = new Array(2);
    }

    /** @param {StatAttributes?} attribute @returns {StatInfo} */
    mainstat(attribute = null) {
        if (attribute)
            this.#mainstat = attribute;
        return [this.#mainstat, MAINSTATS[this.#mainstat]];
    }

    /** @param {number} position @param {StatAttributes?} attribute @returns {StatInfo} */
    substat(position, attribute = null) {
        if (attribute)
            this.#substat[position] = attribute;
        return [this.#substat[position], SUBSTATS[this.#substat[position]]];
    }

    /** @returns {StatDict} */
    get stats() {
        const OUT = new Map();

        if (this.SET2 !== null) {
            const [name, value] = this.SET2;
            OUT.set(name, value);
        }

        {
            const [name, value] = this.mainstat();
            OUT.set(name, (OUT.get(name) ?? 0) + value * 2);
        }

        {
            console.log(this.#substat)
            const [first, second] = this.#substat;
            OUT.set(first, (OUT.get(first) ?? 0) + SUBSTATS[first]);
            OUT.set(second, (OUT.get(second) ?? 0) + (SUBSTATS[second] ?? 0));
        }

        return OUT;
    }
}
//#endregion

//#region Offense
/** @typedef {"atkflat"|"atkperc"|"hashflat"|"hashperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"} OffenseMainstat */
/** @typedef {"hpflat"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"odefflat"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dboostperc"} OffenseSubstat*/

class Offense extends Algorithm {
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

class OffenseBlock extends Algorithm {
    SET2 = null;
    SIZE = 1;

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
    SET2 = ["atkperc", 15];
}

class Progression extends Offense {
    SET2 = ["hashperc", 15];
}

class Stack extends Offense {
    SET2 = ["hashperc", 15];
}

class Deduction extends Offense {
    SET2 = ["aspdflat", 30];
}

class DataRepair extends Offense {
    SET2 = ["resflat", 30];
}

class MLRMatrix extends Offense {
    SET2 = ["dboostperc", 5];
}

class LimitValue extends Offense {
    SET2 = ["dboostperc", 5];
}

class LowerLimit extends Offense {
    SET2 = null;
}
//#endregion

//#region Stability
/** @typedef {"hpflat"|"hpperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"regenflat"} StabilityMainstat */
/** @typedef {"hpflat"|"hpperc"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dreducperc"} StabilitySubstat */

class Stability extends Algorithm {
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

class StabilityBlock extends Algorithm {
    SET2 = null;
    SIZE = 1;

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
    SET2 = ["hpperc", 15];
}

class Rationality extends Stability {
    SET2 = ["pdefperc", 15];
}

class Connection extends Stability {
    SET2 = ["resflat", 50];
}

class Iteration extends Stability {
    SET2 = ["lashperc", 5];
}

class Reflection extends Stability {
    SET2 = ["lashperc", 5];
}

class Encapsulate extends Stability {
    SET2 = ["dreducperc", 5];
}

class Resolve extends Stability {
    SET2 = ["dreducperc", 5];
}

class Overflow extends Stability {
    SET2 = null;
}
//#endregion

//#region Special
/** @typedef {"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"hasteperc"|"hboostperc"} SpecialMainstat */
/** @typedef {"hpflat"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"hboostperc"} SpecialSubstat*/

class Special extends Algorithm {
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

class SpecialBlock extends Algorithm {
    SET2 = null;
    SIZE = 1;

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
    SET2 = ["aspdflat", 30];
}

class Cluster extends Special {
    SET2 = ["crateperc", 10];
}

class Convolution extends Special {
    SET2 = ["cdmgperc", 20];
}

class Stratagem extends Special {
    SET2 = ["dodgeperc", 8];
}

class DeltaV extends Special {
    SET2 = ["hasteperc", 10];
}

class Exploit extends Special {
    SET2 = ["hasteperc", 10];
}

class LoopGain extends Special {
    SET2 = ["hboostperc", 7.5];
}

class SVM extends Special {
    SET2 = ["hboostperc", 7.5];
}

class Inspiration extends Special {
    SET2 = null;
}
//#endregion

//#region Typed Definitions
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

const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal > #Offense > .algo-grid"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal > #Stability > .algo-grid"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal > #Special > .algo-grid")
}

class AlgoGrid {
    #grid;
    #size
    /** @type {Algorithm[]} */ #algorithms;

    #closedgrid;

    /** @param {"Offense" | "Stability" | "Special"} fieldtype @param {number} size */
    constructor(fieldtype, size) {
        this.#grid = GRIDS[fieldtype];
        this.#size = size;
        this.#algorithms = [];
        this.#closedgrid = 8 - size;
    }

    display() {
        this.#algorithms.sort(cmp({key: x => x.SIZE, reverse: true}))

        //display set algorithms

        for (let index = 0; index < (8 - this.#closedgrid); index++) {
            const BUTTON = document.createElement("button");
            BUTTON.type = "button";
            BUTTON.classList.add("algo-empty")
            BUTTON.addEventListener("click", () => console.log(fieldtype, index))
            this.#grid.appendChild(BUTTON);
        }

        for (let index = 0; index < this.#closedgrid; index++) {
            const DIV = document.createElement("div");
            DIV.classList.add("algo-close")
            this.#grid.appendChild(DIV)            
        }
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

    /** @param {UnitObject} unit */
    constructor(unit) {
        this.#name = unit.name;
        this.#basestat = unit.base;

        this.#stats = new Map();
        this.#listener = () => this.close()

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

        this.#close = () => {
            this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);
            ALGO_CLOSE.removeEventListener("click", this.#close);

            ALGO_MODAL.close()

            ALGO_MODAL.firstElementChild.textContent = "";
            for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
        }
    }

    #close;
    open() {
        ALGO_MODAL.firstElementChild.textContent = this.#name;
        for (const GRID of this.#algogrids) GRID.display()

        ALGO_MODAL.showModal()

        ALGO_CLOSE.addEventListener("click", this.#close)
    }
}