import {STATS as STAT_KEYS} from "./typing.js";
import {cmp, chain, setattr, subclassof, zip} from "../../univasset/scripts/basefunctions/index.js";

//#region Types
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
*/

/** @typedef {"hpflat"|"hpperc"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"dboostperc"|"dreducperc"|"hboostperc"|"aspdflat"|"lashperc"} StatAttributes */
/** @typedef {[string, StatAttributes, StatAttributes, StatAttributes | ""]} AlgoInfo */
/** @typedef {Map<StatAttributes, number>} StatDict */
//#endregion

//#region Constants
const STATVALUES = Object.freeze({
    NAME: Object.freeze({
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
        hboostperc: "HealEffect",
    
        aspdflat: "AtkSpd",
        lashperc: "Backlash"
    }),
    SET: Object.freeze({
        /** @type {[StatAttributes, number][]} */ ATTACK: [["atkperc", 15]],
        /** @type {[StatAttributes, number][]} */ HASHRATE: [["hashperc", 15]],
        /** @type {[StatAttributes, number][]} */ ATKSPD: [["aspdflat", 30]],
        /** @type {[StatAttributes, number][]} */ DEBUFFRES: [["resflat", 50]],
        /** @type {[StatAttributes, number][]} */ DMGBOOST: [["dboostperc", 5]],
        LIFESTEAL: "Lifesteal",
        /** @type {[StatAttributes, number][]} */ PENFLAT: [["ppenflat", 80], ["openflat", 80]],
        /** @type {[StatAttributes, number][]} */ PENPERC: [["ppenperc", 20], ["openperc", 20]],
        /** @type {[StatAttributes, number][]} */ HEALTHFLAT: [["hpflat", 2500]],
        /** @type {[StatAttributes, number][]} */ HEALTHPERC: [["hpperc", 15]],
        /** @type {[StatAttributes, number][]} */ PHYSDEF: [["pdefperc", 15]],
        /** @type {[StatAttributes, number][]} */ OPDEF: [["odefperc", 15]],
        /** @type {[StatAttributes, number][]} */ DEFPERC: [["pdefperc", 10], ["odefperc", 10]],
        /** @type {[StatAttributes, number][]} */ BACKLASH: [["lashperc", 5]],
        /** @type {[StatAttributes, number][]} */ DMGREDUCE: [["dreducperc", 5]],
        HPREGEN: "HP Regen",
        /** @type {[StatAttributes, number][]} */ CRITRATE: [["crateperc", 10]],
        /** @type {[StatAttributes, number][]} */ CRITDMG: [["cdmgperc", 20]],
        /** @type {[StatAttributes, number][]} */ DODGE: [["dodgeperc", 8]],
        /** @type {[StatAttributes, number][]} */ SKILLHASTE: [["hasteperc", 10]],
        /** @type {[StatAttributes, number][]} */ HEALBOOST: [["hboostperc", 7.5]],
    }),
    SET_THRESH: Object.freeze({
        hp: 16666.5,
        dpen: 400
    }),
    /** Based on 2-slot mainstat. */
    MAIN: Object.freeze({
        hpflat: 1800,   hpperc: 12,
        atkflat: 54,    atkperc: 12,
        hashflat: 54,   hashperc: 12,
        pdefflat: 56,   pdefperc: 7.2,
        odefflat: 56,   odefperc: 7.2,
    
        crateperc: 8,
        cdmgperc: 16,
        ppenflat: 20,   ppenperc: 7.2,
        openflat: 20,   openperc: 7.2,
    
        regenflat: 720,
        hasteperc: 8,
        hboostperc: 4
    }),
    MAIN_THRESH: Object.freeze({
        hp: 15000,
        atk: 450,       hash: 450,
        pdef: 777.5,    odef: 777.5,
        ppen: 277.5,    open: 277.5
    }),
    SUB: Object.freeze({
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
    }),
    SUB_THRESH: Object.freeze({
        hp: 15000,
        atk: 444.5,     hash: 444.5,
        pdef: 767.5,    odef: 1000
    })
})
// const STATNAMES = STATVALUES.NAME;
//#endregion

//#region Functions
/** @param {StatDict} object1 @param {StatDict} object2 @returns {StatDict} */
function combine(object1, object2) {
    const OUTPUT = new Map();
    for (const attribute of new Set(chain(object1.keys(), object2.keys())))
        OUTPUT.set(attribute, (object1.get(attribute) ?? 0) + (object2.get(attribute) ?? 0));
    return OUTPUT;
}

/** @param {string} algoname @returns {string} */
function algoPath(algoname) {
    return `../assets/images/algorithms/sets/${algoname}.png`;
}

// /**
//  * @template T
//  * @param {T} object 
//  * @returns {Readonly<T>}
//  */
// function deepFreeze(object) {
//     // Retrieve the property names defined on object
//     const propNames = Reflect.ownKeys(object);
  
//     // Freeze properties before freezing self
//     for (const name of propNames) {
//       const value = object[name];
  
//       if ((value && typeof value === "object") || typeof value === "function") {
//         deepFreeze(value);
//       }
//     }
  
//     return Object.freeze(object);
//   }
//#endregion

//#region Base

/** @abstract */
class Algorithm {
    /** @abstract @static @type {[StatAttributes, number][] | string} */ static SET2;
    /** @abstract @static @type {string?} */ static SET3;
    /** @abstract @type {number} */ SIZE;

    /** @abstract @returns {HTMLDivElement} */
    get html() {
        const OUTPUT = setattr(document.createElement("div"), {classList: {add: ["algo-block"]}});
        OUTPUT.appendChild(setattr(document.createElement("button"), {addEventListener: ["click", () => this.#grid.delete(this)]}));
        return OUTPUT;
    }

    /** @abstract @returns {StatDict} */
    get mainstat() {}

    /** @abstract @returns {StatDict} */
    get substat1() {}

    /** @abstract @returns {StatDict} */
    get substat2() {}

    /** Only called on modal close. @returns {StatDict} */
    get stats() {
        return [this.mainstat, this.substat1, this.substat2].reduce(combine);
    }

    /** @returns {AlgoInfo} */
    get info() {
        return [
            this.constructor.name,
            Array.from(this.mainstat)[0][0],
            Array.from(this.substat1)[0][0],
            this instanceof DoubleBlock ? Array.from(this.substat2)[0][0] : ""
        ];
    }

    #grid;
    /** @param {AlgoGrid} grid */
    constructor(grid) {
        this.#grid = grid;
    }

    static createSelectButton() {
        const OUTPUT = setattr(document.createElement("button"), {type: "submit", value: this.name});

        const IMG = document.createElement("img");
        IMG.alt = this.name;
        IMG.src = algoPath(subclassof(this, SingleBlock) ? "SingleBlock" : this.name);
        OUTPUT.appendChild(IMG);
    
        // 3set effect
        const DIV1 = document.createElement("div");
        DIV1.textContent = this.name;
        OUTPUT.appendChild(DIV1);
    
        // if (algoClass.SET3) {
        //     algoClass.SET3
        // }
    
        // threshold
        const SET_EFFECT = this.SET2;
        const DIV2 = document.createElement("div");
        DIV2.textContent = Array.isArray(SET_EFFECT) ? SET_EFFECT.map(([attr,]) => STATVALUES.NAME[attr]).join("|") : SET_EFFECT;
        OUTPUT.appendChild(DIV2);
    
        // AlgoField.current.basestat
        // STATVALUES.SET_THRESH
    
        return OUTPUT;
    
    }
}

/** @param {"mainstat" | "substat1" | "substat2"} name @param {StatAttributes[]} attributes */
function createSelect(name, attributes) {
    const OUTPUT = document.createElement("select");
    OUTPUT.classList.add(["substat1", "substat2"].includes(name) ? "substat" : "mainstat");
    OUTPUT.name = name;
    OUTPUT.append(...attributes.map(x => setattr(document.createElement("option"), {value: x, textContent: STATVALUES.NAME[x]})));
    return OUTPUT;
}

class SingleBlock extends Algorithm {
    static SET2 = "No Bonus";
    static SET3 = null;
    SIZE = 1;

    /** @param {AlgoGrid} grid @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, mainstat, substat, attributes) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB,] = attributes;

            this.#mainstat = createSelect("mainstat", mainstat);
            for (const OPTION of Array.from(this.#mainstat.options)) OPTION.selected = OPTION.value === MAIN;

            this.#substat = createSelect("substat1", substat);
            for (const OPTION of Array.from(this.#substat.options)) OPTION.selected = OPTION.value === SUB;
        }
    }

    /** @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @returns {HTMLDivElement} */
    html(mainstat, substat) {
        const OUTPUT = super.html;

        this.#mainstat ??= createSelect("mainstat", mainstat);
        OUTPUT.appendChild(this.#mainstat);
        
        this.#substat ??= createSelect("substat1", substat);
        OUTPUT.appendChild(this.#substat);

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
        return new Map([[this.#mainstat.value, STATVALUES.MAIN[this.#mainstat.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat;
    /** @returns {StatDict} */
    get substat1() {
        return new Map([[this.#substat.value, STATVALUES.SUB[this.#substat.value]]]);
    }

    /** @returns {StatDict} */
    get substat2() {
        return new Map();
    }
}

class DoubleBlock extends Algorithm {
    SIZE = 2;

    /** @param {AlgoGrid} grid @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, mainstat, substat, attributes) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB1, SUB2] = attributes;

            this.#mainstat = createSelect("mainstat", mainstat);
            for (const OPTION of Array.from(this.#mainstat.options)) OPTION.selected = OPTION.value === MAIN;

            this.#substat1 = createSelect("substat1", substat);
            this.#substat1.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat2.options))
                    OPTION.disabled = this.#substat1.value === OPTION.value;
            });
            for (const OPTION of Array.from(this.#substat1.options)) {
                OPTION.selected = OPTION.value === SUB1;
                OPTION.disabled = OPTION.value === SUB2;
            }

            this.#substat2 = createSelect("substat2", substat);
            this.#substat2.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat1.options))
                    OPTION.disabled = this.#substat2.value === OPTION.value;
            });
            for (const OPTION of Array.from(this.#substat2.options)) {
                OPTION.selected = OPTION.value === SUB2;
                OPTION.disabled = OPTION.value === SUB1;
            }
        }
    }

    /** @param {StatAttributes[]} mainstat @param {StatAttributes[]} substat @returns {HTMLDivElement} */
    html(mainstat, substat) {
        const OUTPUT = setattr(super.html, {classList: {add: ["double-block"]}})

        const EMBLEM = setattr(document.createElement("img"), {src: algoPath(this.constructor.name), alt: this.constructor.name, loading: "lazy"});
        OUTPUT.appendChild(EMBLEM);

        const STATS = document.createElement("div");

            this.#mainstat ??= createSelect("mainstat", mainstat);
            STATS.appendChild(this.#mainstat);

            if (!this.#substat1) {
                this.#substat1 = createSelect("substat1", substat);
                this.#substat1.addEventListener("change", () => {
                    for (const OPTION of Array.from(this.#substat2.options))
                        OPTION.disabled = this.#substat1.value === OPTION.value;
                });
                Array.from(this.#substat1.options)[1].disabled = true;
            }
            STATS.appendChild(this.#substat1);

            if (!this.#substat2) {
                this.#substat2 = createSelect("substat2", substat);
                this.#substat2.addEventListener("change", () => {
                    for (const OPTION of Array.from(this.#substat1.options))
                        OPTION.disabled = this.#substat2.value === OPTION.value;
                });
                setattr(Array.from(this.#substat2.options), {0: {disabled: true}, 1: {selected: true}});
            }
            STATS.appendChild(this.#substat2);

        OUTPUT.appendChild(STATS);

        return OUTPUT;
    }

    /** @type {HTMLSelectElement} */ #mainstat;
    /** @returns {StatDict} */
    get mainstat() {
        return new Map([[this.#mainstat.value, STATVALUES.MAIN[this.#mainstat.value] * 2]]);
    }

    /** @type {HTMLSelectElement} */ #substat1;
    /** @returns {StatDict} */
    get substat1() {
        return new Map([[this.#substat1.value, STATVALUES.SUB[this.#substat1.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat2;
    /** @returns {StatDict} */
    get substat2() {
        return new Map([[this.#substat2.value, STATVALUES.SUB[this.#substat2.value]]]);
    }
}
//#endregion

//#region Algorithm Block Types
const OFFENSEMAINSTAT = ["atkflat", "atkperc", "hashflat", "hashperc", "ppenflat", "ppenperc", "openflat", "openperc"];
const OFFENSESUBSTAT = ["hpflat", "atkflat", "atkperc", "hashflat", "hashperc", "pdefflat", "odefflat", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dboostperc"];

class OffenseBlock extends SingleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, OFFENSEMAINSTAT, OFFENSESUBSTAT, attributes);
    }

    get html() {
        return super.html(OFFENSEMAINSTAT, OFFENSESUBSTAT);
    }
}

class Offense extends DoubleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, OFFENSEMAINSTAT, OFFENSESUBSTAT, attributes);
    }

    get html() {
        return super.html(OFFENSEMAINSTAT, OFFENSESUBSTAT);
    }
}

const STABILITYMAINSTAT = ["hpflat", "hpperc", "pdefflat", "pdefperc", "odefflat", "odefperc", "regenflat"];
const STABILITYSUBSTAT = ["hpflat", "hpperc", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dreducperc"];

class StabilityBlock extends SingleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, STABILITYMAINSTAT, STABILITYSUBSTAT, attributes);
    }

    get html() {
        return super.html(STABILITYMAINSTAT, STABILITYSUBSTAT);
    }
}

class Stability extends DoubleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, STABILITYMAINSTAT, STABILITYSUBSTAT, attributes);
    }

    get html() {
        return super.html(STABILITYMAINSTAT, STABILITYSUBSTAT);
    }
}

const SPECIALMAINSTAT = ["pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "hasteperc", "hboostperc"];
const SPECIALSUBSTAT = ["hpflat", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "dodgeperc", "regenflat", "hasteperc", "resflat", "hboostperc"];

class SpecialBlock extends SingleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, SPECIALMAINSTAT, SPECIALSUBSTAT, attributes);
    }

    get html() {
        return super.html(SPECIALMAINSTAT, SPECIALSUBSTAT);
    }
}

class Special extends DoubleBlock {
    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, attributes = null) {
        super(grid, SPECIALMAINSTAT, SPECIALSUBSTAT, attributes);
    }

    get html() {
        return super.html(SPECIALMAINSTAT, SPECIALSUBSTAT);
    }
}
//#endregion

//#region Interface
const MAX_SIZE = 6;
const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal #Offense"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal #Stability"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal #Special")
}
const ALGO_SETS = {
    Offense: {
        OffenseBlock:   OffenseBlock,
        Feedforward:    class extends Offense {static SET2 = STATVALUES.SET.ATTACK;       static SET3 = null;},
        Progression:    class extends Offense {static SET2 = STATVALUES.SET.HASHRATE;     static SET3 = null;},
        Stack:          class extends Offense {static SET2 = STATVALUES.SET.HASHRATE;     static SET3 = "";},
        Deduction:      class extends Offense {static SET2 = STATVALUES.SET.ATKSPD;       static SET3 = null;},
        DataRepair:     class extends Offense {static SET2 = STATVALUES.SET.DEBUFFRES;    static SET3 = "";},
        Surplus:        class extends Offense {static SET2 = STATVALUES.SET.DMGBOOST;     static SET3 = null;},
        MLRMatrix:      class extends Offense {static SET2 = STATVALUES.SET.DMGBOOST;     static SET3 = "";},
        LimitValue:     class extends Offense {static SET2 = STATVALUES.SET.DMGBOOST;     static SET3 = "";},
        Hyperpulse:     class extends Offense {static SET2 = STATVALUES.SET.DMGBOOST;     static SET3 = "";},
        LowerLimit:     class extends Offense {static SET2 = STATVALUES.SET.LIFESTEAL;    static SET3 = "";},
        Puncture:       class extends Offense {static SET2 = STATVALUES.SET.PENFLAT;      static SET3 = null;},
        Permeate:       class extends Offense {static SET2 = STATVALUES.SET.PENPERC;      static SET3 = null;},
        Polybore:       class extends Offense {static SET2 = STATVALUES.SET.PENPERC;      static SET3 = "";}
    },
    Stability: {
        StabilityBlock: StabilityBlock,
        Threshold:      class extends Stability {static SET2 = STATVALUES.SET.HEALTHFLAT; static SET3 = null;},
        Perception:     class extends Stability {static SET2 = STATVALUES.SET.HEALTHPERC; static SET3 = null;},
        Acclimate:      class extends Stability {static SET2 = STATVALUES.SET.HEALTHPERC; static SET3 = "";},
        Rationality:    class extends Stability {static SET2 = STATVALUES.SET.PHYSDEF;    static SET3 = null;},
        Lattice:        class extends Stability {static SET2 = STATVALUES.SET.OPDEF;      static SET3 = null;},
        Twinform:       class extends Stability {static SET2 = STATVALUES.SET.DEFPERC;    static SET3 = null;},
        Buildup:        class extends Stability {static SET2 = STATVALUES.SET.DEFPERC;    static SET3 = "";},
        Connection:     class extends Stability {static SET2 = STATVALUES.SET.DEBUFFRES;  static SET3 = null;},
        Iteration:      class extends Stability {static SET2 = STATVALUES.SET.BACKLASH;   static SET3 = "";},
        Reflection:     class extends Stability {static SET2 = STATVALUES.SET.BACKLASH;   static SET3 = "";},
        Encapsulate:    class extends Stability {static SET2 = STATVALUES.SET.DMGREDUCE;  static SET3 = "";},
        Resolve:        class extends Stability {static SET2 = STATVALUES.SET.DMGREDUCE;  static SET3 = "";},
        Overflow:       class extends Stability {static SET2 = STATVALUES.SET.HPREGEN;    static SET3 = "";}
    },
    Special: {
        SpecialBlock:   SpecialBlock,
        Rapidity:       class extends Special {static SET2 = STATVALUES.SET.ATKSPD;       static SET3 = null;},
        Paradigm:       class extends Special {static SET2 = STATVALUES.SET.ATKSPD;       static SET3 = "";},
        Cluster:        class extends Special {static SET2 = STATVALUES.SET.CRITRATE;     static SET3 = null;},
        Convolution:    class extends Special {static SET2 = STATVALUES.SET.CRITDMG;      static SET3 = null;},
        Stratagem:      class extends Special {static SET2 = STATVALUES.SET.DODGE;        static SET3 = null;},
        FastLoad:       class extends Special {static SET2 = STATVALUES.SET.SKILLHASTE;   static SET3 = null;},
        DeltaV:         class extends Special {static SET2 = STATVALUES.SET.SKILLHASTE;   static SET3 = "";},
        Exploit:        class extends Special {static SET2 = STATVALUES.SET.SKILLHASTE;   static SET3 = "";},
        Delivery:       class extends Special {static SET2 = STATVALUES.SET.SKILLHASTE;   static SET3 = "";},
        Flush:          class extends Special {static SET2 = STATVALUES.SET.SKILLHASTE;   static SET3 = "";},
        Increment:      class extends Special {static SET2 = STATVALUES.SET.HEALBOOST;    static SET3 = null;},
        LoopGain:       class extends Special {static SET2 = STATVALUES.SET.HEALBOOST;    static SET3 = "";},
        SVM:            class extends Special {static SET2 = STATVALUES.SET.HEALBOOST;    static SET3 = "";},
        Inspiration:    class extends Special {static SET2 = STATVALUES.SET.HPREGEN;      static SET3 = null;},
    }
};
/** @param {typeof Algorithm} algoClass */
function algoSelectButton(algoClass) {
    const OUTPUT = setattr(document.createElement("button"), {type: "submit", value: algoClass.name});

    const IMG = document.createElement("img");
    IMG.alt = algoClass.name;
    IMG.src = algoPath(subclassof(algoClass, SingleBlock) ? "SingleBlock" : algoClass.name);
    OUTPUT.appendChild(IMG);

    // 3set effect
    const DIV1 = document.createElement("div");
    DIV1.textContent = algoClass.name;
    OUTPUT.appendChild(DIV1);

    // if (algoClass.SET3) {
    //     algoClass.SET3
    // }

    // threshold
    const SET_EFFECT = algoClass.SET2;
    const DIV2 = document.createElement("div");
    DIV2.textContent = Array.isArray(SET_EFFECT) ? SET_EFFECT.map(([attr,]) => STATVALUES.NAME[attr]).join("|") : SET_EFFECT;
    OUTPUT.appendChild(DIV2);

    // AlgoField.current.basestat
    // STATVALUES.SET_THRESH

    return OUTPUT;
}
/** @type {HTMLDialogElement} */ const ALGO_SELECT = document.querySelector("#algo-select");
ALGO_SELECT.addEventListener("close", function(event) {
    this.firstElementChild.replaceChildren();
});

class AlgoGrid {
    #grid;
    /** @type {Algorithm[]} */ #algorithms;

    #fieldtype;

    #closedcell;
    get #emptycell() {
        return MAX_SIZE - (this.#closedcell + this.#algorithms.map(x => x.SIZE).reduce((a, b) => a + b, 0));
    }

    /** @returns {StatDict} */
    get stats() {
        /** @type {StatDict} */ const EFFECT = (() => {
            const SETS = this.#algorithms.map(x => [x.constructor.name, ALGO_SETS[this.#fieldtype][x.constructor.name].SET2]).filter(([, set]) => Array.isArray(set));

            /** @type {string[]} */ const TEMP = [];
            for (const [NAME, SET2] of SETS) {
                if (TEMP.includes(NAME))
                    return new Map(SET2);
                else
                    TEMP.push(NAME);
            }

            return new Map();
        })();

        return [EFFECT, ...this.#algorithms.map(x => x.stats)].reduce(combine, new Map());
    }

    get info() {
        return this.#algorithms.map(x => x.info);
    }
    
    /** @param {"Offense" | "Stability" | "Special"} fieldtype @param {number} size @param {AlgoInfo[]?} init_array */
    constructor(fieldtype, size, init_array = null) {
        this.#grid = GRIDS[fieldtype];
        this.#algorithms = init_array?.map(([set, ...attr]) => new ALGO_SETS[fieldtype][set](this, attr)) ?? [];

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
}

/** @type {HTMLDialogElement} */ const ALGO_MODAL = document.querySelector("#algo-modal");
/** @type {HTMLButtonElement} */ const ALGO_CLOSE = document.querySelector("#close-modal");
ALGO_MODAL.addEventListener("close", function(event) {
    this.firstElementChild.textContent = "";
    for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
    localStorage.setItem("algorithms", JSON.stringify(ALGO_SAVE));
});

/** @type {{[UnitName: string]: [AlgoInfo[], AlgoInfo[], AlgoInfo[]]}} */ const ALGO_SAVE = (function() {
    const SAVE_DATA = localStorage.getItem("algorithms");
    return SAVE_DATA ? JSON.parse(SAVE_DATA) : {};
})()

export class AlgoField{
    #name;
    #basestat;

    #algogrids;
    #stats;

    get [STAT_KEYS.HEALTH]() {
        return this.#basestat.hp * (this.#stats.get("hpperc") ?? 0) / 100 + (this.#stats.get("hpflat") ?? 0);
    }

    get [STAT_KEYS.ATTACK]() {
        return this.#basestat.atk * (this.#stats.get("atkperc") ?? 0) / 100 + (this.#stats.get("atkflat") ?? 0);
    }

    get [STAT_KEYS.HASHRATE]() {
        return this.#basestat.hash * (this.#stats.get("hashperc") ?? 0) / 100 + (this.#stats.get("hashflat") ?? 0);
    }

    get [STAT_KEYS.PDEFENSE]() {
        return this.#basestat.pdef * (this.#stats.get("pdefperc") ?? 0) / 100 + (this.#stats.get("pdefflat") ?? 0);
    }

    get [STAT_KEYS.ODEFENSE]() {
        return this.#basestat.odef * (this.#stats.get("odefperc") ?? 0) / 100 + (this.#stats.get("odefflat") ?? 0);
    }

    get [STAT_KEYS.ATKSPD]() {
        return this.#stats.get("aspdflat") ?? 0;
    }

    get [STAT_KEYS.CRITRATE]() {
        return this.#stats.get("crateperc") ?? 0;
    }

    get [STAT_KEYS.CRITDMG]() {
        return this.#stats.get("cdmgperc") ?? 0;
    }

    get [STAT_KEYS.PPENETRATE]() {
        return this.#basestat.ppen * (this.#stats.get("ppenperc") ?? 0) / 100 + (this.#stats.get("ppenflat") ?? 0);
    }

    get [STAT_KEYS.OPENETRATE]() {
        return this.#basestat.open * (this.#stats.get("openperc") ?? 0) / 100 + (this.#stats.get("openflat") ?? 0);
    }

    get [STAT_KEYS.DODGE]() {
        return this.#stats.get("dodgeperc") ?? 0;
    }

    get [STAT_KEYS.POSTHEAL]() {
        return this.#stats.get("regenflat") ?? 0;
    }

    get [STAT_KEYS.HASTE]() {
        return this.#stats.get("hasteperc") ?? 0;
    }

    get [STAT_KEYS.DEBUFFRES]() {
        return this.#stats.get("resflat") ?? 0;
    }

    get [STAT_KEYS.BACKLASH]() {
        return this.#stats.get("lashperc") ?? 0;
    }

    get [STAT_KEYS.DMGBOOST]() {
        return this.#stats.get("dboostperc") ?? 0;
    }

    get [STAT_KEYS.DMGREDUCE]() {
        return this.#stats.get("dreducperc") ?? 0;
    }

    get [STAT_KEYS.HEALBOOST]() {
        return this.#stats.get("hboostperc") ?? 0;
    }

    /** @param {UnitObject} unit @param {function(): void} onclose */
    constructor(unit, onclose = () => {}) {
        this.#name = unit.name;
        this.#basestat = unit.base;

        this.#algogrids = (() => {
            const LAYOUT = {
                "Guard": "465",
                "Sniper": "645",
                "Warrior": "654",
                "Specialist": "546",
                "Medic": unit.name === "Imhotep" ? "546" : "456"
            }[unit.class];
    
            return Array.from(
                zip(["Offense", "Stability", "Special"], LAYOUT, ALGO_SAVE[unit.name] ?? [null, null, null])
            ).map(
                ([type, size, info]) => new AlgoGrid(type, Number(size), info)
            );
        })();

        this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);

        this.#close = () => {
            this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);
            ALGO_SAVE[this.#name] = this.#algogrids.map(x => x.info);

            onclose();
    
            ALGO_CLOSE.removeEventListener("click", this.#close);

            ALGO_MODAL.close();
            AlgoField.#current = null;
        };
    }

    #close;
    show() {
        AlgoField.#current = this;
        ALGO_MODAL.firstElementChild.textContent = this.#name;
        for (const GRID of this.#algogrids) GRID.display()

        ALGO_CLOSE.addEventListener("click", this.#close)

        ALGO_MODAL.showModal()
    }

    /** @type {AlgoField?} */ static #current = null;
    static get current() {
        return {
            name: AlgoField.#current.#name,
            basestat: AlgoField.#current.#basestat
        }
    }
}
//#endregion