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

    /** @returns {HTMLDivElement} */
    get html() {
        const OUTPUT = document.createElement("div");
        OUTPUT.classList.add("algo-block");
        return OUTPUT;
    }

    #grid;
    /** @param {AlgoGrid} grid */
    constructor(grid) {
        this.#grid = grid;
    }

    /** @type {StatAttributes} */ #mainstat = "crateperc";
    /** @param {StatAttributes?} attribute @returns {StatDict} */
    mainstat(attribute) {
        if (attribute) this.#mainstat = attribute;
        return new Map([[this.#mainstat, MAINSTATS[this.#mainstat]]]);
    }









    /** @type {StatAttributes} */ #substat1 = "crateperc";
    /** @param {StatAttributes?} attribute @returns {StatDict} */
    substat1(attribute) {
        console.log("Base substat1 used.");
        if (attribute === this.#substat2) return;
        if (attribute) this.#substat1 = attribute;
        return new Map([[this.#substat1, SUBSTATS[this.#substat1]]]);
    }

    /** @type {StatAttributes} */ #substat2 = "cdmgperc";
    /** @param {StatAttributes?} attribute @returns {StatDict} */
    substat2(attribute) {
        console.log("Base substat2 used.");
        if (attribute === this.#substat1) return;
        if (attribute) this.#substat2 = attribute;
        return new Map([[this.#substat2, SUBSTATS[this.#substat2]]]);
    }

    delete() {
        this.#grid.delete(this);
    }

    /** @returns {StatDict} */
    get stats() {
        return reduce(combine, [this.SET2 ? new Map([this.SET2]) : new Map(), this.mainstat(), this.substat1(), this.substat2()]);
        // const OUTPUT = combine(this.SET2 ? new Map([this.SET2]) : new Map(), this.mainstat());

        // console.log(this.constructor.name, this instanceof DoubleBlock)

        // const [first, second] = this.#substat;
        // OUTPUT.set(first, (OUTPUT.get(first) ?? 0) + SUBSTATS[first]);
        // OUTPUT.set(second, (OUTPUT.get(second) ?? 0) + (SUBSTATS[second] ?? 0));

        // return OUTPUT;
    }
}

{/* <template>
<div class="algo-block double-block">
    <button type="button"></button>
    <span class="mainstat"></span>
    <span class="substat" index="0"></span>
    <span class="substat" index="1"></span>
    <button type="button"></button>
</div>
</template> */}


class SingleBlock extends Algorithm {
    SET2 = null;
    SIZE = 1;

    /** @param {StatAttributes?} attribute @returns {StatDict} */
    mainstat(attribute) {
        const [[NAME, VALUE]] = super.mainstat(attribute).entries();
        return new Map([[NAME, VALUE / 2]]);
    }

    /** @type {StatAttributes} */ #substat1 = "crateperc";
    /** @param {StatAttributes?} attribute @returns {StatDict} */
    substat1(attribute) {
        if (attribute) this.#substat1 = attribute;
        return new Map([[this.#substat1, SUBSTATS[this.#substat1]]]);
    }

    /** @returns {StatDict} */
    substat2() {
        return new Map();
    }
}

class DoubleBlock extends Algorithm {
    SIZE = 2;

    get html() {
        const OUTPUT = super.html;
        OUTPUT.classList.add("double-block");
        //add symbol
        //mainstat
        //substat1
        //substat2
        //delete
        return OUTPUT;
    }

    /** @type {StatAttributes} */ #substat1 = "crateperc";
    /** @param {StatAttributes?} attribute @returns {StatDict?} */
    substat1(attribute) {
        if (attribute === this.#substat2) return null;
        if (attribute) this.#substat1 = attribute;
        return new Map([[this.#substat1, SUBSTATS[this.#substat1]]]);
    }

    /** @type {StatAttributes} */ #substat2 = "cdmgperc";
    /** @param {StatAttributes?} attribute @returns {StatDict?} */
    substat2(attribute) {
        if (attribute === this.#substat1) return null;
        if (attribute) this.#substat2 = attribute;
        return new Map([[this.#substat2, SUBSTATS[this.#substat2]]]);
    }
}
//#endregion

//#region Offense
/** @typedef {"atkflat"|"atkperc"|"hashflat"|"hashperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"} OffenseMainstat */
/** @typedef {"hpflat"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"odefflat"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dboostperc"} OffenseSubstat*/

const OFFENSEMAINSTAT = [["atkflat", "Attack+"], ["atkperc", "Attack%"], ["hashflat", "Hashrate+"], ["hashperc", "Hashrate%"], ["ppenflat", "PhysPen+"], ["ppenperc", "PhysPen%"], ["openflat", "OpPen+"], ["openperc", "OpPen%"]];
const OFFENSESUBSTAT = [["hpflat", "Health+"], ["atkflat", "Attack+"], ["atkperc", "Attack%"], ["hashflat", "Hashrate+"], ["hashperc", "Hashrate%"], ["pdefflat", "PhysDef+"], ["odefflat", "OpDef+"], ["crateperc", "CritRate"], ["cdmgperc", "CritDmg"], ["ppenflat", "PhysPen+"], ["openflat", "OpPen+"], ["regenflat", "PostRegen"], ["resflat", "DebuffRes"], ["dboostperc", "DmgBoost"]];

class OffenseBlock extends SingleBlock {
    get html() {
        const OUTPUT = super.html;

        const MAINSTAT = document.createElement("select");
        MAINSTAT.classList.add("mainstat");
        MAINSTAT.name = "mainstat";
        for (const [attribute, name] of OFFENSEMAINSTAT) {
            const OPTION = document.createElement("option");
            OPTION.value = attribute;
            OPTION.textContent = name;
            MAINSTAT.appendChild(OPTION);
        }
        OUTPUT.appendChild(MAINSTAT);

        const SUBSTAT = document.createElement("select");
        SUBSTAT.classList.add("substat1");
        SUBSTAT.name = "substat1";
        for (const [attribute, name] of OFFENSESUBSTAT) {
            const OPTION = document.createElement("option");
            OPTION.value = attribute;
            OPTION.textContent = name;
            SUBSTAT.appendChild(OPTION);
        }
        OUTPUT.appendChild(SUBSTAT);

        const BUTTON = document.createElement("button");
        BUTTON.classList.add("delete-algo");
        BUTTON.addEventListener("click", super.delete.bind(this))
        OUTPUT.appendChild(BUTTON);

        return OUTPUT;
    }

    /** @param {OffenseMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }
}

class Offense extends DoubleBlock {
    get html() {
        return super.html
    }

    /** @param {OffenseMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {StatDict} */
    substat2(attribute) {
        return super.substat2(attribute);
    }
}
//#endregion

//#region Stability
/** @typedef {"hpflat"|"hpperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"regenflat"} StabilityMainstat */
/** @typedef {"hpflat"|"hpperc"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dreducperc"} StabilitySubstat */

class StabilityBlock extends SingleBlock {
    /** @param {StabilityMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }
}

class Stability extends DoubleBlock {
    /** @param {StabilityMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {StatDict} */
    substat2(attribute) {
        return super.substat2(attribute);
    }
}
//#endregion

//#region Special
/** @typedef {"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"hasteperc"|"hboostperc"} SpecialMainstat */
/** @typedef {"hpflat"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"hboostperc"} SpecialSubstat*/

class SpecialBlock extends SingleBlock {
    /** @param {SpecialMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }
}

class Special extends DoubleBlock {
    /** @param {SpecialMainstat?} attribute @returns {StatDict} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {StatDict} */
    substat1(attribute) {
        return super.substat1(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {StatDict} */
    substat2(attribute) {
        return super.substat2(attribute);
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
    }

    #open() {
        if (this.#emptycell === 1)
            ALGO_SELECT.firstElementChild.appendChild(algoSelectButton(ALGO_SETS[this.#fieldtype][`${this.#fieldtype}Block`]));
        else
            ALGO_SELECT.firstElementChild.append(...Object.values(ALGO_SETS[this.#fieldtype]).map(algoSelectButton));

        ALGO_SELECT.addEventListener("close", this.#close.bind(this));

        ALGO_SELECT.showModal();
    }

    /** Only gets closed upon selecting an algorithm. */
    #close() {
        console.log("Running...");
        ALGO_SELECT.removeEventListener("close", this.#close.bind(this));

        this.#algorithms.push(new ALGO_SETS[this.#fieldtype][ALGO_SELECT.returnValue]());

        this.#grid.replaceChildren();
        this.display();
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

        ALGO_CLOSE.addEventListener("click", this.#close.bind(this))

        ALGO_MODAL.showModal()

    }

    #onClose;
    #close() {
        this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);
        this.#onClose();

        ALGO_MODAL.close()

        ALGO_CLOSE.removeEventListener("click", this.#close.bind(this));
    }
}
//#endregion

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