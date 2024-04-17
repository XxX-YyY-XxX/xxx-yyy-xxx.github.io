import {STAT_KEYS} from "./typing.js";
import {cmp, setattr, subclassof, zip} from "../../univasset/scripts/basefunctions/index.js";
import {getTemplateCloner} from "../../univasset/scripts/externaljavascript.js";
import {UNITFILTER} from "./typing.js";

//#region Types
/** @typedef {keyof ALGO_SETS["Offense"] | keyof ALGO_SETS["Stability"] | keyof ALGO_SETS["Special"]} AlgoSet*/
/** @typedef {keyof STATVALUES["NAME"]} StatAttributes */
/** @typedef {keyof STATVALUES["SET"]} SetAttributes */
/** @typedef {keyof STATVALUES["MAIN"]} MainAttributes */
/** @typedef {keyof STATVALUES["SUB"]} SubAttributes */

/** @typedef {[algoname: AlgoSet, main: MainAttributes, sub1: SubAttributes, sub2: SubAttributes | ""]} AlgoInfo */
/** @typedef {Map<StatAttributes, number>} StatDict */

/** @typedef {"Offense"|"Stability"|"Special"} GridFields */
//#endregion

//#region Generic Constants
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
        /** @type {[["atkperc", 15]]} */ atkperc: [["atkperc", 15]],
        /** @type {[["hashperc", 15]]} */ hashperc: [["hashperc", 15]],
        /** @type {[["aspdflat", 30]]} */ aspdflat: [["aspdflat", 30]],
        /** @type {[["resflat", 50]]} */ resflat: [["resflat", 50]],
        /** @type {[["dboostperc", 5]]} */ dboostperc: [["dboostperc", 5]],
        lifesteal: "Lifesteal",
        /** @type {[["ppenflat", 80], ["openflat", 80]]} */ dpenflat: [["ppenflat", 80], ["openflat", 80]],
        /** @type {[["ppenperc", 20], ["openperc", 20]]} */ dpenperc: [["ppenperc", 20], ["openperc", 20]],
        /** @type {[["hpflat", 2500]]} */ hpflat: [["hpflat", 2500]],
        /** @type {[["hpperc", 15]]} */ hpperc: [["hpperc", 15]],
        /** @type {[["pdefperc", 15]]} */ pdefperc: [["pdefperc", 15]],
        /** @type {[["odefperc", 15]]} */ odefperc: [["odefperc", 15]],
        /** @type {[["pdefperc", 10], ["odefperc", 10]]} */ ddefperc: [["pdefperc", 10], ["odefperc", 10]],
        /** @type {[["lashperc", 5]]} */ lashperc: [["lashperc", 5]],
        /** @type {[["dreducperc", 5]]} */ dreducperc: [["dreducperc", 5]],
        hpregen: "HP Regen",
        /** @type {[["crateperc", 10]]} */ crateperc: [["crateperc", 10]],
        /** @type {[["cdmgperc", 20]]} */ cdmgperc: [["cdmgperc", 20]],
        /** @type {[["dodgeperc", 8]]} */ dodgeperc: [["dodgeperc", 8]],
        /** @type {[["hasteperc", 10]]} */ hasteperc: [["hasteperc", 10]],
        /** @type {[["hboostperc", 7.5]]} */ hboostperc: [["hboostperc", 7.5]],
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
//#endregion

//#region Generic Functions
/** @param {StatDict} object1 @param {StatDict} object2 @returns {StatDict} */
function combine(object1, object2) {
    const OUTPUT = new Map();
    for (const attribute of new Set([...object1.keys(), ...object2.keys()]))
        OUTPUT.set(attribute, (object1.get(attribute) ?? 0) + (object2.get(attribute) ?? 0));
    return OUTPUT;
}

/** @param {AlgoSet | "SingleBlock"} algoname */
function algoPath(algoname) {
    if (["OffenseBlock", "StabilityBlock", "SpecialBlock"].includes(algoname)) algoname = "SingleBlock";
    return `../assets/images/algorithms/sets/${algoname}.png`;
}
//#endregion

//#region Algorithm Classes
/** @abstract */ class Algorithm {
    /** @abstract @static @type {STATVALUES["SET"][SetAttributes]} */ static SET2;
    /** @abstract @static @type {string?} */ static SET3;
    /** @abstract @type {number} */ SIZE;
    /** @abstract @static @type {"α" | "β" | "γ" | "1"} */ static TYPE;

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

    // static _algoButtonCloner = getTemplateCloner("#algo-select-button");
    static createSelectButton() {
        // const CLONE = this._algoButtonCloner();

        // const OUTPUT = setattr(CLONE.querySelector("button"), {value: this.name});
        const OUTPUT = setattr(document.createElement("button"), {type: "submit", value: this.name});

        // const NAME = setattr(document.createElement("div"), {textContent: this.name, dataset: {grid: "name"}});
        const NAME = setattr(document.createElement("div"), {textContent: this.name, dataset: {grid: "name"}});
        OUTPUT.appendChild(NAME);

        const SET2 = setattr(document.createElement("div"), {dataset: {grid: "set2"}});
        if (Array.isArray(this.SET2)) {
            switch (this.SET2) {
                case STATVALUES.SET.hpflat:                                                 // Stability
                    if (AlgoField.current.basestat.hp < STATVALUES.SET_THRESH.hp)   SET2.classList.add("algo-left-good", "algo-right-good");
                    else                                                            SET2.classList.add("algo-left-bad", "algo-right-bad");
                    break;
                case STATVALUES.SET.hpperc:
                    if (AlgoField.current.basestat.hp > STATVALUES.SET_THRESH.hp)   SET2.classList.add("algo-left-good", "algo-right-good");
                    else                                                            SET2.classList.add("algo-left-bad", "algo-right-bad");
                    break;
                case STATVALUES.SET.dpenflat:                                                // Offense
                    if (AlgoField.current.basestat.ppen < STATVALUES.SET_THRESH.dpen)       SET2.classList.add("algo-left-good");
                    else if (AlgoField.current.basestat.ppen > STATVALUES.SET_THRESH.dpen)  SET2.classList.add("algo-left-bad");

                    if (AlgoField.current.basestat.open < STATVALUES.SET_THRESH.dpen)       SET2.classList.add("algo-right-good");
                    else if (AlgoField.current.basestat.open > STATVALUES.SET_THRESH.dpen)  SET2.classList.add("algo-right-bad");
                    break;
                case STATVALUES.SET.dpenperc:
                    if (AlgoField.current.basestat.ppen > STATVALUES.SET_THRESH.dpen)       SET2.classList.add("algo-left-good");
                    else if (AlgoField.current.basestat.ppen < STATVALUES.SET_THRESH.dpen)  SET2.classList.add("algo-left-bad");

                    if (AlgoField.current.basestat.open > STATVALUES.SET_THRESH.dpen)       SET2.classList.add("algo-right-good");
                    else if (AlgoField.current.basestat.open < STATVALUES.SET_THRESH.dpen)  SET2.classList.add("algo-right-bad");
                    break;
            }
            SET2.textContent = this.SET2.map(([attr,]) => STATVALUES.NAME[attr]).join("|");
        } else {
            SET2.textContent = this.SET2;
        }
        OUTPUT.appendChild(SET2);

        const SET_TYPE = setattr(document.createElement("div"), {textContent: this.TYPE, dataset: {grid: "type"}});
        OUTPUT.appendChild(SET_TYPE);

        const IMG = setattr(document.createElement("img"), {src: algoPath(this.name), alt: this.name});
        OUTPUT.appendChild(IMG);

        const SET3 = setattr(document.createElement("div"), {textContent: this.SET3 ?? "No Set Skill", dataset: {grid: "set3"}});
        OUTPUT.appendChild(SET3);
    
        return OUTPUT;
    }
}

const ATTRIBUTES = {
    Offense: {
        /** @type {MainAttributes[]} */ MAIN: ["atkflat", "atkperc", "hashflat", "hashperc", "ppenflat", "ppenperc", "openflat", "openperc"],
        /** @type {SubAttributes[]} */ SUB: ["hpflat", "atkflat", "atkperc", "hashflat", "hashperc", "pdefflat", "odefflat", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dboostperc"]
    },
    Stability: {
        /** @type {MainAttributes[]} */ MAIN: ["hpflat", "hpperc", "pdefflat", "pdefperc", "odefflat", "odefperc", "regenflat"],
        /** @type {SubAttributes[]} */ SUB: ["hpflat", "hpperc", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "regenflat", "resflat", "dreducperc"]
    },
    Special: {
        /** @type {MainAttributes[]} */ MAIN: ["pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "hasteperc", "hboostperc"],
        /** @type {SubAttributes[]} */ SUB: ["hpflat", "atkflat", "hashflat", "pdefflat", "pdefperc", "odefflat", "odefperc", "crateperc", "cdmgperc", "ppenflat", "openflat", "dodgeperc", "regenflat", "hasteperc", "resflat", "hboostperc"]
    }
}

/** @param {Algorithm} obj @param {"MAIN" | "SUB"} name */
function createSelect(obj, name) {
    const SELECT = document.createElement("select");
    SELECT.classList.add(name === "MAIN" ? "mainstat" : "substat");

    const [ATTR_LIST, _threshCheck] = (function() {
        /** @type {[GridFields, STAT_KEYS[keyof STAT_KEYS][]]} */ const [ALGO_TYPE, VIABLE] = (function() {
            switch (true) {
                case Object.values(ALGO_SETS.Offense).some(x => obj instanceof x):      return ["Offense", name === "MAIN" ? ["atk", "hash", "ppen", "open"] : ["atk", "hash"]];
                case Object.values(ALGO_SETS.Stability).some(x => obj instanceof x):    return ["Stability", ["hp", "pdef", "odef"]];
                case Object.values(ALGO_SETS.Special).some(x => obj instanceof x):      return ["Special", ["pdef", "odef"]];
            }
        })();

        /** @param {MainAttributes | SubAttributes} attr */ function output(attr) {
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

    const indicator = {"algo-stat-good": " (+)", "algo-stat-bad": " (-)"}
    // /** @type {"algo-stat-good" | "algo-stat-bad" | null} */ var temp;
    for (const ATTR of ATTR_LIST) {
        const OPTION = document.createElement("option");
        OPTION.value = ATTR;
        // "ontouchstart" in window
        OPTION.textContent = STATVALUES.NAME[ATTR] + (indicator[_threshCheck(ATTR)] ?? "");

        SELECT.appendChild(OPTION);
    }

    return SELECT;
}

class SingleBlock extends Algorithm {
    static SET2 = "No Bonus";
    static SET3 = null;
    SIZE = 1;
    static TYPE = "1";

    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, ""]?} attributes */
    constructor(grid, attributes) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB,] = attributes;

            this.#mainstat = createSelect(this, "MAIN");
            for (const OPTION of Array.from(this.#mainstat.options)) OPTION.selected = OPTION.value === MAIN;

            this.#substat = createSelect(this, "SUB");
            for (const OPTION of Array.from(this.#substat.options)) OPTION.selected = OPTION.value === SUB;
        }
    }

    /** @type {HTMLDivElement} */ #html;
    get html() {
        return this.#html ??= (() => {
            this.#mainstat ??= createSelect(this, "MAIN");
            this.#substat ??= createSelect(this, "SUB");
            return setattr(super.html, {append: [this.#mainstat, this.#substat]});                
        })();
    }

    /** @type {HTMLSelectElement} */ #mainstat;
    /** @returns {StatDict} */ get mainstat() {
        // Array.from(this.#mainstat.selectedOptions)[0].value,
        // this.#mainstat.value,
        // this.#mainstat.options[this.#mainstat.selectedIndex].value
        return new Map([[this.#mainstat.value, STATVALUES.MAIN[this.#mainstat.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat;
    /** @returns {StatDict} */ get substat1() {
        return new Map([[this.#substat.value, STATVALUES.SUB[this.#substat.value]]]);
    }

    /** @returns {StatDict} */ get substat2() {return new Map()}
}

class DoubleBlock extends Algorithm {
    SIZE = 2;

    /** @param {AlgoGrid} grid @param {[StatAttributes, StatAttributes, StatAttributes]?} attributes */
    constructor(grid, attributes) {
        super(grid);
        if (attributes) {
            const [MAIN, SUB1, SUB2] = attributes;

            this.#mainstat = createSelect(this, "MAIN");
            for (const OPTION of this.#mainstat.options) OPTION.selected = OPTION.value === MAIN;

            this.#substat1 = createSelect(this, "SUB");
            for (const OPTION of this.#substat1.options) {
                OPTION.selected = OPTION.value === SUB1;
                OPTION.disabled = OPTION.value === SUB2;
            }

            this.#substat2 = createSelect(this, "SUB");
            for (const OPTION of this.#substat2.options) {
                OPTION.selected = OPTION.value === SUB2;
                OPTION.disabled = OPTION.value === SUB1;
            }
        }
    }

    /** @type {HTMLDivElement} */ #html;
    get html() {
        return this.#html ??= (() => {
            const EMBLEM = setattr(document.createElement("img"), {src: algoPath(this.constructor.name), alt: this.constructor.name, loading: "lazy"});

            this.#mainstat ??= createSelect(this, "MAIN");
    
            if (!this.#substat1) {
                this.#substat1 = createSelect(this, "SUB");
                Array.from(this.#substat1.options)[1].disabled = true;
            }
            this.#substat1.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat2.options)) OPTION.disabled = this.#substat1.value === OPTION.value;
            });

            if (!this.#substat2) {
                this.#substat2 = createSelect(this, "SUB");
                setattr(Array.from(this.#substat2.options), {0: {disabled: true}, 1: {selected: true}});
            }
            this.#substat2.addEventListener("change", () => {
                for (const OPTION of Array.from(this.#substat1.options)) OPTION.disabled = this.#substat2.value === OPTION.value;
            });
        
            const STATS = setattr(document.createElement("div"), {append: [this.#mainstat, this.#substat1, this.#substat2]});
            return setattr(super.html, {classList: {add: ["double-block"]}, append: [EMBLEM, STATS]});    
        })();
    }

    /** @type {HTMLSelectElement} */ #mainstat;
    /** @returns {StatDict} */ get mainstat() {
        return new Map([[this.#mainstat.value, STATVALUES.MAIN[this.#mainstat.value] * 2]]);
    }

    /** @type {HTMLSelectElement} */ #substat1;
    /** @returns {StatDict} */ get substat1() {
        return new Map([[this.#substat1.value, STATVALUES.SUB[this.#substat1.value]]]);
    }

    /** @type {HTMLSelectElement} */ #substat2;
    /** @returns {StatDict} */ get substat2() {
        return new Map([[this.#substat2.value, STATVALUES.SUB[this.#substat2.value]]]);
    }
}

class Offense   extends DoubleBlock {};
class Stability extends DoubleBlock {};
class Special   extends DoubleBlock {};

// Lasts for the entire battle
const ALGO_SETS = {
    Offense: {
        OffenseBlock:   class extends SingleBlock {},
        Feedforward:    class extends Offense {static SET2 = STATVALUES.SET.atkperc;        static TYPE = "α";  static SET3 = null;},
        Progression:    class extends Offense {static SET2 = STATVALUES.SET.hashperc;       static TYPE = "α";  static SET3 = null;},
        Stack:          class extends Offense {static SET2 = STATVALUES.SET.hashperc;       static TYPE = "β";  static SET3 = "Every 3 normal attacks will create a stack of [Pursuit Ordnance], max 4 stacks. Every stacks deals an additional 10% of Doll's Hashrate in [Derivative] Operand damage.";},
        Deduction:      class extends Offense {static SET2 = STATVALUES.SET.aspdflat;       static TYPE = "α";  static SET3 = null;},
        DataRepair:     class extends Offense {static SET2 = STATVALUES.SET.resflat;        static TYPE = "α";  static SET3 = "Convert 10% of all damage dealt into HP.";},
        Surplus:        class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static TYPE = "γ";  static SET3 = null;},
        MLRMatrix:      class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static TYPE = "α";  static SET3 = "Unit steals 12% of killed enemy unit's ATK, Hashrate, and Max HP. (When triggered on more than one enemy unit, only the highest stats take effect), and recover HP by the same amount. Lasts for the entire battle.";},
        LimitValue:     class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static TYPE = "β";  static SET3 = "When dealing damage to an enemy with higher Max HP, additionally deal [Derivative] damage equal to (6% + Enemy Max HP/Self Max HP x 3%), of the same damage type as the original attack, with a maximum of 20%.";},
        Hyperpulse:     class extends Offense {static SET2 = STATVALUES.SET.dboostperc;     static TYPE = "γ";  static SET3 = "At the start of battle, +10% ATK and Hashrate; gain additional 3% ATK and Hashrate every second after that, stacks up to 10 times. All stacks are cleared 3 seconds after using a skill.";},
        LowerLimit:     class extends Offense {static SET2 = STATVALUES.SET.lifesteal;      static TYPE = "α";  static SET3 = "When HP drops below 15%, gain Attack Speed +50, ATK +10%, and Damage Reduction +30% for 10 seconds. Triggers once only every battle.";},
        Puncture:       class extends Offense {static SET2 = STATVALUES.SET.dpenflat;       static TYPE = "γ";  static SET3 = null;},
        Permeate:       class extends Offense {static SET2 = STATVALUES.SET.dpenperc;       static TYPE = "γ";  static SET3 = null;},
        Polybore:       class extends Offense {static SET2 = STATVALUES.SET.dpenperc;       static TYPE = "γ";  static SET3 = "At the start of the battle, the character's Skill Haste is halved. Every 1% reduction of Skill Haste increases character's damage by 1.2%. Lasts for the entire battle.";}
    },
    Stability: {
        StabilityBlock: class extends SingleBlock {},
        Threshold:      class extends Stability {static SET2 = STATVALUES.SET.hpflat;       static TYPE = "γ";  static SET3 = null;},
        Perception:     class extends Stability {static SET2 = STATVALUES.SET.hpperc;       static TYPE = "α";  static SET3 = null;},
        Acclimate:      class extends Stability {static SET2 = STATVALUES.SET.hpperc;       static TYPE = "γ";  static SET3 = "When ally Doll's HP decreases below 30%, grant said Doll a shield of 35% of their Max HP and 5 seconds of Stealth (can only trigger once per battle).";},
        Rationality:    class extends Stability {static SET2 = STATVALUES.SET.pdefperc;     static TYPE = "α";  static SET3 = null;},
        Lattice:        class extends Stability {static SET2 = STATVALUES.SET.odefperc;     static TYPE = "γ";  static SET3 = null;},
        Twinform:       class extends Stability {static SET2 = STATVALUES.SET.ddefperc;     static TYPE = "γ";  static SET3 = null;},
        Buildup:        class extends Stability {static SET2 = STATVALUES.SET.ddefperc;     static TYPE = "γ";  static SET3 = "At the start of the battle, +35% Physical and Operand DEF; For 5 seconds after using a skill, further increase Physical/Operand DEF by +35%.";},
        Connection:     class extends Stability {static SET2 = STATVALUES.SET.resflat;      static TYPE = "α";  static SET3 = null;},
        Iteration:      class extends Stability {static SET2 = STATVALUES.SET.lashperc;     static TYPE = "α";  static SET3 = "If not fallen at the end of battle, character is healed by 15% of their Max HP.";},
        Reflection:     class extends Stability {static SET2 = STATVALUES.SET.lashperc;     static TYPE = "β";  static SET3 = "When dealing backlash damage, deal additional true damage equal to 1.2% of own Max HP; when activating skill, Taunt enemies within a 2 tile range for 3s. While this Taunt is active, backlash damage value is raised by 10%.";},
        Encapsulate:    class extends Stability {static SET2 = STATVALUES.SET.dreducperc;   static TYPE = "α";  static SET3 = "Obtain supportive ability and take 30% of all damage for the ally unit with lowest current HP.";},   //taken damage type seems like same damage type as original
        Resolve:        class extends Stability {static SET2 = STATVALUES.SET.dreducperc;   static TYPE = "β";  static SET3 = "When HP is lower than 50%, gain 10% damage reduction. From then onwards, for every 10% of HP lost, gain 5% damage reduction. Every change in HP will refresh the value of this damage reduction.";},
        Overflow:       class extends Stability {static SET2 = STATVALUES.SET.hpregen;      static TYPE = "α";  static SET3 = "Gain a Shield equal to 500% Physical DEF at the beginning of battle.";}
    },
    Special: {
        SpecialBlock:   class extends SingleBlock {},
        Rapidity:       class extends Special {static SET2 = STATVALUES.SET.aspdflat;       static TYPE = "γ";  static SET3 = null;},
        Paradigm:       class extends Special {static SET2 = STATVALUES.SET.aspdflat;       static TYPE = "α";  static SET3 = "Every 4th Critical Hit deals True Damage of 8% target's current HP, up to twice the current character's Hashrate.";},
        Cluster:        class extends Special {static SET2 = STATVALUES.SET.crateperc;      static TYPE = "α";  static SET3 = null;},
        Convolution:    class extends Special {static SET2 = STATVALUES.SET.cdmgperc;       static TYPE = "α";  static SET3 = null;},
        Stratagem:      class extends Special {static SET2 = STATVALUES.SET.dodgeperc;      static TYPE = "α";  static SET3 = null;},
        FastLoad:       class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static TYPE = "γ";  static SET3 = null;},
        DeltaV:         class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static TYPE = "α";  static SET3 = "For every 3 Normal Attacks, character's skill recharge is sped up by 1 second.";},
        Exploit:        class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static TYPE = "β";  static SET3 = "Deal 10% additional damage to enemies with an active debuff. For every active debuff, deal 2% more damage to that target, up to a maximum of 3 stacks.";},
        Delivery:       class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static TYPE = "γ";  static SET3 = "After using a skill, all Dolls' ATK and Hashrate are increased by +20% for 7 seconds. Does not stack.";},
        Flush:          class extends Special {static SET2 = STATVALUES.SET.hasteperc;      static TYPE = "γ";  static SET3 = "When the carrier applies a debuff, said unit takes 16% more damage. Lasts for 6 seconds and cannot stack.";},
        Increment:      class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static TYPE = "γ";  static SET3 = null;},
        LoopGain:       class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static TYPE = "α";  static SET3 = "When healing ally units, boost their Healing Recieved by 20% for 4 seconds.";},
        SVM:            class extends Special {static SET2 = STATVALUES.SET.hboostperc;     static TYPE = "α";  static SET3 = "Boost Healing Effect by 10%. Healing Effect increased to 30% when target's HP is below 45%.";},
        Inspiration:    class extends Special {static SET2 = STATVALUES.SET.hpregen;        static TYPE = "α";  static SET3 = null;},
    },
    get classdict() {return {...this.Offense, ...this.Stability, ...this.Special}}
};
//#endregion

//#region Interface
const GRIDS = {
    /** @type {HTMLDivElement} */ Offense: document.querySelector("#algo-modal #Offense"),
    /** @type {HTMLDivElement} */ Stability: document.querySelector("#algo-modal #Stability"),
    /** @type {HTMLDivElement} */ Special: document.querySelector("#algo-modal #Special")
}

/** @type {HTMLDialogElement} */ const ALGO_SELECT = document.querySelector("#algo-select");
ALGO_SELECT.addEventListener("close", function(event) {this.firstElementChild.replaceChildren()});  // Empties algo buttons selection.

class AlgoGrid {
    static #MAX_SIZE = 6;

    static {
        // this.#SELECT.addEventListener("click", function(event) {
        //     const DIM = this.getBoundingClientRect();
        //     if (event.clientX < DIM.left || event.clientX > DIM.right || event.clientY < DIM.top || event.clientY > DIM.bottom)
        //         this.close("null");
        // });
    }

    #fieldtype;
    #closedcell;
    get #emptycell() {return AlgoGrid.#MAX_SIZE - (this.#closedcell + this.#algorithms.map(x => x.SIZE).reduce((a, b) => a + b, 0))}

    #grid;
    /** @type {Algorithm[]} */ #algorithms;

    /** @returns {StatDict} */
    get stats() {
        /** @type {StatDict} */ const EFFECT = new Map(
            this.#algorithms.map(x => x.constructor.name).collate().get(2, 3)
                .map(x => ALGO_SETS[this.#fieldtype][x].SET2).filter(Array.isArray)[0] ?? []
        );
        return [EFFECT, ...this.#algorithms.map(x => x.stats)].reduce(combine);
    }

    get info() {return this.#algorithms.map(x => x.info)}
    
    /** @param {GridFields} fieldtype @param {number} size @param {AlgoInfo[]} init_array */
    constructor(fieldtype, size, init_array) {
        this.#fieldtype = fieldtype;
        this.#closedcell = AlgoGrid.#MAX_SIZE - size;

        this.#grid = GRIDS[fieldtype];
        this.#algorithms = init_array.map(([set, ...attr]) => new ALGO_SETS[fieldtype][set](this, attr));
    }

    #open = () => {
        if (this.#emptycell === 1)
            ALGO_SELECT.firstElementChild.appendChild(ALGO_SETS[this.#fieldtype][this.#fieldtype+"Block"].createSelectButton());
        else
            ALGO_SELECT.firstElementChild.append(...Object.values(ALGO_SETS[this.#fieldtype]).map(x => x.createSelectButton()));

        ALGO_SELECT.addEventListener("close", this.#close);

        ALGO_SELECT.showModal();
    }

    // Function object required instead of class method for listener attachment and removal.
    /** Only gets closed upon selecting an algorithm. */
    #close = () => {
        ALGO_SELECT.removeEventListener("close", this.#close);

        // if (!ALGO_SELECT.returnValue === "null") return;

        this.#algorithms.push(new ALGO_SETS[this.#fieldtype][ALGO_SELECT.returnValue](this));

        this.#grid.replaceChildren();
        this.display();
    };

    display() {
        this.#grid.append(...this.#algorithms.sort(cmp({key: x => x.SIZE, reverse: true})).map(x => x.html));

        for (let index = 0; index < this.#emptycell; index++)
            this.#grid.appendChild(setattr(document.createElement("button"), {type: "button", classList: {add: ["algo-empty"]}, addEventListener: ["click", this.#open]}));

        // store for reuse
        for (let index = 0; index < this.#closedcell; index++)
            this.#grid.appendChild(setattr(document.createElement("div"), {classList: {add: ["algo-close"]}}))
    }

    /** @param {Algorithm} algorithm */
    delete(algorithm) {
        this.#algorithms.remove(algorithm);
        this.#grid.replaceChildren();
        this.display();
    }

    clear() {
        this.#algorithms.splice(0);
        this.#grid.replaceChildren();
        this.display();
    }
}

/** @type {HTMLDialogElement} */ const ALGO_MODAL = document.querySelector("#algo-modal");
/** @type {HTMLDivElement} */ const ALGO_MODAL_NAME = ALGO_MODAL.querySelector("#name");
ALGO_MODAL.addEventListener("close", function(event) {
    ALGO_MODAL_NAME.textContent = "";
    for (const DIV of Object.values(GRIDS)) DIV.replaceChildren();
});

const ALGO_SAVE = new (class {
    /** @type {"algorithms"} */
    #KEY = "algorithms";
    
    /** @type {{[UnitName: string]: [AlgoInfo[], AlgoInfo[], AlgoInfo[]]?}} */
    #DATA = JSON.parse(localStorage.getItem(this.#KEY) ?? "{}");

    // /** @type {{[UnitName: string]: (keyof ALGO_SETS["Offense"] | keyof ALGO_SETS["Stability"] | keyof ALGO_SETS["Special"])[][]}} */
    // #SETS = (() => {this.#DATA})();

    constructor() {
        ALGO_MODAL.addEventListener("close", event => localStorage.setItem(this.#KEY, JSON.stringify(this.#DATA)));
    }

    /** @param {string} name */
    get(name) {
        return this.#DATA[name] ?? [[], [], []];
    }

    /** @param {string} name @param {[AlgoInfo[], AlgoInfo[], AlgoInfo[]]} algoinfo */
    set(name, algoinfo) {
        this.#DATA[name] = algoinfo;
    }

    /** @param {string} name */
    del(name) {
        delete this.#DATA[name];
    }
})();

export class AlgoField {
    #name;
    #basestat;
    #layout;

    /** @type {[AlgoGrid, AlgoGrid, AlgoGrid]} */ #algogrids;
    /** @type {StatDict} */ #stats;

    get [STAT_KEYS.HEALTH]()        {return this.#basestat.hp * (this.#stats.get("hpperc") ?? 0) / 100 + (this.#stats.get("hpflat") ?? 0)}
    get [STAT_KEYS.ATTACK]()        {return this.#basestat.atk * (this.#stats.get("atkperc") ?? 0) / 100 + (this.#stats.get("atkflat") ?? 0)}
    get [STAT_KEYS.HASHRATE]()      {return this.#basestat.hash * (this.#stats.get("hashperc") ?? 0) / 100 + (this.#stats.get("hashflat") ?? 0)}
    get [STAT_KEYS.PDEFENSE]()      {return this.#basestat.pdef * (this.#stats.get("pdefperc") ?? 0) / 100 + (this.#stats.get("pdefflat") ?? 0)}
    get [STAT_KEYS.ODEFENSE]()      {return this.#basestat.odef * (this.#stats.get("odefperc") ?? 0) / 100 + (this.#stats.get("odefflat") ?? 0)}
    get [STAT_KEYS.ATKSPD]()        {return this.#stats.get("aspdflat") ?? 0}
    get [STAT_KEYS.CRITRATE]()      {return this.#stats.get("crateperc") ?? 0}
    get [STAT_KEYS.CRITDMG]()       {return this.#stats.get("cdmgperc") ?? 0}
    get [STAT_KEYS.PPENETRATE]()    {return this.#basestat.ppen * (this.#stats.get("ppenperc") ?? 0) / 100 + (this.#stats.get("ppenflat") ?? 0)}
    get [STAT_KEYS.OPENETRATE]()    {return this.#basestat.open * (this.#stats.get("openperc") ?? 0) / 100 + (this.#stats.get("openflat") ?? 0)}
    get [STAT_KEYS.DODGE]()         {return this.#stats.get("dodgeperc") ?? 0}
    get [STAT_KEYS.POSTHEAL]()      {return this.#stats.get("regenflat") ?? 0}
    get [STAT_KEYS.HASTE]()         {return this.#stats.get("hasteperc") ?? 0}
    get [STAT_KEYS.DEBUFFRES]()     {return this.#stats.get("resflat") ?? 0}
    get [STAT_KEYS.BACKLASH]()      {return this.#stats.get("lashperc") ?? 0}
    get [STAT_KEYS.DMGBOOST]()      {return this.#stats.get("dboostperc") ?? 0}
    get [STAT_KEYS.DMGREDUCE]()     {return this.#stats.get("dreducperc") ?? 0}
    get [STAT_KEYS.HEALBOOST]()     {return this.#stats.get("hboostperc") ?? 0}

    get info() {return ALGO_SAVE.get(this.#name).flat()}

    stat_update = function() {};

    /** @param {UnitObject} unit */
    constructor(unit) {
        this.#name = unit.name;
        this.#basestat = unit.base;

        this.#layout = {
            Guard: "465",
            Sniper: "645",
            Warrior: "654",
            Specialist: "546",
            Medic: this.#name === "Imhotep" ? "546" : "456"
        }[unit.class];

        // For when algorithm button is checked without opening modal
        // Might run only when algo button first checked, remove when run or respective modal opened
        this.#stats = (() => {
            const INFOS = ALGO_SAVE.get(this.#name).flat();
            if (!INFOS.length) return new Map();

            /** @type {StatDict} */ const SET_DICT = INFOS.map(x => x[0]).collate().get(2, 3)
                .map(x => ALGO_SETS.classdict[x].SET2).filter(Array.isArray)
                .map(x => new Map(x)).reduce(combine, new Map());

            /** @type {StatDict} */ const MAINSUB = INFOS.flatMap(([, main, sub1, sub2]) => {
                if (sub2)   return [new Map([[main, STATVALUES.MAIN[main] * 2]]), new Map([[sub1, STATVALUES.SUB[sub1]], [sub2, STATVALUES.SUB[sub2]]])];
                else        return [new Map([[main, STATVALUES.MAIN[main]]]), new Map([[sub1, STATVALUES.SUB[sub1]]])];
            }).reduce(combine);

            return combine(SET_DICT, MAINSUB);
        })();
    }

    show() {
        AlgoField.#current = this;

        this.#algogrids ??= Array.from(zip(["Offense", "Stability", "Special"], this.#layout, ALGO_SAVE.get(this.#name))).map(([type, size, info]) => new AlgoGrid(type, Number(size), info));

        ALGO_MODAL_NAME.textContent = this.#name;
        for (const GRID of this.#algogrids) GRID.display();

        ALGO_MODAL.addEventListener("click", this.#close);

        ALGO_MODAL.showModal();
    }

    #close = /** @param {MouseEvent} event */ (event) => {
        const DIM = ALGO_MODAL.getBoundingClientRect();
        if (event.clientX < DIM.left || event.clientX > DIM.right || event.clientY < DIM.top || event.clientY > DIM.bottom) {
            this.#stats = this.#algogrids.map(x => x.stats).reduce(combine);
            const INFO = this.#algogrids.map(x => x.info);
            if (INFO.flat().length) ALGO_SAVE.set(this.#name, INFO);
            else                    ALGO_SAVE.del(this.#name);

            ALGO_MODAL.removeEventListener("click", this.#close);

            this.stat_update();
            ALGO_MODAL.close();
            AlgoField.#current = null;
        }
    };

    /** @type {AlgoField?} */ static #current = null;
    static get current() {
        return {
            name: AlgoField.#current.#name,
            basestat: AlgoField.#current.#basestat
        }
    }
}
//#endregion

// #region Filter
export class AlgoFilter {
    /** @type {HTMLButtonElement} */ static #BUTTON = document.querySelector("#algorithms button");
    /** @type {HTMLImageElement} */ static #IMAGE = this.#BUTTON.firstElementChild;

    /** @type {HTMLSelectElement} */ static #MAIN = document.querySelector("#algorithms #main");
    /** @type {HTMLSelectElement} */ static #SUB1 = document.querySelector("#algorithms #sub1");
    /** @type {HTMLSelectElement} */ static #SUB2 = document.querySelector("#algorithms #sub2");

    /** @type {HTMLButtonElement} */ static #RESET = document.querySelector("#algorithms #reset");

    /** @param {AlgoSet | "Remove"} algoname */
    static #algoImage(algoname) {
        return algoname === "Remove" ? "../assets/images/algorithms/others/Empty.png" : algoPath(algoname);
    }

    /** @param {"Remove" | AlgoSet} algoname */
    static #createButton(algoname) {
        const IMG = setattr(document.createElement("img"), {src: this.#algoImage(algoname), alt: algoname});
        const DIV = setattr(document.createElement("div"), {textContent: algoname});
        return setattr(document.createElement("button"), {type: "submit", value: algoname, append: [IMG, DIV]});
    }

    static #BUTTONS = [this.#createButton("Remove"), ...Object.keys(ALGO_SETS.classdict).map(x => this.#createButton(x))];
    
    static {
        this.#MAIN.append(
            setattr(document.createElement("option"), {value: "", textContent: "---"}),
            ...Object.keys(STATVALUES.MAIN).map(x => setattr(document.createElement("option"), {value: x, textContent: STATVALUES.NAME[x]}))
        )
        this.#SUB1.append(
            setattr(document.createElement("option"), {value: "", textContent: "---"}),
            ...Object.keys(STATVALUES.SUB).map(x => setattr(document.createElement("option"), {value: x, textContent: STATVALUES.NAME[x]}))
        )
        this.#SUB2.append(
            setattr(document.createElement("option"), {value: "", textContent: "---"}),
            ...Object.keys(STATVALUES.SUB).map(x => setattr(document.createElement("option"), {value: x, textContent: STATVALUES.NAME[x]}))
        )

        this.#SUB1.addEventListener("change", function(event) {
            for (const OPTION of Array.from(AlgoFilter.#SUB2.options).slice(1)) OPTION.disabled = this.value === OPTION.value;
        });
        this.#SUB2.addEventListener("change", function(event) {
            for (const OPTION of Array.from(AlgoFilter.#SUB1.options).slice(1)) OPTION.disabled = this.value === OPTION.value;
        });

        this.#BUTTON.addEventListener("click", event => {
            ALGO_SELECT.firstElementChild.append(...this.#BUTTONS.filter(x => x.value !== AlgoFilter.#IMAGE.alt));
            ALGO_SELECT.classList.add("filtering");
            ALGO_SELECT.showModal();
        });

        ALGO_SELECT.addEventListener("close", function(event) {
            if (!this.classList.contains("filtering")) return;
            AlgoFilter.#IMAGE.src = AlgoFilter.#algoImage(this.returnValue);
            AlgoFilter.#IMAGE.alt = this.returnValue;

            if (["OffenseBlock", "StabilityBlock", "SpecialBlock"].includes(this.returnValue)) {
                AlgoFilter.#SUB2.disabled = true;
                AlgoFilter.#SUB2.selectedIndex = 0;
                for (const OPTION of AlgoFilter.#SUB1.options) OPTION.disabled = false;
            } else {
                AlgoFilter.#SUB2.disabled = false;
            }

            // change options depending on algo set
        }, true);

        this.#RESET.addEventListener("click", () => {
            this.#IMAGE.src = this.#algoImage("Remove");
            this.#IMAGE.alt = "Remove";

            this.#MAIN.selectedIndex = 0;

            this.#SUB1.selectedIndex = 0;
            for (const OPTION of this.#SUB1.options) OPTION.disabled = false;

            this.#SUB2.selectedIndex = 0;
            this.#SUB2.disabled = false;
            for (const OPTION of this.#SUB2.options) OPTION.disabled = false;
        }, true);
    }

    #algo_update;
    /** @param {function("Remove" | AlgoSet, "" | MainAttributes, "" | SubAttributes, "" | SubAttributes): void} status_update */
    constructor(status_update) {
        this.#algo_update = function() {
            status_update(AlgoFilter.#IMAGE.alt, AlgoFilter.#MAIN.value, AlgoFilter.#SUB1.value, AlgoFilter.#SUB2.value);
        }

        AlgoFilter.#BUTTON.addEventListener("click", event => ALGO_SELECT.addEventListener("close", this.#algo_update, {once: true, capture: true}));
        for (const SELECT of [AlgoFilter.#MAIN, AlgoFilter.#SUB1, AlgoFilter.#SUB2]) SELECT.addEventListener("change", this.#algo_update, true);
        AlgoFilter.#RESET.addEventListener("click", this.#algo_update, true);
    }

    static filtered_changed = () => true;
    show() {
        ALGO_MODAL.addEventListener("close", event => {
            this.#algo_update();
            // if (AlgoFilter.filtered_changed()) document.dispatchEvent(UNITFILTER);
            if (AlgoFilter.filtered_changed()) AlgoFilter.#table_update();
        }, {once: true});
    }

    /** @type {function(): void} */ static #table_update;
    /** @param {function(): void} func */
    static setTableUpdate(func) {
        this.#table_update = func;
        // Filter - Algorithm
        ALGO_SELECT.addEventListener("close", function(event) { // Capture (FIFO) -> Bubble (FILO)
            if (!this.classList.contains("filtering")) return;
            func();
            ALGO_SELECT.classList.remove("filtering");
        });
        for (const SELECT of [this.#MAIN, this.#SUB1, this.#SUB2]) SELECT.addEventListener("change", func);
        this.#RESET.addEventListener("click", func);
    }
}
//#endregion