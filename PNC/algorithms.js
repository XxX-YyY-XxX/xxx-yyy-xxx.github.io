import {STATS} from "./typing.js";
import {cmp, chain, setattr, reduce} from "../univasset/scripts/basefunctions/index.js";

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
ALGO_MODAL.addEventListener("close", function(event) {
    this.firstElementChild.textContent = "";
    for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
});

/** @type {HTMLDialogElement} */ const ALGO_SELECT = document.querySelector("#algo-select");
ALGO_SELECT.addEventListener("close", function(event) {
    this.firstElementChild.replaceChildren();
});
//#endregion

//#region Functions
/** @param {StatDict} object1 @param {StatDict} object2 @returns {StatDict} */
function combine(object1, object2) {
    const OUTPUT = new Map();
    for (const attribute of new Set(chain(object1.keys(), object2.keys())))
        OUTPUT.set(attribute, (object1.get(attribute) ?? 0) + (object2.get(attribute) ?? 0));
    return OUTPUT;
}
//#endregion

//#region Base
/** @typedef {keyof MAINSTATS | keyof SUBSTATS} StatAttributes */
/** @typedef {Map<StatAttributes, number>} StatDict */
/** @typedef {STATS[keyof STATS]} StatNames */

const MAINSTATS = Object.freeze({
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
});
const SUBSTATS = Object.freeze({
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
});

/** @abstract */
class Algorithm {
    /** @type {[StatAttributes, number]?} */ SET2;
    /** @type {number} */ SIZE;

    /** @abstract @returns {HTMLDivElement} */
    get html() {
        const OUTPUT = document.createElement("div");
        OUTPUT.classList.add("algo-block");

        const BUTTON = document.createElement("button");
        BUTTON.classList.add("delete-algo");
        BUTTON.addEventListener("click", () => this.#grid.delete(this));
        OUTPUT.appendChild(BUTTON);

        return OUTPUT;
    }

    /** @abstract @returns {StatDict} */
    get mainstat() {}

    /** @abstract @returns {StatDict} */
    get substat1() {}

    /** @abstract @returns {StatDict} */
    get substat2() {}

    /** @type {[StatAttributes | undefined, StatAttributes | undefined, StatAttributes | undefined]} */ saved = [null, null, null];
    /** Only called on modal close. @returns {StatDict} */
    get stats() {
        const [MAIN] = this.mainstat.keys(), [SUB1] = this.substat1.keys(), [SUB2] = this.substat2.keys();
        this.saved = [MAIN, SUB1, SUB2];
        return [this.SET2 ? new Map([this.SET2]) : new Map(), this.mainstat, this.substat1, this.substat2].reduce(combine);
    }

    #grid;
    /** @param {AlgoGrid} grid */
    constructor(grid) {
        this.#grid = grid;
    }
}

const STATNAMES = Object.freeze({
    hpflat: "Health+",      hpperc: "Health%",
    atkflat: "Attack+",     atkperc: "Attack%",
    hashflat: "Hashrate+",  hashperc: "Hashrate%",
    pdefflat: "PhysDef+",   pdefperc: "PhysDef%",
    odefflat: "OpDef+",     odefperc: "OpDef%",

    crateperc: "CritRate",
    cdmgperc: "CritDmg",
    ppenflat: "PhysPen+",   ppenperc: "PhysPen%",
    openflat: "OpPen+",     openperc: "OpPen%",

    dodgeperc: "Dodge",
    regenflat: "PostRegen",
    hasteperc: "SkillHaste",
    resflat: "DebuffRes",
    dboostperc: "DmgBoost",
    dreducperc: "InjuryMtg",
    hboostperc: "HealEffect"
});

/** @param {StatAttributes[]} attribute */
function createOption(attribute) {
    const OPTION = document.createElement("option");
    OPTION.value = attribute;
    OPTION.textContent = STATNAMES[attribute];
    return OPTION;
}

class SingleBlock extends Algorithm {
    SET2 = null;
    SIZE = 1;

    /** @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @returns {HTMLDivElement} */
    html(mainstat, substat) {
        const OUTPUT = super.html;

        this.#mainstat = document.createElement("select");
        this.#mainstat.classList.add("mainstat");
        this.#mainstat.name = "mainstat";
        this.#mainstat.append(...mainstat.map(createOption));
        OUTPUT.appendChild(this.#mainstat);
        
        if (super.saved[0])
            for (const OPTION of Array.from(this.#mainstat.options))
                OPTION.selected = OPTION.value === super.saved[0];

        this.#substat = document.createElement("select");
        this.#substat.classList.add("substat");
        this.#substat.name = "substat1";
        this.#substat.append(...substat.map(createOption));
        OUTPUT.appendChild(this.#substat);

        if (super.saved[1])
            for (const OPTION of Array.from(this.#substat.options))
                OPTION.selected = OPTION.value === super.saved[1];

        return OUTPUT;
    }

    /** @type {HTMLSelectElement} */ #mainstat;
    /** @returns {StatDict} */
    get mainstat() {
        // console.log(
        //     Array.from(this.#mainstat.selectedOptions)[0].value,
        //     this.#mainstat.value,
        //     this.#mainstat.options[this.#mainstat.selectedIndex].value
        // )
        return new Map([[this.#mainstat.value, MAINSTATS[this.#mainstat.value] / 2]]);
    }

    /** @type {HTMLSelectElement} */ #substat;
    /** @returns {StatDict} */
    get substat1() {
        return new Map([[this.#substat.value, SUBSTATS[this.#substat.value]]]);
    }

    /** @returns {StatDict} */
    get substat2() {
        return new Map();
    }
}

class DoubleBlock extends Algorithm {
    SIZE = 2;

    /** @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @returns {HTMLDivElement} */
    html(mainstat, substat) {
        const OUTPUT = setattr(super.html, {classList: {add: ["double-block"]}})

        const EMBLEM = document.createElement("div");
        const IMG = document.createElement("img");
        IMG.src = `./assets/images/algorithms/${this.constructor.name}.png`;
        EMBLEM.appendChild(IMG);
        OUTPUT.appendChild(EMBLEM);

        const STATS = document.createElement("div");

            this.#mainstat = document.createElement("select");
            this.#mainstat.classList.add("mainstat");
            this.#mainstat.name = "mainstat";
            this.#mainstat.append(...mainstat.map(createOption));
            STATS.appendChild(this.#mainstat);

            if (super.saved[0])
                for (const OPTION of Array.from(this.#mainstat.options))
                    OPTION.selected = OPTION.value === super.saved[0];

            this.#substat1 = document.createElement("select");
            this.#substat1.classList.add("substat");
            this.#substat1.name = "substat1";
            this.#substat1.append(...substat.map(createOption));
            this.#substat1.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat2.options))
                    OPTION.disabled = this.#substat1.value === OPTION.value;
            });
            STATS.appendChild(this.#substat1);

            if (super.saved[1]) {
                for (const OPTION of Array.from(this.#substat1.options))
                    OPTION.selected = OPTION.value === super.saved[1];

                for (const OPTION of Array.from(this.#substat1.options))
                    OPTION.disabled = OPTION.value === super.saved[2];
            } else {
                Array.from(this.#substat1.options)[1].disabled = true;
            }

            this.#substat2 = document.createElement("select");
            this.#substat2.classList.add("substat");
            this.#substat2.name = "substat2";
            this.#substat2.append(...substat.map(createOption));
            this.#substat2.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat1.options))
                    OPTION.disabled = this.#substat2.value === OPTION.value;
            });
            STATS.appendChild(this.#substat2);

            if (super.saved[2]) {
                for (const OPTION of Array.from(this.#substat2.options))
                    OPTION.selected = OPTION.value === super.saved[2];

                for (const OPTION of Array.from(this.#substat2.options))
                    OPTION.disabled = OPTION.value === super.saved[1];
            } else {
                setattr(Array.from(this.#substat2.options), {0: {disabled: true}, 1: {selected: true}});
            }

        OUTPUT.appendChild(STATS);

        return OUTPUT;
    }

    /** @type {HTMLSelectElement} */ #mainstat;
    /** @returns {StatDict} */
    get mainstat() {
        return new Map([[this.#mainstat.value, MAINSTATS[this.#mainstat.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat1;
    /** @returns {StatDict} */
    get substat1() {
        return new Map([[this.#substat1.value, SUBSTATS[this.#substat1.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat2;
    /** @returns {StatDict} */
    get substat2() {
        return new Map([[this.#substat2.value, SUBSTATS[this.#substat2.value]]]);
    }
}
//#endregion

//#region Algorithm Block Types
const OFFENSEMAINSTAT = ["atkflat", "atkperc", "hashflat", "hashperc", "ppenflat", "ppenperc", "openflat", "openperc"];
const OFFENSESUBSTAT = ["hpflat", "atkflat", "atkperc", "hashflat", "hashperc", "pdefflat", "odefflat", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dboostperc"];

class OffenseBlock extends SingleBlock {
    get html() {
        return super.html(OFFENSEMAINSTAT, OFFENSESUBSTAT);
    }
}

class Offense extends DoubleBlock {
    get html() {
        return super.html(OFFENSEMAINSTAT, OFFENSESUBSTAT);
    }
}

const STABILITYMAINSTAT = ["hpflat", "hpperc", "pdefflat", "pdefperc", "odefflat", "odefperc", "regenflat"];
const STABILITYSUBSTAT = ["hpflat", "hpperc", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dreducperc"];

class StabilityBlock extends SingleBlock {
    get html() {
        return super.html(STABILITYMAINSTAT, STABILITYSUBSTAT);
    }
}

class Stability extends DoubleBlock {
    get html() {
        return super.html(STABILITYMAINSTAT, STABILITYSUBSTAT);
    }
}

const SPECIALMAINSTAT = ["pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "hasteperc", "hboostperc"];
const SPECIALSUBSTAT = ["hpflat", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "dodgeperc", "regenflat", "hasteperc", "resflat", "hboostperc"];

class SpecialBlock extends SingleBlock {
    get html() {
        return super.html(SPECIALMAINSTAT, SPECIALSUBSTAT);
    }
}

class Special extends DoubleBlock {
    get html() {
        return super.html(SPECIALMAINSTAT, SPECIALSUBSTAT);
    }
}
//#endregion

//#region Interface
const MAX_SIZE = 6;
const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal #Offense > div"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal #Stability > div"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal #Special > div")
}
const ALGO_SETS = {
    Offense: {
        OffenseBlock:   OffenseBlock,
        Feedforward:    class Feedforward extends Offense {SET2 = ["atkperc", 15]},
        Progression:    class Progression extends Offense {SET2 = ["hashperc", 15]},
        Stack:          class Stack extends Offense {SET2 = ["hashperc", 15]},
        Deduction:      class Deduction extends Offense {SET2 = ["aspdflat", 30]},
        DataRepair:     class DataRepair extends Offense {SET2 = ["resflat", 30]},
        MLRMatrix:      class MLRMatrix extends Offense {SET2 = ["dboostperc", 5]},
        LimitValue:     class LimitValue extends Offense {SET2 = ["dboostperc", 5]},
        LowerLimit:     class LowerLimit extends Offense {SET2 = null}
    },
    Stability: {
        StabilityBlock: StabilityBlock,
        Perception:     class Perception extends Stability {SET2 = ["hpperc", 15]},
        Rationality:    class Rationality extends Stability {SET2 = ["pdefperc", 15]},
        Connection:     class Connection extends Stability {SET2 = ["resflat", 50]},
        Iteration:      class Iteration extends Stability {SET2 = ["lashperc", 5]},
        Reflection:     class Reflection extends Stability {SET2 = ["lashperc", 5]},
        Encapsulate:    class Encapsulate extends Stability {SET2 = ["dreducperc", 5]},
        Resolve:        class Resolve extends Stability {SET2 = ["dreducperc", 5]},
        Overflow:       class Overflow extends Stability {SET2 = null}
    },
    Special: {
        SpecialBlock:   SpecialBlock,
        Paradigm:       class Paradigm extends Special {SET2 = ["aspdflat", 30]},
        Cluster:        class Cluster extends Special {SET2 = ["crateperc", 10]},
        Convolution:    class Convolution extends Special {SET2 = ["cdmgperc", 20]},
        Stratagem:      class Stratagem extends Special {SET2 = ["dodgeperc", 8]},
        DeltaV:         class DeltaV extends Special {SET2 = ["hasteperc", 10]},
        Exploit:        class Exploit extends Special {SET2 = ["hasteperc", 10]},
        LoopGain:       class LoopGain extends Special {SET2 = ["hboostperc", 7.5]},
        SVM:            class SVM extends Special {SET2 = ["hboostperc", 7.5]},
        Inspiration:    class Inspiration extends Special {SET2 = null}
    }
};
/** @param {typeof Algorithm} algoClass */
function algoSelectButton(algoClass) {
    const OUTPUT = document.createElement("button");
    OUTPUT.type = "submit";
    OUTPUT.value = algoClass.name;
    OUTPUT.appendChild(setattr(document.createElement("img"), {src: `./assets/images/algorithms/${algoClass.name}.png`}))
    // show algo name
    return OUTPUT;
}

class AlgoGrid {
    #grid;
    /** @type {Algorithm[]} */ #algorithms;

    #fieldtype;

    #closedcell;
    get #emptycell() {
        return MAX_SIZE - (this.#closedcell + (reduce((a, b) => a + b, this.#algorithms.map(x => x.SIZE)) ?? 0));
    }

    /** @param {"Offense" | "Stability" | "Special"} fieldtype @param {number} size */
    constructor(fieldtype, size) {
        this.#grid = GRIDS[fieldtype];
        this.#algorithms = [];

        this.#fieldtype = fieldtype;
        this.#closedcell = MAX_SIZE - size;

        this.#close = () => {
            ALGO_SELECT.removeEventListener("close", this.#close);

            this.#algorithms.push(new ALGO_SETS[fieldtype][ALGO_SELECT.returnValue](this));
    
            this.#grid.replaceChildren();
            this.display();
        }
    }

    /** Only gets closed upon selecting an algorithm. */
    #close;     // Function object required instead of class method for listener attachment and removal.
    #open() {
        if (this.#emptycell === 1)
            ALGO_SELECT.firstElementChild.appendChild(algoSelectButton(ALGO_SETS[this.#fieldtype][`${this.#fieldtype}Block`]));
        else
            ALGO_SELECT.firstElementChild.append(...Object.values(ALGO_SETS[this.#fieldtype]).map(algoSelectButton));

        ALGO_SELECT.addEventListener("close", this.#close);

        ALGO_SELECT.showModal();
    }

    display() {
        this.#grid.append(...this.#algorithms.sort(cmp({key: x => x.SIZE, reverse: true})).map(x => x.html));

        for (let index = 0; index < this.#emptycell; index++)
            this.#grid.appendChild(setattr(document.createElement("button"), {type: "button", classList: {add: ["algo-empty"]}, addEventListener: ["click", this.#open.bind(this)]}));

        for (let index = 0; index < this.#closedcell; index++)
            this.#grid.appendChild(setattr(document.createElement("div"), {classList: {add: ["algo-close"]}}))
    }

    /** @param {Algorithm} algorithm */
    delete(algorithm) {
        this.#algorithms.remove(algorithm);
        this.#grid.replaceChildren();
        this.display();
    }

    /** @returns {StatDict} */
    get stats() {
        return reduce(combine, this.#algorithms.map(x => x.stats)) ?? new Map();
    }
}

export class AlgoField{
    #name;
    #basestat;

    #algogrids;
    /** @type {StatDict} */ #stats = new Map();

    get [STATS.HEALTH]() {
        return this.#basestat.hp * (this.#stats.get("hpperc") ?? 0) / 100 + (this.#stats.get("hpflat") ?? 0);
    }

    get [STATS.ATTACK]() {
        return this.#basestat.atk * (this.#stats.get("atkperc") ?? 0) / 100 + (this.#stats.get("atkflat") ?? 0);
    }

    get [STATS.HASHRATE]() {
        return this.#basestat.hash * (this.#stats.get("hashperc") ?? 0) / 100 + (this.#stats.get("hashflat") ?? 0);
    }

    get [STATS.PDEFENSE]() {
        return this.#basestat.pdef * (this.#stats.get("pdefperc") ?? 0) / 100 + (this.#stats.get("pdefflat") ?? 0);
    }

    get [STATS.ODEFENSE]() {
        return this.#basestat.odef * (this.#stats.get("odefperc") ?? 0) / 100 + (this.#stats.get("odefflat") ?? 0);
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
        return this.#basestat.ppen * (this.#stats.get("ppenperc") ?? 0) / 100 + (this.#stats.get("ppenflat") ?? 0);
    }

    get [STATS.OPENETRATE]() {
        return this.#basestat.open * (this.#stats.get("openperc") ?? 0) / 100 + (this.#stats.get("openflat") ?? 0);
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
            onclose();
    
            ALGO_CLOSE.removeEventListener("click", this.#close);

            ALGO_MODAL.close();
        };
    }

    #close;
    show() {
        ALGO_MODAL.firstElementChild.textContent = this.#name;
        for (const GRID of this.#algogrids) GRID.display()

        ALGO_CLOSE.addEventListener("click", this.#close)

        ALGO_MODAL.showModal()
    }
}
//#endregion

// use local storage to save preferences

/* Success
    Algorithm.name                          Algorithm       string
    Algorithm.prototype.constructor.name    Algorithm       string
    a.constructor                           <class repr>    function
    a.constructor.name                      Algorithm       string
    Object.getPrototypeOf(a)                <class>         object
    Object.getPrototypeOf(a).constructor,   <class repr>    function

    prototype:  Basically an instance representation.

*/

/* Failed
    a.constructor.toString().match(/function\s*(\w+)/)                  null
    Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]    Object
    Object.getPrototypeOf(a).prototype                                  undefined
    this.prototype                                                      undefined
*/