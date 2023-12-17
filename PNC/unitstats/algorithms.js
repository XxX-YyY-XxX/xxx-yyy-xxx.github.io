import {STAT_KEYS} from "./typing.js";
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
/** @typedef {[[algoname: string], [main: StatAttributes], [sub1: StatAttributes], [sub2: StatAttributes | ""]]} AlgoInfo */
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
        /** @type {[StatAttributes, number][]} */ atkperc: [["atkperc", 15]],
        /** @type {[StatAttributes, number][]} */ hashperc: [["hashperc", 15]],
        /** @type {[StatAttributes, number][]} */ aspdflat: [["aspdflat", 30]],
        /** @type {[StatAttributes, number][]} */ resflat: [["resflat", 50]],
        /** @type {[StatAttributes, number][]} */ dboostperc: [["dboostperc", 5]],
        LIFESTEAL: "Lifesteal",
        /** @type {[StatAttributes, number][]} */ dpenflat: [["ppenflat", 80], ["openflat", 80]],
        /** @type {[StatAttributes, number][]} */ dpenperc: [["ppenperc", 20], ["openperc", 20]],
        /** @type {[StatAttributes, number][]} */ hpflat: [["hpflat", 2500]],
        /** @type {[StatAttributes, number][]} */ hpperc: [["hpperc", 15]],
        /** @type {[StatAttributes, number][]} */ pdefperc: [["pdefperc", 15]],
        /** @type {[StatAttributes, number][]} */ odefperc: [["odefperc", 15]],
        /** @type {[StatAttributes, number][]} */ ddefperc: [["pdefperc", 10], ["odefperc", 10]],
        /** @type {[StatAttributes, number][]} */ lashperc: [["lashperc", 5]],
        /** @type {[StatAttributes, number][]} */ dreducperc: [["dreducperc", 5]],
        HPREGEN: "HP Regen",
        /** @type {[StatAttributes, number][]} */ crateperc: [["crateperc", 10]],
        /** @type {[StatAttributes, number][]} */ cdmgperc: [["cdmgperc", 20]],
        /** @type {[StatAttributes, number][]} */ dodgeperc: [["dodgeperc", 8]],
        /** @type {[StatAttributes, number][]} */ hasteperc: [["hasteperc", 10]],
        /** @type {[StatAttributes, number][]} */ hboostperc: [["hboostperc", 7.5]],
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

const ATTRIBUTES = {
    Offense: {
        MAIN: ["atkflat", "atkperc", "hashflat", "hashperc", "ppenflat", "ppenperc", "openflat", "openperc"],
        SUB: ["hpflat", "atkflat", "atkperc", "hashflat", "hashperc", "pdefflat", "odefflat", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dboostperc"]
    },
    Stability: {
        MAIN: ["hpflat", "hpperc", "pdefflat", "pdefperc", "odefflat", "odefperc", "regenflat"],
        SUB: ["hpflat", "hpperc", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dreducperc"]
    },
    Special: {
        MAIN: ["pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "hasteperc", "hboostperc"],
        SUB: ["hpflat", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "dodgeperc", "regenflat", "hasteperc", "resflat", "hboostperc"]
    }
}
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
//#endregion

//#region Base
/** @abstract */ class Algorithm {
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
            Array.from(this.mainstat.keys())[0],
            Array.from(this.substat1.keys())[0],
            this instanceof DoubleBlock ? Array.from(this.substat2.keys())[0] : ""
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
    
        const SET_EFFECT = this.SET2;
        const DIV2 = document.createElement("div");
        if (Array.isArray(SET_EFFECT)) {
            switch (SET_EFFECT) {
                case STATVALUES.SET.hpflat:                                                 // Stability
                    if (AlgoField.current.basestat.hp < STATVALUES.SET_THRESH.hp)
                        DIV2.classList.add("algo-left-good", "algo-right-good");
                    else
                        DIV2.classList.add("algo-left-bad", "algo-right-bad");
                    break;
                case STATVALUES.SET.hpperc:
                    if (AlgoField.current.basestat.hp > STATVALUES.SET_THRESH.hp)
                        DIV2.classList.add("algo-left-good", "algo-right-good");
                    else
                        DIV2.classList.add("algo-left-bad", "algo-right-bad");
                    break;
                case STATVALUES.SET.dpenflat:                                                // Offense
                    if (AlgoField.current.basestat.ppen < STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-left-good")
                    else if (AlgoField.current.basestat.ppen > STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-left-bad")

                    if (AlgoField.current.basestat.open < STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-right-good")
                    else if (AlgoField.current.basestat.open > STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-right-bad")
                    break;
                case STATVALUES.SET.dpenperc:
                    if (AlgoField.current.basestat.ppen > STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-left-good")
                    else if (AlgoField.current.basestat.ppen < STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-left-bad")

                    if (AlgoField.current.basestat.open > STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-right-good")
                    else if (AlgoField.current.basestat.open < STATVALUES.SET_THRESH.dpen)
                        DIV2.classList.add("algo-right-bad")
                    break;
            }
            DIV2.textContent = SET_EFFECT.map(([attr,]) => STATVALUES.NAME[attr]).join("|");
        } else {
            DIV2.textContent = SET_EFFECT;
        }
        OUTPUT.appendChild(DIV2);
    
        return OUTPUT;
    }
}

/** @param {Algorithm} obj @param {"MAIN" | "SUB"} name */
function createSelect(obj, name) {
    const SELECT = document.createElement("select");
    SELECT.classList.add(name === "MAIN" ? "mainstat" : "substat");

    const [ATTR_LIST, _threshCheck] = (function() {
        /** @type {["Offense"|"Stability"|"Special", STAT_KEYS[keyof STAT_KEYS][]]} */
        const [ALGO_TYPE, VIABLE] = (function() {
            switch (true) {
                case obj instanceof Offense || obj instanceof OffenseBlock:
                    return ["Offense", name === "MAIN" ? ["atk", "hash", "ppen", "open"] : ["atk", "hash"]];
                case obj instanceof Stability || obj instanceof StabilityBlock:
                    return ["Stability", ["hp", "pdef", "odef"]];
                case obj instanceof Special || obj instanceof SpecialBlock:
                    return ["Special", ["pdef", "odef"]];
            }
        })();

        /** @param {StatAttributes} attr */ function output(attr) {
            /** @type {[, STAT_KEYS[keyof STAT_KEYS], "flat"|"perc"]} */
            const [, STAT, VALTYPE] = attr.match(/(.+)(flat|perc)/);
            if (!VIABLE.includes(STAT)) return null;

            switch (VALTYPE) {
                case "flat":
                    if (AlgoField.current.basestat[STAT] < STATVALUES[name+"_THRESH"][STAT])        return "algo-stat-good";
                    else if (AlgoField.current.basestat[STAT] > STATVALUES[name+"_THRESH"][STAT])   return "algo-stat-bad";
                    else                                                                            return null;
                case "perc":
                    if (AlgoField.current.basestat[STAT] > STATVALUES[name+"_THRESH"][STAT])        return "algo-stat-good";
                    else if (AlgoField.current.basestat[STAT] < STATVALUES[name+"_THRESH"][STAT])   return "algo-stat-bad";
                    else                                                                            return null;
            }
        }

        return [ATTRIBUTES[ALGO_TYPE][name], output];
    })();

    // /** @type {"algo-stat-good" | "algo-stat-bad" | null} */ var temp;
    for (const ATTR of ATTR_LIST) {
        const OPTION = document.createElement("option");
        OPTION.value = ATTR;
        // OPTION.textContent = STATVALUES.NAME[ATTR];

        // if (temp) OPTION.classList.add(temp);
        // if ("ontouchstart" in window) {
        switch (_threshCheck(ATTR)) {
            case "algo-stat-good":
                OPTION.textContent = STATVALUES.NAME[ATTR] + " (+)";
                break;
            case "algo-stat-bad":
                OPTION.textContent = STATVALUES.NAME[ATTR] + " (-)";
                break;
            case null:
                OPTION.textContent = STATVALUES.NAME[ATTR];
                break;
        }
        //     } else {
        //     }

        SELECT.appendChild(OPTION);
    }

    return SELECT;
}

class SingleBlock extends Algorithm {
    static SET2 = "No Bonus";
    static SET3 = null;
    SIZE = 1;

    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, attributes = null) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB,] = attributes;

            this.#mainstat = createSelect(this, "MAIN");
            for (const OPTION of Array.from(this.#mainstat.options)) OPTION.selected = OPTION.value === MAIN;

            this.#substat = createSelect(this, "SUB");
            for (const OPTION of Array.from(this.#substat.options)) OPTION.selected = OPTION.value === SUB;
        }
    }

    /** @returns {HTMLDivElement} */
    get html() {
        const OUTPUT = super.html;

        this.#mainstat ??= createSelect(this, "MAIN");
        OUTPUT.appendChild(this.#mainstat);
        
        this.#substat ??= createSelect(this, "SUB");
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

    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, attributes = null) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB1, SUB2] = attributes;

            this.#mainstat = createSelect(this, "MAIN");
            for (const OPTION of Array.from(this.#mainstat.options)) OPTION.selected = OPTION.value === MAIN;

            this.#substat1 = createSelect(this, "SUB");
            this.#substat1.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat2.options))
                    OPTION.disabled = this.#substat1.value === OPTION.value;
            });
            for (const OPTION of Array.from(this.#substat1.options)) {
                OPTION.selected = OPTION.value === SUB1;
                OPTION.disabled = OPTION.value === SUB2;
            }

            this.#substat2 = createSelect(this, "SUB");
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

    /** @returns {HTMLDivElement} */
    get html() {
        const OUTPUT = setattr(super.html, {classList: {add: ["double-block"]}})

        const EMBLEM = setattr(document.createElement("img"), {src: algoPath(this.constructor.name), alt: this.constructor.name, loading: "lazy"});
        OUTPUT.appendChild(EMBLEM);

        const STATS = document.createElement("div");

            this.#mainstat ??= createSelect(this, "MAIN");
            STATS.appendChild(this.#mainstat);

            if (!this.#substat1) {
                this.#substat1 = createSelect(this, "SUB");
                this.#substat1.addEventListener("change", () => {
                    for (const OPTION of Array.from(this.#substat2.options))
                        OPTION.disabled = this.#substat1.value === OPTION.value;
                });
                Array.from(this.#substat1.options)[1].disabled = true;
            }
            STATS.appendChild(this.#substat1);

            if (!this.#substat2) {
                this.#substat2 = createSelect(this, "SUB");
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
class OffenseBlock extends SingleBlock {};
class Offense extends DoubleBlock {};
class StabilityBlock extends SingleBlock {};
class Stability extends DoubleBlock {};
class SpecialBlock extends SingleBlock {};
class Special extends DoubleBlock {};

const ALGO_SETS = {
    Offense: {
        OffenseBlock:   OffenseBlock,
        Feedforward:    class extends Offense {static SET2 = STATVALUES.SET.atkperc;        static SET3 = null;},
        Progression:    class extends Offense {static SET2 = STATVALUES.SET.hashperc;       static SET3 = null;},
        Stack:          class extends Offense {static SET2 = STATVALUES.SET.hashperc;       static SET3 = "";},
        Deduction:      class extends Offense {static SET2 = STATVALUES.SET.aspdflat;       static SET3 = null;},
        DataRepair:     class extends Offense {static SET2 = STATVALUES.SET.resflat;        static SET3 = "";},
        Surplus:        class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static SET3 = null;},
        MLRMatrix:      class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static SET3 = "";},
        LimitValue:     class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static SET3 = "";},
        Hyperpulse:     class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static SET3 = "";},
        LowerLimit:     class extends Offense {static SET2 = STATVALUES.SET.LIFESTEAL;      static SET3 = "";},
        Puncture:       class extends Offense {static SET2 = STATVALUES.SET.dpenflat;       static SET3 = null;},
        Permeate:       class extends Offense {static SET2 = STATVALUES.SET.dpenperc;       static SET3 = null;},
        Polybore:       class extends Offense {static SET2 = STATVALUES.SET.dpenperc;       static SET3 = "";}
    },
    Stability: {
        StabilityBlock: StabilityBlock,
        Threshold:      class extends Stability {static SET2 = STATVALUES.SET.hpflat;       static SET3 = null;},
        Perception:     class extends Stability {static SET2 = STATVALUES.SET.hpperc;       static SET3 = null;},
        Acclimate:      class extends Stability {static SET2 = STATVALUES.SET.hpperc;       static SET3 = "";},
        Rationality:    class extends Stability {static SET2 = STATVALUES.SET.pdefperc;     static SET3 = null;},
        Lattice:        class extends Stability {static SET2 = STATVALUES.SET.odefperc;     static SET3 = null;},
        Twinform:       class extends Stability {static SET2 = STATVALUES.SET.ddefperc;     static SET3 = null;},
        Buildup:        class extends Stability {static SET2 = STATVALUES.SET.ddefperc;     static SET3 = "";},
        Connection:     class extends Stability {static SET2 = STATVALUES.SET.resflat;      static SET3 = null;},
        Iteration:      class extends Stability {static SET2 = STATVALUES.SET.lashperc;     static SET3 = "";},
        Reflection:     class extends Stability {static SET2 = STATVALUES.SET.lashperc;     static SET3 = "";},
        Encapsulate:    class extends Stability {static SET2 = STATVALUES.SET.dreducperc;   static SET3 = "";},
        Resolve:        class extends Stability {static SET2 = STATVALUES.SET.dreducperc;   static SET3 = "";},
        Overflow:       class extends Stability {static SET2 = STATVALUES.SET.HPREGEN;      static SET3 = "";}
    },
    Special: {
        SpecialBlock:   SpecialBlock,
        Rapidity:       class extends Special {static SET2 = STATVALUES.SET.aspdflat;       static SET3 = null;},
        Paradigm:       class extends Special {static SET2 = STATVALUES.SET.aspdflat;       static SET3 = "";},
        Cluster:        class extends Special {static SET2 = STATVALUES.SET.crateperc;      static SET3 = null;},
        Convolution:    class extends Special {static SET2 = STATVALUES.SET.cdmgperc;       static SET3 = null;},
        Stratagem:      class extends Special {static SET2 = STATVALUES.SET.dodgeperc;      static SET3 = null;},
        FastLoad:       class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static SET3 = null;},
        DeltaV:         class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static SET3 = "";},
        Exploit:        class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static SET3 = "";},
        Delivery:       class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static SET3 = "";},
        Flush:          class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static SET3 = "";},
        Increment:      class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static SET3 = null;},
        LoopGain:       class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static SET3 = "";},
        SVM:            class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static SET3 = "";},
        Inspiration:    class extends Special {static SET2 = STATVALUES.SET.HPREGEN;        static SET3 = null;},
    }
};
//#endregion

//#region Interface
const MAX_SIZE = 6;
const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal #Offense"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal #Stability"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal #Special")
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
            ALGO_SELECT.firstElementChild.appendChild(ALGO_SETS[this.#fieldtype][this.#fieldtype+"Block"].createSelectButton());
        else
            ALGO_SELECT.firstElementChild.append(...Object.values(ALGO_SETS[this.#fieldtype]).map(x => x.createSelectButton()));

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

const STORAGEKEY = "algorithms";

/** @type {HTMLDialogElement} */ const ALGO_MODAL = document.querySelector("#algo-modal");
/** @type {HTMLButtonElement} */ const ALGO_CLOSE = document.querySelector("#close-modal");
ALGO_MODAL.addEventListener("close", function(event) {
    this.firstElementChild.textContent = "";
    for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
    localStorage.setItem(STORAGEKEY, JSON.stringify(ALGO_SAVE));
});

/** @type {{[UnitName: string]: [AlgoInfo[], AlgoInfo[], AlgoInfo[]]}} */ const ALGO_SAVE = (function() {
    const SAVE_DATA = localStorage.getItem(STORAGEKEY);
    return SAVE_DATA ? JSON.parse(SAVE_DATA) : {};
})()

export class AlgoField{
    #name;
    #basestat;

    /** @type {[AlgoGrid, AlgoGrid, AlgoGrid]} */ #algogrids;
    /** @type {StatDict} */ #stats;

    #layout;

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
        AlgoField.#current = this;

        this.#name = unit.name;
        this.#basestat = unit.base;

        // this.#layout = {
        //     "Guard": "465",
        //     "Sniper": "645",
        //     "Warrior": "654",
        //     "Specialist": "546",
        //     "Medic": unit.name === "Imhotep" ? "546" : "456"
        // }[unit.class];

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

        // what if algo stats checked without opening modal
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

        // this.#algogrids ??= Array.from(
        //     zip(["Offense", "Stability", "Special"], this.#layout, ALGO_SAVE[this.#name] ?? [null, null, null])
        // ).map(
        //     ([type, size, info]) => new AlgoGrid(type, Number(size), info)
        // );

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